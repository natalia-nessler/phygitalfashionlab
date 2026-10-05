// The shape of a language file (en.ts, later ru.ts). Every language must fill in all of it.

/** A paragraph (string) or a bullet list (array of strings). A "\n" inside a string becomes a line break. */
export type Block = string | string[];
export interface Section { h?: string; blocks: Block[] }

export interface Media {
  src: string;
  width: number;
  height: number;
  /** Video only: width / height, used when the video is not 16:9 */
  ratio?: number;
  /** Image only: full width of the window (used for the wide example boards) */
  wide?: boolean;
  poster?: string;
  /** Video: aria-label. Image: alt text. */
  label: string;
}

export interface Feature {
  kicker: string;
  /** One video, one image, or several images (the lightbox opens on click) */
  video?: Media;
  images?: Media[];
  /** Text next to / under the media. Absent for the plain "Example" video. */
  title?: string;
  text?: string;
  link?: { label: string; href: string };
}

/** A window for a service or an "About us" card */
export interface InfoModal {
  id: string;
  title: string;
  by?: string;
  intro?: string;
  sections: Section[];
  feature?: Feature;
  /**
   * Price block, shown at the end of the window text (after the case, before the provider's contacts).
   * intro: optional lead paragraph. from: the "from X" line. items: price list (e.g. by complexity).
   * notes: paragraphs after the list; "\n" inside one note makes a line break.
   */
  pricing?: { h: string; intro?: string; from?: string; items: { name: string; price: string }[]; notes: string[] };
  /** Who provides the service: her contacts are shown at the end of the window instead of the button */
  provider?: 'natalia' | 'polina';
  /** "Get in touch" button at the end of the window */
  cta: boolean;
}

export interface CardCopy { modal: string; title: string; desc: string; foot?: string }

export interface Copy {
  lang: string;
  /** Open Graph locale, e.g. en_US, ru_RU */
  locale: string;
  /** Link to the other language version, shown at the top right */
  langSwitch: { label: string; href: string; lang: string; aria: string };
  meta: { title: string; description: string };
  jsonLd: Record<string, unknown>;
  ui: {
    getInTouch: string;
    closeSection: string;
    closeWindow: string;
    copy: string;
    copied: string;
    lightbox: string;
    newTab: string;
    languages: string;
  };
  hero: { eyebrow: string[]; h1: string[]; offer: string[]; grounded: string };
  services: {
    title: string;
    groups: { heading?: string; text?: string; cards: CardCopy[]; note?: { bold: string; text: string } }[];
  };
  about: { title: string; cards: CardCopy[] };
  contact: {
    title: string;
    lead: string;
    text: string;
    languagesList: string;
    people: Record<'natalia' | 'polina', { name: string; role: string }>;
  };
  footer: string;
  /** Social icon labels and the copy-button label, per person */
  personAria: Record<'natalia' | 'polina', { copy: string; links: Record<string, string> }>;
  modals: InfoModal[];
  team: {
    id: string;
    title: string;
    bios: { person: 'natalia' | 'polina'; name: string; role: string; alt: string; paragraphs: string[] }[];
  };
  reviews: {
    id: string;
    title: string;
    items: { photo: string; alt: string; quote: string; name: string; role: string }[];
  };
}
