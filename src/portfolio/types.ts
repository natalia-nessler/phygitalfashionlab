// Shape of a portfolio project. One file per project in this folder.
// The page is a list of blocks, so every case can use only the blocks it needs, in any order.
import type { ImageMetadata } from 'astro';
import type { PersonKey } from '../content/people';

/** A picture or a video. Texts (alt, labels) are written per language. */
export type MediaRef =
  | { kind: 'image'; img: ImageMetadata; alt: string }
  /** Video file on the site (public/video) */
  | { kind: 'video'; src: string; poster?: string; ratio: number; label: string; /** play again from the start when it ends (short animations) */ loop?: boolean; /** silent animation that plays by itself like a GIF, no controls (exception, her choice) */ autoplay?: boolean }
  /** External player (e.g. Kinescope); loads only after a click */
  | { kind: 'embed'; src: string; ratio: number; label: string; play: string }
  /** 3D model (GLB in public/models) that visitors can rotate; the viewer loads only after a click */
  | { kind: 'model'; src: string; ratio: number; label: string; play: string; poster?: string; /** CSS background behind the model (match the cover picture); default black */ bg?: string; /** brightness of the 3D view (default 1; lower = closer to darker CLO previews) */ exposure?: number; /** soft shadow on the floor, 0–1 */ shadow?: number };

export type Block =
  /** Short overview in a row: e.g. Starting point / Task / Result */
  | { kind: 'overview'; /** heading for search engines and screen readers only (not shown) */ title?: string; items: { label: string; text: string }[] }
  /** Process: an optional full-width line under the title, then steps: a short caption above a picture or video; a list of media shows them side by side */
  | { kind: 'steps'; title?: string; intro?: string; steps: { /** one item, one row side by side (list), or several rows (list of lists) */ media: MediaRef | MediaRef[] | MediaRef[][]; caption?: string; /** short label under each side-by-side item, in reading order across all rows */ labels?: string[]; /** 'center': side-by-side media at a moderate height, centered (not full width) */ layout?: 'center' }[] }
  /** Result: main picture and details */
  | { kind: 'result'; title?: string; /** true: the title is for search engines and screen readers only */ hideTitle?: boolean; /** line above the picture; `link.text` (part of the caption) becomes an external link */ caption?: string; link?: { text: string; href: string }; media: MediaRef[] }
  /** Small print: tools, team, photographer */
  | { kind: 'credits'; lines: { label: string; text: string }[] }
  /** Story ("project" format, e.g. moved from Behance): text paragraphs and pictures in their original order */
  | { kind: 'story'; items: ({ text: string[] } | { media: MediaRef })[] }
  /** Numbered steps (text only), e.g. "How it works" */
  | { kind: 'list'; title?: string; items: string[] }
  /** Comparison table: one column per option (equal widths), a narrow first column with the row names.
      A cell is text, or a picture / video / 3D model. On phones it turns into one card per option. */
  | { kind: 'compare'; title?: string; columns: string[]; rows: { label: string; cells: (string | MediaRef)[] }[] }
  /** A document shown as a picture with a download icon in its top right corner (e.g. a PDF guide) */
  | { kind: 'download'; title?: string; text?: string; img: ImageMetadata; alt: string; file: { label: string; href: string } }
  /** Button to a service window on the main page: opens Services and that window (`service` = window id, e.g. 'm-pattern') */
  | { kind: 'cta'; label: string; service: string }
  /** Not filled yet: shown only while we work on the page */
  | { kind: 'placeholder'; label: string; note: string };

export interface CaseCopy {
  /** Browser tab title and link preview */
  metaTitle: string;
  metaDescription: string;
  /** Page heading; \n = line break */
  title: string;
  subtitle?: string;
  /** Small line under the title: service · client · year */
  meta: string;
  /** Cover picture under the title (optional: a page may start with a video instead) */
  cover?: { img: ImageMetadata; alt: string };
  /** Link preview picture (1200×630, in public/), e.g. '/img/og-phoenix-jacket-en.jpg' */
  ogImage?: string;
  blocks: Block[];
}

export interface Project {
  slug: string;
  /** Own address instead of /portfolio/<slug>/ (e.g. a guide page): English and Russian paths */
  path?: { en: string; ru: string };
  year?: number;
  /** Date the page went live (YYYY-MM-DD): datePublished / video uploadDate in structured data */
  published: string;
  /** The client, for structured data */
  client?: { name: string; url?: string };
  provider: PersonKey;
  en: CaseCopy;
  /** Russian version: added later */
  ru?: CaseCopy;
}

/** Interface texts of the portfolio pages (buttons etc.), per language */
export interface CaseUi {
  lang: 'en' | 'ru';
  locale: string;
  home: string;
  allProjects: string;
  langSwitch: { label: string; lang: string; aria: string };
  homePath: string;
  portfolioPath: string;
  portfolioTitle: string;
  portfolioDescription: string;
  portfolioLead: string;
}
