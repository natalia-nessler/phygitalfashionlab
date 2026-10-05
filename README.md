# Phygital Fashion Lab — website

Source of https://phygitalfashionlab.com (English and Russian). Built with [Astro](https://astro.build), published on GitHub Pages.

© 2026 Phygital Fashion Lab. All rights reserved. The texts, photos, videos and design of this site may not be copied or reused without written permission. The repository is public only so that the site can be hosted on GitHub Pages.

## Где что лежит

| Что | Где |
|---|---|
| Тексты сайта | `src/content/en.ts`, `src/content/ru.ts` |
| Контакты, ссылки, фото людей | `src/content/people.ts` |
| Данные для поисковиков (JSON-LD) | `src/content/jsonld.ts` |
| Страница целиком | `src/components/Home.astro` |
| Карточка, окно, кейс, цены | `Card.astro`, `Modal.astro`, `InfoModal.astro`, `Feature.astro` |
| Команда, отзывы | `TeamModal.astro`, `ReviewsModal.astro` |
| Вышивка (стежки) | `src/scripts/stitch.js` |
| Поведение (окна, копирование почты, «Get in touch») | `src/scripts/ui.js` |
| Стили | `src/styles/global.css` |
| Мета-теги, hreflang | `src/layouts/Base.astro` |
| Фото и видео | `public/img`, `public/video` |
| Публикация | `.github/workflows/deploy.yml` |

## Команды

- `npm run dev`: запустить сайт локально (http://localhost:4321)
- `npm run build`: собрать сайт в папку `dist/`

Публикация автоматическая: каждый push в ветку `main` собирает сайт и выкладывает его на GitHub Pages.
