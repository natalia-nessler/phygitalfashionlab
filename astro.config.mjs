import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://phygitalfashionlab.com',
  trailingSlash: 'ignore',
  // Writes sitemap-index.xml on build. When the Russian page exists it is added automatically.
  integrations: [sitemap()],
});
