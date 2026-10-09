// Guide page (not a portfolio case): Sketch to Technical Design — how it works and two examples.
// Address: /sketch-to-technical-design/ and /ru/sketch-to-technical-design/ (own path, like the avatars page).
// Published Oct 9, 2026: header, five steps (her wording), two example boards (rendered from her PDFs), order button.
// Example boards: the same pictures as in the service window (EN and RU versions), copied to src/assets.
import type { Project } from './types';
import vestEn from '../assets/portfolio/sketch-to-technical-design/top-and-vest-en.jpg';
import vestRu from '../assets/portfolio/sketch-to-technical-design/top-and-vest-ru.jpg';
import gownEn from '../assets/portfolio/sketch-to-technical-design/crystal-gown-en.jpg';
import gownRu from '../assets/portfolio/sketch-to-technical-design/crystal-gown-ru.jpg';

export const sketchToTechnicalDesign: Project = {
  slug: 'sketch-to-technical-design',
  path: { en: '/sketch-to-technical-design/', ru: '/ru/sketch-to-technical-design/' },
  // Set to the real date when it goes live
  published: '2026-10-09',
  provider: 'natalia',

  en: {
    metaTitle: 'Technical Drawing & Garment Description | Phygital Fashion Lab',
    metaDescription: 'A rough sketch or an idea turned into a technical drawing and a detailed description of the garment, with a realistic image to evaluate the look.',
    title: 'Technical Drawing\n& Garment Description',
    subtitle: 'From a rough sketch or an idea to a technical drawing and a detailed description',
    meta: 'Sketch to Technical Design',
    ogImage: '/img/og-sketch-to-technical-design-en.jpg',
    blocks: [
      {
        kind: 'list',
        title: 'How it works',
        items: [
          'You send me a sketch or an idea',
          'I ask questions about the silhouette, materials and details',
          'Using AI, I create a technical drawing and a detailed description',
          'Also, I create a realistic image so you can evaluate the look',
          'You receive materials you can keep working with, together with a pattern maker and production',
        ],
      },
      {
        kind: 'result',
        title: 'Examples',
        hideTitle: true,
        media: [
          { kind: 'image', img: vestEn, alt: 'Top and longline vest: original sketch, technical drawing, technical description and photorealistic visualization' },
          { kind: 'image', img: gownEn, alt: 'Crystal bridal gown: original sketch, technical drawing, design description and photorealistic visualization' },
        ],
      },
      // The window has the price and contacts
      { kind: 'cta', label: 'Order this service', service: 'm-brief' },
    ],
  },

  ru: {
    metaTitle: 'Технический эскиз и описание модели | Phygital Fashion Lab',
    metaDescription: 'Набросок или идея превращаются в технический эскиз и подробное описание изделия, плюс реалистичное изображение, чтобы оценить образ.',
    title: 'Технический эскиз\nи описание модели',
    subtitle: 'Создание технического эскиза и подробного описания по наброску или скетчу',
    meta: 'Техническая проработка эскиза',
    ogImage: '/img/og-sketch-to-technical-design-ru.jpg',
    blocks: [
      {
        kind: 'list',
        title: 'Как это работает',
        items: [
          'Вы присылаете набросок или идею',
          'Я задаю вопросы о силуэте, материалах и деталях',
          'С помощью нейросети делаю технический эскиз и подробное описание',
          'Создаю реалистичное изображение, чтобы оценить образ',
          'Вы получаете материалы, с которыми можно работать дальше с конструктором и производством',
        ],
      },
      {
        kind: 'result',
        title: 'Примеры',
        hideTitle: true,
        media: [
          { kind: 'image', img: vestRu, alt: 'Топ с накидкой: исходный эскиз, технический эскиз, техническое описание и фотореалистичное изображение' },
          { kind: 'image', img: gownRu, alt: 'Свадебное платье «Кристалл»: исходный эскиз, технический эскиз, техническое описание и фотореалистичное изображение' },
        ],
      },
      { kind: 'cta', label: 'Заказать услугу', service: 'm-brief' },
    ],
  },
};
