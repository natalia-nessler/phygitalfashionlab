// Structured data helpers (JSON-LD, read by search engines and AI; not shown on the page).
// Shared by every language file.
export const site = 'https://phygitalfashionlab.com';
export const orgId = `${site}/#organization`;
const orgRef = { '@id': orgId };

export const offer = (name: string, description: string, price?: { min: number; max?: number; currency: string; unit: string }) => ({
  '@type': 'Offer',
  itemOffered: { '@type': 'Service', name, description, provider: orgRef, areaServed: 'Worldwide' },
  ...(price && {
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      minPrice: price.min,
      ...(price.max !== undefined && { maxPrice: price.max }),
      priceCurrency: price.currency,
      unitText: price.unit,
    },
  }),
});

export const review = (author: string, reviewBody: string) => ({
  '@type': 'Review',
  author: { '@type': 'Person', name: author },
  itemReviewed: orgRef,
  reviewBody,
});

/** Price range helper for offer(): e.g. rub(6000, 20000, 'за модель') */
export const rub = (min: number, max: number | undefined, unit: string) => ({ min, max, currency: 'RUB', unit });
export const usd = (min: number, max: number | undefined, unit: string) => ({ min, max, currency: 'USD', unit });

export const sameAs = ['https://www.behance.net/natalia_nessler', 'https://www.linkedin.com/in/natalia-nessler/'];
export const nataliaSameAs = ['https://www.linkedin.com/in/natalia-nessler/', 'https://www.behance.net/natalia_nessler'];
