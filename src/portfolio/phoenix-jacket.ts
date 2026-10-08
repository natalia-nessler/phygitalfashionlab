// Case: The Phoenix Jacket (MILLA BERILLO DESIGN BUREAU, 2025).
// Built step by step together with Natasha (Oct 2026). English approved; Russian adapted by a subagent and edited by her (approved Oct 7).
import type { Project } from './types';
import cover from '../assets/portfolio/phoenix-jacket/cover-en.jpg';
import coverRu from '../assets/portfolio/phoenix-jacket/cover-ru.jpg';
import sketchTo3d from '../assets/portfolio/phoenix-jacket/sketch-to-3d.jpg';
// Natasha's render (Oct 7), white background tinted to paper; original: tools/images/sources/phoenix-jacket/render-front-back-original.webp
import renderFrontBack from '../assets/portfolio/phoenix-jacket/render-front-back.jpg';
// The real show poster (Russian text; kept as is in both languages)
import showPoster from '../assets/portfolio/phoenix-jacket/show-poster.jpg';
// Lookbook: the finished jacket, three views (her image, Oct 7)
import lookbookThreeViews from '../assets/portfolio/phoenix-jacket/lookbook-three-views.jpg';

export const phoenixJacket: Project = {
  slug: '3d-patterns-phoenix-jacket', // address: /portfolio/3d-patterns-phoenix-jacket/ (her choice; media folders keep the short name)
  year: 2025,
  // Date the page went live
  published: '2026-10-07',
  client: { name: 'MILLA BERILLO DESIGN BUREAU', url: 'https://millaberillo.ru' },
  provider: 'natalia',

  en: {
    metaTitle: 'The Phoenix Jacket: 3D Prototyping Case Study | Phygital Fashion Lab',
    metaDescription: 'The Phoenix Jacket for MILLA BERILLO DESIGN BUREAU: from the designer\'s sketch to a 3D prototype and the finished jacket. 3D prototyping case study.',
    title: 'The Phoenix Jacket',
    subtitle: '3D Prototyping Case Study | Phygital Workflow',
    meta: '3D pattern development · MILLA BERILLO DESIGN BUREAU · 2025',
    cover: { img: cover, alt: 'The Phoenix Jacket: the designer\'s sketch, the 3D prototype on a mannequin and the finished jacket on a model' },
    ogImage: '/img/og-phoenix-jacket-en.jpg',
    blocks: [
      {
        kind: 'overview',
        title: 'Overview',
        items: [
          { label: 'Starting point', text: 'The designer\'s sketch with detailed notes' },
          { label: 'How we worked', text: 'Patterns were developed in Style3D. The designer approved each detail via video previews, and then the 3D prototype was checked against a muslin fitting.' },
          { label: 'Delivered', text: 'Print-ready PDF patterns' },
        ],
      },
      {
        kind: 'steps',
        title: 'Process',
        intro: 'Developing patterns in 3D step by step, with each stage approved by the designer.',
        steps: [
          {
            // Step 1: pattern development video next to the sketch-to-3D board (no caption: the intro line above covers it)
            media: [
              // Same video for both languages (Natasha's original 1440×1920, re-encoded to 1080×1440)
              { kind: 'video', src: '/video/phoenix-pattern-development.mp4', poster: '/img/poster-phoenix-pattern-development.jpg', ratio: 3 / 4, label: 'Pattern development of The Phoenix Jacket in Style3D' },
              { kind: 'image', img: sketchTo3d, alt: 'The designer\'s sketch with notes and the jacket assembled in 3D: the base jacket front and back, then with the asymmetric flounce' },
            ],
          },
          {
            // Step 2: render (about 1/3) next to the 3D vs sample fitting video
            caption: 'Once the construction is agreed, patterns are finalized for sewing the muslin or sample.',
            media: [
              { kind: 'image', img: renderFrontBack, alt: 'The Phoenix Jacket in 3D on an avatar, front and back' },
              // Natasha's original 1618×1440 re-encoded to 1296 px wide; a sharper version of public/video/phoenix-jacket.mp4 (main site)
              { kind: 'video', src: '/video/phoenix-fitting-comparison.mp4', poster: '/img/poster-phoenix-fitting-comparison.jpg', ratio: 1618 / 1440, label: 'The 3D prototype of The Phoenix Jacket next to the fitting of the sewn sample, both in 100% cotton' },
            ],
          },
          {
            // Step 3: show poster next to the social media teaser video (her original 1080×1920, re-encoded), centered
            caption: 'Additionally, a visualization for the show poster and a creative video announcing the show on social media were created based on the 3D render.',
            layout: 'center',
            media: [
              { kind: 'image', img: showPoster, alt: 'Show poster for the new MILLA BERILLO collection: The Phoenix Jacket in 3D on a mannequin among ferns' },
              { kind: 'video', src: '/video/phoenix-show-teaser.mp4', poster: '/img/poster-phoenix-show-teaser.jpg', ratio: 9 / 16, label: 'Creative video announcing the show on social media: The Phoenix Jacket in 3D among ferns' },
            ],
          },
        ],
      },
      {
        kind: 'result',
        title: 'The finished jacket',
        hideTitle: true,
        caption: "To see the jacket in real life and try it on, visit Milla Berillo's studio.",
        link: { text: "Milla Berillo's studio", href: 'https://millaberillo.ru' },
        media: [
          { kind: 'image', img: lookbookThreeViews, alt: 'The finished Phoenix Jacket on a model: front, full length and back with the faux-feather flounce' },
        ],
      },
      // Opens the 3D Pattern Development window on the main page
      { kind: 'cta', label: 'More about this service', service: 'm-pattern' },
    ],
  },
  ru: {
    metaTitle: 'Жакет «Феникс»: 3D-разработка лекал | Phygital Fashion Lab',
    metaDescription: 'Жакет «Феникс» для MILLA BERILLO DESIGN BUREAU: от эскиза дизайнера к 3D-прототипу и готовому жакету. Кейс 3D-разработки лекал в Style3D.',
    title: 'Жакет «Феникс»',
    subtitle: 'Фиджитал-подход в разработке одежды',
    meta: '3D-разработка лекал · MILLA BERILLO DESIGN BUREAU · 2025',
    cover: { img: coverRu, alt: 'Жакет «Феникс»: эскиз дизайнера, 3D-прототип на манекене и готовый жакет на модели' },
    ogImage: '/img/og-phoenix-jacket-ru.jpg',
    blocks: [
      {
        kind: 'overview',
        title: 'Кратко о проекте',
        items: [
          { label: 'Исходные данные', text: 'Эскиз дизайнера с подробными комментариями' },
          { label: 'Как проходила работа', text: 'Лекала разрабатывались в Style3D. Каждую деталь согласовывали с дизайнером по видеопревью, а затем 3D-прототип сверили с примеркой макета.' },
          { label: 'Результат', text: 'Лекала в PDF, готовые к печати' },
        ],
      },
      {
        kind: 'steps',
        title: 'Процесс работы',
        intro: 'Последовательная разработка лекал в 3D: каждый этап согласуется по ходу работы с дизайнером.',
        steps: [
          {
            media: [
              { kind: 'video', src: '/video/phoenix-pattern-development.mp4', poster: '/img/poster-phoenix-pattern-development.jpg', ratio: 3 / 4, label: 'Разработка лекал жакета «Феникс» в Style3D' },
              { kind: 'image', img: sketchTo3d, alt: 'Эскиз дизайнера с пометками и жакет, собранный в 3D: основа жакета спереди и сзади, затем с асимметричным воланом' },
            ],
          },
          {
            caption: 'Когда конструкция согласована, лекала оформляются для пошива макета или образца.',
            media: [
              { kind: 'image', img: renderFrontBack, alt: 'Жакет «Феникс» в 3D на аватаре, вид спереди и сзади' },
              // Russian version of the comparison video: captions in the video are in Russian («хлопок 100%»)
              { kind: 'video', src: '/video/phoenix-fitting-comparison-ru.mp4', poster: '/img/poster-phoenix-fitting-comparison-ru.jpg', ratio: 1214 / 1080, label: '3D-прототип жакета «Феникс» рядом с примеркой сшитого образца, оба из хлопка 100%' },
            ],
          },
          {
            caption: 'Дополнительно на основе 3D-рендера были сделаны визуализация для афиши показа и креативный видеоролик для анонса в соцсетях.',
            layout: 'center',
            media: [
              { kind: 'image', img: showPoster, alt: 'Афиша показа новой коллекции MILLA BERILLO: жакет «Феникс» в 3D на манекене среди папоротников' },
              { kind: 'video', src: '/video/phoenix-show-teaser.mp4', poster: '/img/poster-phoenix-show-teaser.jpg', ratio: 9 / 16, label: 'Креативный видеоролик для анонса показа в соцсетях: жакет «Феникс» в 3D среди папоротников' },
            ],
          },
        ],
      },
      {
        kind: 'result',
        title: 'Готовый жакет',
        hideTitle: true,
        caption: 'Увидеть жакет в жизни и примерить его можно в студии Миллы Берилло.',
        link: { text: 'студии Миллы Берилло', href: 'https://millaberillo.ru' },
        media: [
          { kind: 'image', img: lookbookThreeViews, alt: 'Готовый жакет «Феникс» на модели: спереди, в полный рост и сзади с воланом в виде перьев' },
        ],
      },
      { kind: 'cta', label: 'Подробнее об услуге', service: 'm-pattern' },
    ],
  },
};
