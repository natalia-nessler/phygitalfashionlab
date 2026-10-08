// Project: 3D visualization showreel (garments and accessories for CGI videos by Visual Bakery), 2025.
// New format: header, then the showreel, then blocks "photo reference vs 3D · process video · 3D model to rotate".
// Published Oct 8, 2026. English and Russian texts approved by Natasha.
// Showreel: her original 2560×1440 (108 MB) re-encoded to 1920 px; cover = the same picture as in the service window.
// 3D model: her second CLO export (Oct 8, without "Unified UV Coordinates", so the fabric texture repeats and stays sharp),
// 24 MB optimized with gltf-transform (dedup, weld, quantize, WebP q92) to 9 MB; originals in tools/images/sources/visual-bakery/.
import type { Project, MediaRef } from './types';
import blousePhotoVs3d from '../assets/portfolio/visual-bakery/blouse-photo-vs-3d.jpg';
// Russian version of the comparison: label «фотореференс» on the picture
import blousePhotoVs3dRu from '../assets/portfolio/visual-bakery/blouse-photo-vs-3d-ru.jpg';
import sneakerClo from '../assets/portfolio/visual-bakery/sneaker-clo.jpg';
import bagClo from '../assets/portfolio/visual-bakery/bag-clo.jpg';
import hoodieColorways from '../assets/portfolio/visual-bakery/hoodie-colorways.jpg';

// Light grey studio background like the square renders used as covers of the sneaker and bag models
const STUDIO_BG = 'radial-gradient(circle at 50% 42%, #e4e4e4 0%, #cdcdcd 45%, #a8a8a8 100%)';

// Media files are the same in both languages; only the texts (alt, label, button) differ
const showreel = (label: string): MediaRef => ({ kind: 'video', src: '/video/visualization-showreel.mp4', poster: '/img/poster-visual-bakery.jpg', ratio: 16 / 9, label });
// cover of the texture video: frame at 19 s (her choice)
const blouseVideo = (label: string): MediaRef => ({ kind: 'video', src: '/video/blouse-pattern-process.mp4', poster: '/img/poster-blouse-pattern-process.jpg', ratio: 2 / 3, label });
// Same light as on the avatars page (her OK): slightly darker than the viewer default and a soft floor shadow
const LIGHT = { exposure: 0.75, shadow: 0.5 };
const blouseModel = (label: string, play: string): MediaRef => ({ kind: 'model', src: '/models/blouse.glb', ratio: 2 / 3, label, play, poster: '/img/poster-blouse-model.jpg', ...LIGHT });
const sneakerModel = (label: string, play: string): MediaRef => ({ kind: 'model', src: '/models/sneaker.glb', ratio: 1, label, play, poster: '/img/poster-sneaker-model.jpg', bg: STUDIO_BG, ...LIGHT });
const bagModel = (label: string, play: string): MediaRef => ({ kind: 'model', src: '/models/bag.glb', ratio: 1, label, play, poster: '/img/poster-bag-model.jpg', bg: STUDIO_BG, ...LIGHT });
// Hoodie animation: her 300 rendered frames (transparent background) -> 10 s video on paper; plays by itself like a GIF (her exception)
const hoodieAnimation = (label: string): MediaRef => ({ kind: 'video', src: '/video/hoodie-animation.mp4', poster: '/img/poster-hoodie-animation.jpg', ratio: 2 / 3, label, loop: true, autoplay: true });
// Hoodie model: 24 MB -> 8 MB (simplified mesh), a stray part floating above it removed
const hoodieModel = (label: string, play: string): MediaRef => ({ kind: 'model', src: '/models/hoodie.glb', ratio: 2 / 3, label, play, poster: '/img/poster-hoodie-model.jpg', bg: '#FEFDFA', ...LIGHT });

export const visualBakeryShowreel: Project = {
  slug: '3d-visualization-cgi-showreel',
  // Date the page went live
  published: '2026-10-08',
  year: 2025,
  provider: 'natalia',
  client: { name: 'Visual Bakery' },

  en: {
    metaTitle: '3D Visualization for CGI Videos: Showreel | Phygital Fashion Lab',
    metaDescription: 'Garment and accessory 3D visualization for CGI videos by Visual Bakery: showreel, 3D garments with realistic fabrics and an interactive 3D model.',
    title: '3D Visualization\nfor CGI Videos',
    subtitle: 'Showreel | Process Details & 3D Model Views',
    meta: '3D visualization · Visual Bakery · 2025',
    ogImage: '/img/og-visual-bakery-showreel.jpg',
    blocks: [
      {
        kind: 'result',
        title: 'Showreel',
        media: [showreel('Showreel: 3D garments and accessories created for CGI videos by Visual Bakery')],
      },
      {
        kind: 'steps',
        steps: [
          {
            // Blouse with a daisy embroidery fabric: photo reference vs 3D · how the texture was made · the model itself
            caption: '3D visualization of a blouse for a Love Republic CGI video',
            labels: ['Photo reference vs 3D render', 'Creating the texture in Substance Designer', '3D view'],
            media: [
              { kind: 'image', img: blousePhotoVs3d, alt: 'Daisy embroidery fabric: photo reference above, the same fabric recreated in 3D on the blouse collar below' },
              blouseVideo('How the daisy fabric texture for the 3D blouse was made'),
              blouseModel('3D model of the blouse with daisy embroidery', 'Rotate in 3D'),
            ],
          },
          {
            // Accessories: CLO screenshot (3D + patterns + references) next to the model; sneaker first, then the bag
            caption: '3D visualization of accessories for a Stockmann CGI video',
            labels: ['Screenshot from CLO3D', '3D view', 'Screenshot from CLO3D', '3D view'],
            media: [
              [
                { kind: 'image', img: sneakerClo, alt: 'Sneaker in CLO: the 3D model, its pattern pieces and the product photos used as references' },
                sneakerModel('3D model of the sneaker', 'Rotate in 3D'),
              ],
              [
                { kind: 'image', img: bagClo, alt: 'Suede hobo bag with a knotted handle and a chain in CLO: the 3D model, its pattern pieces and the product photos used as references' },
                bagModel('3D model of the suede bag', 'Rotate in 3D'),
              ],
            ],
          },
          {
            // Hoodie: animation left, 3D model right; the colorways overview as a full-width second row
            caption: '3D visualization & animation of a hoodie for a Fonbet CGI video',
            labels: ['Render animation made in Blender', '3D view', 'Colorways from CLO3D'],
            media: [
              [
                hoodieAnimation('Animation: the hoodie turning and changing colorways'),
                hoodieModel('3D model of the hockey-style hoodie with lacing', 'Rotate in 3D'),
              ],
              [
                { kind: 'image', img: hoodieColorways, alt: 'Eight colorways of the hoodie for different clubs (Kazan, Chelyabinsk, Dinamo, Spartak, MSQ, OMS, UFA, YAR) with their color codes' },
              ],
            ],
          },
        ],
      },
      { kind: 'cta', label: 'More about this service', service: 'm-visual' },
    ],
  },

  ru: {
    metaTitle: '3D-визуализация для CGI-роликов: шоурил | Phygital Fashion Lab',
    metaDescription: '3D-визуализация одежды и аксессуаров для CGI-роликов студии Visual Bakery: шоурил, 3D-одежда с реалистичными тканями и интерактивная 3D-модель.',
    title: '3D-визуализация\nдля CGI-роликов',
    subtitle: 'Showreel | Детали процесса и 3D-просмотр моделей',
    meta: '3D-визуализация · Visual Bakery · 2025',
    ogImage: '/img/og-visual-bakery-showreel.jpg',
    blocks: [
      {
        kind: 'result',
        title: 'Showreel',
        media: [showreel('Шоурил: 3D-одежда и аксессуары, созданные для CGI-роликов студии Visual Bakery')],
      },
      {
        kind: 'steps',
        steps: [
          {
            caption: '3D-визуализация блузки для CGI-ролика Love Republic',
            labels: ['Фотореференс vs 3D-рендер', 'Создание текстуры в Substance Designer', '3D-просмотр'],
            media: [
              { kind: 'image', img: blousePhotoVs3dRu, alt: 'Ткань с вышивкой ромашками: сверху фотореференс, снизу та же ткань, воссозданная в 3D, на воротнике блузки' },
              blouseVideo('Как создавалась текстура ткани с ромашками для 3D-блузки'),
              blouseModel('3D-модель блузки с вышивкой ромашками', 'Покрутить в 3D'),
            ],
          },
          {
            caption: '3D-визуализация аксессуаров для CGI-ролика Stockmann',
            labels: ['Скриншот из CLO3D', '3D-просмотр', 'Скриншот из CLO3D', '3D-просмотр'],
            media: [
              [
                { kind: 'image', img: sneakerClo, alt: 'Кроссовок в CLO: 3D-модель, детали кроя и фото изделия, использованные как референсы' },
                sneakerModel('3D-модель кроссовка', 'Покрутить в 3D'),
              ],
              [
                { kind: 'image', img: bagClo, alt: 'Замшевая сумка-хобо с завязанной узлом ручкой и цепочкой в CLO: 3D-модель, детали кроя и фото изделия, использованные как референсы' },
                bagModel('3D-модель замшевой сумки', 'Покрутить в 3D'),
              ],
            ],
          },
          {
            caption: '3D-визуализация и анимация худи для CGI-ролика Fonbet',
            labels: ['Рендер и анимация сделаны в Blender', '3D-просмотр', 'Цветовые варианты из CLO3D'],
            media: [
              [
                hoodieAnimation('Анимация: худи вращается, сменяя цветовые варианты'),
                hoodieModel('3D-модель худи в хоккейном стиле со шнуровкой', 'Покрутить в 3D'),
              ],
              [
                { kind: 'image', img: hoodieColorways, alt: 'Восемь цветовых вариантов худи для разных клубов (Kazan, Chelyabinsk, Dinamo, Spartak, MSQ, OMS, UFA, YAR) с кодами цветов' },
              ],
            ],
          },
        ],
      },
      { kind: 'cta', label: 'Подробнее об услуге', service: 'm-visual' },
    ],
  },
};
