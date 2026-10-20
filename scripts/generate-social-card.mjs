import { chromium } from '@playwright/test';
import { existsSync, readFileSync } from 'node:fs';

const font = readFileSync(new URL('../node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-500-normal.woff2', import.meta.url)).toString('base64');
const logo = readFileSync(new URL('../public/favicon.svg', import.meta.url)).toString('base64');
const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || (existsSync('/usr/bin/google-chrome') ? '/usr/bin/google-chrome' : undefined),
  args: ['--no-sandbox'],
});
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.setContent(`<!doctype html><html><head><style>
    @font-face {font-family:Space;src:url(data:font/woff2;base64,${font}) format('woff2');font-weight:500}
    *{box-sizing:border-box}body{margin:0;background:#fafbf7;color:#203431;font-family:Space,sans-serif;padding:64px 75px}
    header{display:flex;align-items:center;gap:14px;font-size:29px;letter-spacing:-1px}img{width:48px;height:48px}
    h1{position:relative;z-index:2;font-size:96px;font-weight:500;line-height:1.1;letter-spacing:-6px;margin:65px 0 27px}h1 span{color:#096b63}
    p{font-size:21px;color:#65716b;margin:0}.url{position:absolute;bottom:50px;font-size:16px;color:#096b63}
    .art{position:absolute;right:70px;top:202px;background:#e9efe2;width:340px;height:300px;border-radius:16px;display:flex;gap:16px;align-items:flex-end;padding:40px;transform:rotate(-5deg)}
    .bar{flex:1;background:#bdd1ac;border-radius:7px 7px 0 0;height:35%}.bar:nth-child(2){height:57%;background:#94b391}.bar:nth-child(3){height:77%;background:#558e75}.bar:nth-child(4){height:100%;background:#096b63}
  </style></head><body><header><img src="data:image/svg+xml;base64,${logo}" alt="">RetailGuesser.</header><h1>Less guesswork.<br>More <span>growth.</span></h1><p>Data-driven marketing. Retail-focused expertise.</p><div class="art"><span class="bar"></span><span class="bar"></span><span class="bar"></span><span class="bar"></span></div><span class="url">retailguesser.com</span></body></html>`);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: new URL('../public/social-card.png', import.meta.url).pathname });
  console.log('Generated public/social-card.png (1200 × 630).');
} finally {
  await browser.close();
}
