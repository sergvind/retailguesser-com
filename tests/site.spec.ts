import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { pages, business } from '../src/data/site';

for (const route of pages) {
  test(`${route.title}: production URL, responsive layout, accessibility, and links`, async ({ page, request }) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });

    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      const response = await page.goto(route.href);
      expect(response?.status()).toBe(200);
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator('h1')).toHaveCount(1);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
      expect(overflow, `horizontal overflow at ${width}px`).toBeLessThanOrEqual(1);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', new URL(route.href, business.url).href);
      expect((await page.locator('meta[name="description"]').getAttribute('content'))?.length).toBeGreaterThan(40);
      for (const email of Object.values(business.emails)) {
        await expect(page.locator(`footer a[href="mailto:${email}"]`)).toBeVisible();
      }
      await expect(page.locator(`footer a[href="${business.phoneHref}"]`)).toHaveText(business.phone);
      if (width === 390 || width === 1440) {
        const accessibility = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
        expect(accessibility.violations.map(violation => ({
          id: violation.id,
          nodes: violation.nodes.map(node => ({ target: node.target, reason: node.failureSummary })),
        }))).toEqual([]);
      }
    }

    const links = await page.locator('a[href]').evaluateAll(nodes => [...new Set(nodes.map(node => node.getAttribute('href')!).filter(href => href.startsWith('/') || href.startsWith('#')))]);
    for (const href of links) {
      const target = new URL(href, page.url());
      const linkedPage = await request.get(target.pathname + target.search);
      expect(linkedPage.status(), `broken link: ${href}`).toBe(200);
      if (target.hash) {
        const html = await linkedPage.text();
        expect(html, `missing anchor: ${href}`).toContain(`id="${decodeURIComponent(target.hash.slice(1))}"`);
      }
    }
    expect(errors).toEqual([]);
  });
}

test('mobile menu works with keyboard, Escape, links, and resizing', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const menu = page.getByRole('button', { name: /navigation/ });
  await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeHidden();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Retail Guesser home' }).first()).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(menu).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(menu).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Home', exact: true })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(menu).toBeFocused();
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await menu.click();
  const mobileAxe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(mobileAxe.violations.map(violation => ({ id: violation.id, nodes: violation.nodes.map(node => node.target) }))).toEqual([]);
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Services', exact: true }).click();
  await expect(page).toHaveURL(/#services$/);
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await menu.click();
  await page.setViewportSize({ width: 1440, height: 1000 });
  await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
});

test('metadata assets and sitemap use the six existing public URLs', async ({ request }) => {
  const sitemap = await request.get('/sitemap.xml');
  expect(sitemap.ok()).toBeTruthy();
  const xml = await sitemap.text();
  for (const page of pages) expect(xml).toContain(new URL(page.href, business.url).href);
  expect(xml.match(/<loc>/g)?.length).toBe(6);
  for (const asset of ['/favicon.svg', '/social-card.png', '/robots.txt']) expect((await request.get(asset)).ok()).toBeTruthy();
});

test('mobile navigation and contact content remain usable without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(`${baseURL}/`);
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Contact', exact: true }).click();
  await expect(page).toHaveURL(/contact\.html$/);
  await expect(page.getByRole('link', { name: business.emails.sales, exact: true }).first()).toBeVisible();
  await expect(page.locator('form')).toHaveCount(0);
  await context.close();
});

test('reduced motion disables smooth scrolling and interface transitions', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
  expect(await page.locator('.button').first().evaluate(node => getComputedStyle(node).transitionDuration)).toBe('0s');
});
