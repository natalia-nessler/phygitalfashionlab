// Guide page (not a portfolio case): custom 3D avatars — how it works, three types compared, the photo guide to download.
// Address: /custom-avatars/ and /ru/custom-avatars/ (own path, not under /portfolio/).
// Published Oct 8, 2026. Texts in both languages approved by Natasha (EN grammar polished).
// Models (same person, three types): her exports, optimized with gltf-transform. "For brands": from her OBJ + MTL
// (the GLB export looked wrong), converted with obj2gltf, CLO's invisible shadow helper removed, WebP -> 5.4 MB. "Personal": 55 MB, mesh simplified for the web viewer only
// (the dense mesh is shown by the mesh picture) -> 9.5 MB. "Universal": 1.3 -> 0.7 MB. Sources: tools/images/sources/avatars/.
// Guide PDFs: public/files/avatar-photo-guide-en|ru.pdf (her files; text review pending).
import type { Project, MediaRef } from './types';
import meshForBrands from '../assets/portfolio/avatars/mesh-for-brands.jpg';
import meshPersonal from '../assets/portfolio/avatars/mesh-personal.jpg';
import meshUniversal from '../assets/portfolio/avatars/mesh-universal.jpg';
// The photo guide as a picture (her PDF page rendered with pypdfium2, margins trimmed, white tinted to paper)
import guideEn from '../assets/portfolio/avatars/photo-guide-en.jpg';
import guideRu from '../assets/portfolio/avatars/photo-guide-ru.jpg';

// Grey studio gradient like her mesh pictures (dark top, light bottom)
const AVATAR_BG = 'linear-gradient(#8c8d92, #f3f2f7)';
// cover = her front render of each avatar
// slightly darker light and a soft floor shadow, to look closer to her CLO previews (the default light washed them out)
const model = (name: string, label: string, play: string): MediaRef => ({ kind: 'model', src: `/models/avatar-${name}.glb`, ratio: 9 / 16, label, play, poster: `/img/poster-avatar-${name}.jpg`, bg: AVATAR_BG, exposure: 0.75, shadow: 0.5 });
const avatarsGif = (label: string): MediaRef => ({ kind: 'video', src: '/video/custom-avatars-example.mp4', poster: '/img/poster-custom-avatars.jpg', ratio: 1.4884, label, loop: true, autoplay: true });

export const customAvatars: Project = {
  slug: 'custom-avatars',
  path: { en: '/custom-avatars/', ru: '/ru/custom-avatars/' },
  // Date the page went live
  published: '2026-10-08',
  provider: 'natalia',

  en: {
    metaTitle: 'Custom 3D Avatars for CLO3D and Style3D | Phygital Fashion Lab',
    metaDescription: 'Custom 3D avatars from a 3D scan or 4 photos and measurements: three types compared, how it works and a free photo and measurement guide.',
    title: 'Custom 3D Avatar',
    subtitle: 'Three types of avatars for 3D fitting: how they differ and how they are made',
    meta: '3D avatars · CLO3D / Style3D',
    ogImage: '/img/og-custom-avatars.jpg',
    blocks: [
      {
        kind: 'result',
        title: 'Example',
        hideTitle: true,
        caption: 'A custom avatar is a 3D copy of a real body: your fit model or an individual client, so that garments can be fitted in CLO3D or Style3D before the first sample is sewn.',
        media: [avatarsGif('Custom avatar example: reference photos of the body from four sides and the resulting 3D avatar')],
      },
      {
        kind: 'list',
        title: 'How it works',
        items: [
          'You choose the type of avatar in the table below',
          'You send the data: a 3D scan or 4 photos and measurements taken as shown in the guide',
          'I make an AI scan from the photos or prepare the 3D scan and check it against the measurements',
          'I create the avatar of the chosen type',
          'A final check, and you get the file',
        ],
      },
      {
        kind: 'compare',
        title: 'Three types of avatars',
        columns: ['Avatar for brands', 'Personal avatar', 'Basic avatar (mannequin)'],
        rows: [
          { label: 'Preview', cells: [
            model('for-brands', 'Avatar for brands in 3D', 'Rotate in 3D'),
            model('personal', 'Personal avatar in 3D', 'Rotate in 3D'),
            model('universal', 'Basic avatar in 3D', 'Rotate in 3D'),
          ] },
          { label: 'Software', cells: ['CLO3D and Style3D', 'CLO3D', 'CLO3D'] },
          { label: 'Accuracy', cells: ['Some deviations: the software adapts the figure to its standard avatar', 'The most accurate', 'Accurate body; standard head, hands and feet'] },
          { label: 'Symmetry', cells: ['Nearly symmetric', 'Asymmetric, true to the person\'s figure', 'Your choice: symmetric or asymmetric'] },
          { label: 'Mesh', cells: [
            { kind: 'image', img: meshForBrands, alt: 'Mesh of the avatar for brands: an even, light mesh of the standard CLO3D avatar' },
            { kind: 'image', img: meshPersonal, alt: 'Mesh of the personal avatar: so dense that the body looks black' },
            { kind: 'image', img: meshUniversal, alt: 'Mesh of the basic avatar: a light, even mesh' },
          ] },
          { label: 'File size', cells: ['Light', 'Heavy (needs a powerful computer)', 'Light'] },
          { label: 'Textures, hair, shoes', cells: ['Changed freely, like on a standard CLO3D / Style3D avatar', '—', '—'] },
          { label: 'Recommended for', cells: ['A brand avatar based on a fit model\'s figure', 'Made-to-measure', 'Both'] },
        ],
      },
      {
        kind: 'download',
        title: 'Photo and measurement guide',
        text: 'How to take the 4 photos and what measurements to take',
        img: guideEn,
        alt: 'Photo guide for a custom 3D avatar: preparation, camera setup, pose, the four photo angles and the check measurements',
        file: { label: 'Download the guide (PDF)', href: '/files/avatar-photo-guide-en.pdf' },
      },
      // Everything is explained on this page, so the button is about ordering (the window has prices and contacts)
      { kind: 'cta', label: 'Order this service', service: 'm-avatars' },
    ],
  },

  ru: {
    metaTitle: 'Индивидуальные 3D-аватары для CLO3D и Style3D | Phygital Fashion Lab',
    metaDescription: 'Индивидуальные 3D-аватары по 3D-скану или 4 фото и меркам: сравнение трёх типов, как проходит работа и бесплатная памятка для фото и мерок.',
    title: 'Индивидуальный 3D-аватар',
    subtitle: 'Три типа аватаров для 3D-примерки: чем отличаются и как создаются',
    meta: '3D-аватары · CLO3D / Style3D',
    ogImage: '/img/og-custom-avatars.jpg',
    blocks: [
      {
        kind: 'result',
        title: 'Пример',
        hideTitle: true,
        caption: 'Индивидуальный аватар — это 3D-копия реальной фигуры: вашей модели для примерки или индивидуального заказчика, чтобы примерить одежду в CLO3D или Style3D ещё до пошива первого образца.',
        media: [avatarsGif('Пример индивидуального аватара: фото фигуры с четырёх сторон и готовый 3D-аватар')],
      },
      {
        kind: 'list',
        title: 'Как это работает',
        items: [
          'Вы выбираете тип аватара по таблице ниже',
          'Присылаете данные: 3D-скан или 4 фото и контрольные мерки по памятке',
          'Я делаю ИИ-скан из фото или подготавливаю 3D-скан и сверяю мерки',
          'Создаю аватар нужного типа',
          'Финально проверяю по меркам и передаю готовый файл',
        ],
      },
      {
        kind: 'compare',
        title: 'Три типа аватаров',
        columns: ['Аватар для бренда', 'Персональный аватар', 'Универсальный аватар (манекен)'],
        rows: [
          { label: 'Как выглядит', cells: [
            model('for-brands', 'Аватар для бренда в 3D', 'Покрутить в 3D'),
            model('personal', 'Персональный аватар в 3D', 'Покрутить в 3D'),
            model('universal', 'Универсальный аватар в 3D', 'Покрутить в 3D'),
          ] },
          { label: 'Программы', cells: ['CLO3D и Style3D', 'CLO3D', 'CLO3D'] },
          { label: 'Точность', cells: ['Есть погрешности: программа подстраивает фигуру под свой стандартный аватар', 'Самый точный', 'Точное тело; голова, кисти и стопы стандартные'] },
          { label: 'Симметрия', cells: ['Почти симметричный', 'Асимметричный, соответствует фигуре человека', 'На выбор: симметричный или асимметричный'] },
          { label: 'Сетка', cells: [
            { kind: 'image', img: meshForBrands, alt: 'Сетка аватара для бренда: ровная лёгкая сетка стандартного аватара CLO3D' },
            { kind: 'image', img: meshPersonal, alt: 'Сетка персонального аватара: настолько плотная, что фигура выглядит чёрной' },
            { kind: 'image', img: meshUniversal, alt: 'Сетка универсального аватара: лёгкая ровная сетка' },
          ] },
          { label: 'Вес файла', cells: ['Лёгкий', 'Тяжёлый (нужен мощный компьютер)', 'Лёгкий'] },
          { label: 'Текстуры, причёска, обувь', cells: ['Меняются свободно, как у стандартного аватара CLO3D / Style3D', '—', '—'] },
          { label: 'Рекомендуется для', cells: ['Аватара бренда на основе фигуры модели', 'Индивидуального пошива', 'Обоих случаев'] },
        ],
      },
      {
        kind: 'download',
        title: 'Памятка: фото и мерки',
        text: 'Как сделать 4 фото и какие контрольные мерки снять',
        img: guideRu,
        alt: 'Памятка по фотографированию для индивидуального 3D-аватара: подготовка, установка камеры, поза, четыре ракурса и контрольные мерки',
        file: { label: 'Скачать памятку (PDF)', href: '/files/avatar-photo-guide-ru.pdf' },
      },
      { kind: 'cta', label: 'Заказать услугу', service: 'm-avatars' },
    ],
  },
};
