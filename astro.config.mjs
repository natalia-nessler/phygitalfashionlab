import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://phygitalfashionlab.com',
  trailingSlash: 'ignore',
  // Writes sitemap-index.xml on build, with links between the English and Russian versions of each page (/ru/...).
  integrations: [sitemap({ i18n: { defaultLocale: 'en', locales: { en: 'en', ru: 'ru' } } })],
});
