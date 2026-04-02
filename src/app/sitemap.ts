import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://seguro-comp.kz';
  return [
    '',
    '/catalog',
    '/about',
    '/contacts',
    '/delivery'
  ].map((path) => ({
    url: `${base}${path}`,
    changeFrequency: 'daily',
    priority: path === '' ? 1 : 0.8
  }));
}
