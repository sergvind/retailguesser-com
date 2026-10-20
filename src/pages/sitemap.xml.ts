import type { APIRoute } from 'astro';
import { business, pages } from '../data/site';

export const GET: APIRoute = () => new Response(
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map((page) => `<url><loc>${new URL(page.href, business.url).href}</loc></url>`).join('')}</urlset>`,
  { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
);
