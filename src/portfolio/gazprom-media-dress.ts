// Project: Gazprom Media merch dress for SPIEF ("project" format: moved from Behance as is, text between the slides).
// Behance: https://www.behance.net/gallery/254678705/3D-Fitting-Case-Study-Gazprom-Media-Merch-Dress
// Slides: Behance originals (10240 px, in tools/images/sources/gazprom-media-dress/), resized to 3000 px, background tinted to paper.
// Published Oct 7, 2026. Header and Russian texts approved by Natasha.
// Russian slides (text on the slides in Russian): made with tools/images/translate-slides-gazprom.py.
import type { Project } from './types';
import slide1 from '../assets/portfolio/gazprom-media-dress/slide-1.jpg';
import slide2 from '../assets/portfolio/gazprom-media-dress/slide-2.jpg';
import slide3 from '../assets/portfolio/gazprom-media-dress/slide-3.jpg';
import slide4 from '../assets/portfolio/gazprom-media-dress/slide-4.jpg';
import slide5 from '../assets/portfolio/gazprom-media-dress/slide-5.jpg';
import slide1Ru from '../assets/portfolio/gazprom-media-dress/slide-1-ru.jpg';
import slide2Ru from '../assets/portfolio/gazprom-media-dress/slide-2-ru.jpg';
import slide3Ru from '../assets/portfolio/gazprom-media-dress/slide-3-ru.jpg';
import slide4Ru from '../assets/portfolio/gazprom-media-dress/slide-4-ru.jpg';
import slide5Ru from '../assets/portfolio/gazprom-media-dress/slide-5-ru.jpg';

export const gazpromMediaDress: Project = {
  slug: '3d-fitting-gazprom-media-dress',
  // Date the page went live
  published: '2026-10-07',
  year: 2026,
  provider: 'natalia',
  // Natasha worked for Factory Base; the dress was made for Gazprom Media at SPIEF
  client: { name: 'Factory Base' },

  en: {
    metaTitle: 'Gazprom Media Merch Dress for SPIEF: 3D Fitting | Phygital Fashion Lab',
    metaDescription: 'A merch dress for Gazprom Media at SPIEF, developed in three weeks around 3D fitting and approved after the first physical sample.',
    title: 'Gazprom Media\nMerch Dress for SPIEF',
    subtitle: '3D Fitting Case Study',
    meta: '3D fitting · Factory Base · 2026',
    cover: { img: slide1, alt: 'Gazprom Media merch dress: 3D try-on, physical try-on of the sample and the dresses at the event' },
    ogImage: '/img/og-gazprom-media-dress-en.jpg',
    blocks: [
      {
        kind: 'story',
        items: [
          { text: [
            'Three weeks.',
            'That was the timeline for developing garments from scratch, testing fit, finalizing patterns, and preparing production for a large-scale event.',
            'In traditional workflows, this would usually mean multiple physical samples, repeated corrections, and lost time.',
            'Instead, the development process was built around 3D fitting.',
            'This project was executed as part of the Factory Base team.',
          ] },
          { media: { kind: 'image', img: slide2, alt: 'Step 1: testing the first variant of the design, 3D try-on of the dress from three sides' } },
          { text: [
            'Before sewing the first sample, we were able to detect fit issues, adjust construction details, refine patterns, and validate the design digitally.',
          ] },
          { media: { kind: 'image', img: slide3, alt: 'Checking possible fit issues in 3D to adjust the patterns before producing the physical sample' } },
          { media: { kind: 'image', img: slide4, alt: 'Step 2: changed design, another variant of the dress in 3D and an AI-assisted realistic preview' } },
          { text: [
            'I also used AI-enhanced renders to make the virtual fitting process feel closer to a real photoshoot — helping the client evaluate the product more clearly before production.',
          ] },
          { media: { kind: 'image', img: slide5, alt: 'Step 3: final design approval, pattern refinements and an AI-assisted realistic preview of the dress' } },
          { text: [
            'The result?',
            'Approved after first physical sample, reducing development time under an extremely tight production schedule.',
            'This is where 3D stops being “just visualization” and becomes part of the production pipeline.',
          ] },
        ],
      },
      // Opens the 3D Fitting window on the main page
      { kind: 'cta', label: 'More about this service', service: 'm-fitting' },
    ],
  },
  ru: {
    metaTitle: 'Платье «Газпром-Медиа» для ПМЭФ: 3D-примерка | Phygital Fashion Lab',
    metaDescription: 'Мерч-платье для «Газпром-Медиа» на ПМЭФ: разработка за три недели на основе 3D-примерки, модель утверждена с первого образца. Кейс виртуальной примерки.',
    title: 'Мерч-платье на ПМЭФ\nдля Газпром-Медиа',
    subtitle: 'Как 3D-примерка встраивается в рабочий процесс',
    meta: '3D-примерка · Factory Base · 2026',
    cover: { img: slide1Ru, alt: 'Мерч-платье для «Газпром-Медиа»: 3D-примерка, примерка физического образца и платья на мероприятии' },
    ogImage: '/img/og-gazprom-media-dress-ru.jpg',
    blocks: [
      {
        kind: 'story',
        items: [
          { text: [
            'Три недели.',
            'Столько было времени, чтобы с нуля разработать изделия, проверить посадку, довести лекала до финальной версии и подготовить производство к масштабному мероприятию.',
            'При традиционном подходе это обычно означает несколько физических образцов, многократные правки и потерянное время.',
            'Вместо этого разработку выстроили вокруг 3D-примерки.',
            'Проект выполнен в составе команды Factory Base.',
          ] },
          { media: { kind: 'image', img: slide2Ru, alt: 'Шаг 1: проверка первого варианта дизайна, 3D-примерка платья с трёх сторон' } },
          { text: [
            'Ещё до пошива первого образца мы смогли выявить проблемы с посадкой, скорректировать конструктивные детали, доработать лекала и проверить дизайн в 3D.',
          ] },
          { media: { kind: 'image', img: slide3Ru, alt: 'Проверка возможных проблем посадки в 3D, чтобы скорректировать лекала до пошива физического образца' } },
          { media: { kind: 'image', img: slide4Ru, alt: 'Шаг 2: изменённый дизайн, другой вариант платья в 3D и реалистичное превью, сделанное с помощью ИИ' } },
          { text: [
            'Я также использовала рендеры, доработанные с помощью ИИ, чтобы виртуальная примерка была ближе к настоящей фотосъёмке. Так клиенту было проще оценить изделие до запуска в пошив.',
          ] },
          { media: { kind: 'image', img: slide5Ru, alt: 'Шаг 3: финальное согласование дизайна, доработка лекал и реалистичное превью платья, сделанное с помощью ИИ' } },
          { text: [
            'Результат?',
            'Модель утвердили с первого физического образца, и это сократило сроки разработки при очень плотном производственном графике.',
            'Пример того, как 3D работает не просто как «картинка», а становится частью производственного процесса.',
          ] },
        ],
      },
      { kind: 'cta', label: 'Подробнее об услуге', service: 'm-fitting' },
    ],
  },
};
