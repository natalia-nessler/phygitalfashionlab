// All portfolio projects, in the order they appear on the portfolio page.
// To add a project: create its file in this folder and add it to the list below.
import type { Project, CaseUi } from './types';
import { phoenixJacket } from './phoenix-jacket';
import { gazpromMediaDress } from './gazprom-media-dress';
import { visualBakeryShowreel } from './visual-bakery-showreel';

export const projects: Project[] = [phoenixJacket, gazpromMediaDress, visualBakeryShowreel];

export const caseUi: Record<'en' | 'ru', CaseUi> = {
  en: {
    lang: 'en',
    locale: 'en_US',
    home: 'Home',
    allProjects: 'Portfolio',
    langSwitch: { label: 'Русский', lang: 'ru', aria: 'Русская версия страницы' },
    homePath: '/',
    portfolioPath: '/portfolio/',
    portfolioTitle: 'Portfolio | Phygital Fashion Lab',
    portfolioDescription: '3D garment development case studies: patterns, virtual fitting and visualization from sketch to finished garment.',
    portfolioLead: 'Case studies: how projects go from sketch to finished garment.',
  },
  ru: {
    lang: 'ru',
    locale: 'ru_RU',
    home: 'На главную',
    allProjects: 'Портфолио',
    langSwitch: { label: 'English', lang: 'en', aria: 'English version of this page' },
    homePath: '/ru/',
    portfolioPath: '/ru/portfolio/',
    portfolioTitle: 'Портфолио | Phygital Fashion Lab',
    portfolioDescription: 'Кейсы 3D-разработки одежды: лекала, виртуальная примерка и визуализация от эскиза до готового изделия.',
    portfolioLead: 'Кейсы: как проекты проходят путь от эскиза до готового изделия.',
  },
};

/** Address of a project page in a given language */
export const casePath = (lang: 'en' | 'ru', slug: string) => `${lang === 'ru' ? '/ru' : ''}/portfolio/${slug}/`;
