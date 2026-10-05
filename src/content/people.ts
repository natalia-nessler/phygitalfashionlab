// Contacts that do not change with the language. Texts (roles, labels) live in en.ts / ru.ts.
export type Social = 'linkedin' | 'behance' | 'telegram' | 'whatsapp' | 'vk';

export const people = {
  natalia: {
    emailUser: 'nessler07',
    emailDomain: 'gmail.com',
    photo: '/img/natalia-nessler.jpg',
    // Icon order: LinkedIn, Behance, Telegram, WhatsApp, VK (VK last)
    links: [
      { icon: 'linkedin', href: 'https://www.linkedin.com/in/natalia-nessler/', title: 'LinkedIn' },
      { icon: 'behance', href: 'https://www.behance.net/natalia_nessler', title: 'Behance' },
      { icon: 'telegram', href: 'https://t.me/natasha_nessler', title: 'Telegram' },
      { icon: 'whatsapp', href: 'https://wa.me/79119898703', title: 'WhatsApp' },
      { icon: 'vk', href: 'https://vk.ru/tash.nessler', title: 'VK' },
    ],
  },
  polina: {
    emailUser: 'polinakos.14',
    emailDomain: 'gmail.com',
    photo: '/img/polina-kosareva.jpg',
    links: [
      { icon: 'telegram', href: 'https://t.me/Polina_Kolibri', title: 'Telegram' },
      { icon: 'whatsapp', href: 'https://wa.me/79062542341', title: 'WhatsApp' },
      { icon: 'vk', href: 'https://vk.ru/poli_koli14', title: 'VK' },
    ],
  },
} as const satisfies Record<string, { emailUser: string; emailDomain: string; photo: string; links: readonly { icon: Social; href: string; title: string }[] }>;

export type PersonKey = keyof typeof people;
