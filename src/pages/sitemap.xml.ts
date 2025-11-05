import { GetServerSideProps } from 'next';

// Mock data for dynamic pages
const mockDynamicPages = [
  'ruling-on-fasting-day-of-arafah',
  'importance-of-dhul-hijjah',
  'combining-intentions-for-fasts',
];

const generateSitemap = (pages: string[]) => {
  const baseUrl = 'https://ahldhikr-hub.com';
  const staticPages = [
    '',
    '/ask',
    '/my-dhikr',
    '/settings',
    '/about',
    '/privacy',
  ];

  const allPages = [...staticPages, ...pages.map(slug => `/ask/${slug}`)];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPages
    .map(url => `
    <url>
      <loc>${baseUrl}${url}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>${url === '' ? '1.0' : '0.8'}</priority>
    </url>
  `)
    .join('')}
</urlset>`;

  return sitemap;
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // In a real application, you would fetch these from a database
  const dynamicPages = mockDynamicPages;
  const sitemap = generateSitemap(dynamicPages);

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

// This is a dummy component because this page is for server-side rendering of the sitemap
const SitemapPage = () => {};

export default SitemapPage;
