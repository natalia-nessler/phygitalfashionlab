// English copy. Wording is final: change it only when Natasha asks.
// Rules: American spelling, no trailing periods in list items.
import type { Copy } from './types';
import { site, orgId, offer, review, usd, sameAs, nataliaSameAs } from './jsonld';

const description =
  'Garment patterns, virtual fitting, technical documentation and 3D visualization from independent specialists with real pattern-making and production experience.';

export const en: Copy = {
  lang: 'en',
  locale: 'en_US',
  langSwitch: { label: 'Русский', href: '/ru/', lang: 'ru', aria: 'Русская версия сайта' },
  meta: {
    title: 'Phygital Fashion Lab | 3D Garment Development for the Fashion Industry',
    description,
  },

  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': orgId,
    name: 'Phygital Fashion Lab',
    url: `${site}/`,
    image: `${site}/og-image.png`,
    description,
    slogan: 'Develop. Fit. Visualize. Before you produce',
    areaServed: 'Worldwide',
    knowsAbout: ['3D garment development', 'Garment pattern making', 'Virtual fitting', 'Garment technical documentation', '3D garment visualization'],
    sameAs,
    member: [
      { '@type': 'Person', name: 'Natalia Nessler', jobTitle: '3D Garment Developer & Visualization Specialist', sameAs: nataliaSameAs },
      { '@type': 'Person', name: 'Polina Kosareva', jobTitle: 'Garment Technologist' },
    ],
    knowsLanguage: ['en', 'ru'],
    makesOffer: [
      offer('3D Pattern Development', 'Garment patterns developed in 3D from reference photos or sketches.', usd(90, 300, 'per style')),
      offer('Garment Technical Documentation', 'Technical documentation for garment production, covering construction details, assembly methods, materials and trims.', usd(120, 290, 'per style')),
      offer('3D Fitting', 'Virtual fittings using your patterns to review proportions and fit before a sample is sewn.', usd(50, 135, 'per style')),
      offer('Garment & Accessory Visualization', 'Detailed 3D models of garments and accessories for catalogs, animation and CGI projects.', usd(75, 230, 'per style')),
      offer('Custom Avatars', 'Custom avatars from photos of a fit model or individual client for garment development and virtual fitting.', usd(75, 75, 'per avatar')),
      offer('Sketch to Technical Design', 'A rough sketch or design idea turned into a clear technical drawing and a detailed brief for pattern development and sampling.', usd(50, undefined, 'per style')),
    ],
    review: [
      review('Nelya Baker', 'Natasha is a true master of her craft. No matter how complex the product, she always creates its 3D model quickly and to a high standard, capturing texture and print accurately.'),
      review('Lyudmila Berillo', "Working with Natalia, I'm confident that even my boldest ideas will be turned into well-made patterns, with a construction that expresses my vision as fully as possible. She is devoted to her craft, highly skilled in many techniques and never afraid to experiment!"),
    ],
  },

  ui: {
    getInTouch: 'Get in touch',
    closeSection: 'Close ↑',
    closeWindow: 'Close',
    copy: 'Copy',
    copied: 'Copied',
    lightbox: 'Enlarged image',
    newTab: ' (opens in a new tab)',
    languages: 'Languages: ',
  },

  hero: {
    eyebrow: ['Phygital Fashion Lab', '3D garment development for the fashion industry'],
    h1: ['Develop. Fit. Visualize', 'Before you produce'],
    offer: ['Garment Patterns,', 'Virtual Fitting,', 'Technical Documentation,', '3D Visualizations,'],
    grounded: 'grounded in physical pattern-making and production experience',
  },

  services: {
    title: 'Services',
    groups: [
      {
        heading: 'Garment Development',
        text: 'Garment pattern development and technical documentation. Services can be booked separately or combined within a project.',
        cards: [
          { modal: 'm-pattern', title: '3D Pattern Development', desc: 'Garment pattern development in 3D from reference photos or sketches. Review and approval of the garment\'s silhouette, proportions and design details through video previews during development.', foot: 'Provided by Natalia Nessler' },
          { modal: 'm-techdoc', title: 'Garment Technical Documentation', desc: 'Technical documentation for garment production, covering construction details, assembly methods, materials and trims.', foot: 'Provided by Polina Kosareva' },
        ],
      },
      {
        cards: [
          { modal: 'm-fitting', title: '3D Fitting', desc: 'Virtual fittings using your patterns to review proportions and fit before a sample is sewn.', foot: 'Provided by Natalia Nessler' },
          { modal: 'm-visual', title: 'Garment & Accessory Visualization', desc: 'Detailed 3D models of garments and accessories for catalogs, animation and CGI projects, with carefully developed fabrics, prints and trims.', foot: 'Provided by Natalia Nessler' },
        ],
      },
      {
        heading: 'Additional Services',
        cards: [
          { modal: 'm-avatars', title: 'Custom Avatars', desc: 'Custom avatars created from photos, measurements or 3D scan data of your fit model or individual client for garment development and virtual fitting.', foot: 'Provided by Natalia Nessler' },
          { modal: 'm-brief', title: 'Sketch to Technical Design', desc: 'Your rough sketch or design idea turned into a clear technical drawing and a detailed brief for pattern development and sampling.', foot: 'Provided by Natalia Nessler' },
        ],
      },
    ],
  },

  about: {
    title: 'About us',
    cards: [
      { modal: 'm-about', title: 'Our approach', desc: 'We combine experience in pattern making, garment technology and 3D to solve garment development and visualization tasks.' },
      { modal: 'm-team', title: 'Meet the specialists', desc: 'Meet the specialists behind Phygital Fashion Lab.' },
      { modal: 'm-how', title: 'How we work', desc: 'From the first message to handover: how projects start, how you review the work and what you receive.' },
      { modal: 'm-reviews', title: 'Client testimonials', desc: 'What our clients say about working with us.' },
    ],
  },

  contact: {
    title: 'Contact',
    lead: "Let's talk about your project",
    text: 'An idea, a sketch or a set of patterns is enough to start.',
    languagesList: 'English, Русский',
    people: {
      natalia: { name: 'Natalia Nessler', role: '3D development, fitting and visualization' },
      polina: { name: 'Polina Kosareva', role: 'Technical documentation' },
    },
  },

  footer: '© 2026 Phygital Fashion Lab',

  personAria: {
    natalia: {
      copy: "Copy Natalia's email address",
      links: {
        linkedin: 'Natalia on LinkedIn (opens in a new tab)',
        behance: "Natalia's portfolio on Behance (opens in a new tab)",
        telegram: 'Natalia on Telegram (opens in a new tab)',
        whatsapp: 'Message Natalia on WhatsApp (opens in a new tab)',
        vk: 'Natalia on VK (opens in a new tab)',
      },
    },
    polina: {
      copy: "Copy Polina's email address",
      links: {
        telegram: 'Polina on Telegram (opens in a new tab)',
        whatsapp: 'Message Polina on WhatsApp (opens in a new tab)',
        vk: 'Polina on VK (opens in a new tab)',
      },
    },
  },

  modals: [
    {
      id: 'm-pattern',
      title: '3D Pattern Development',
      by: 'Provided by Natalia Nessler',
      intro: 'Garment pattern development in 3D from reference photos or sketches. Review and approval of the garment\'s silhouette, proportions and design details through video previews during development.',
      sections: [
        {
          h: 'Process',
          blocks: [[
            'I discuss your sketch or reference photo, materials and requirements with you',
            'I develop the construction and refine the fit in 3D',
            'I send video previews for you to approve the silhouette, proportions and details',
            'I make the agreed changes and finalize the patterns',
          ]],
        },
        { h: 'Deliverables', blocks: [['Garment patterns in PDF or DXF format', 'A pattern piece specification', 'A technical render of the garment']] },
      ],
      feature: {
        kicker: 'Featured project',
        video: {
          src: '/video/phoenix-jacket.mp4',
          poster: '/img/poster-phoenix-jacket.jpg',
          ratio: 1.1227,
          width: 1080,
          height: 962,
          label: 'Phoenix Jacket: 3D pattern development next to the muslin mockup on the model',
        },
        title: 'Phoenix Jacket',
        text: "From the designer's sketch, through 3D pattern development, to the finished garment.",
        link: { label: 'View project on Behance ↗', href: 'https://www.behance.net/gallery/244432175/The-Phoenix-Jacket-3D-Prototyping-Case-Study' },
      },
      pricing: {
        h: 'Service Pricing',
        intro: 'Prices are per style and depend on construction complexity, materials and scope. The final quote is agreed after reviewing your sketches, references and source files.',
        from: 'From $90 per style',
        items: [
          { name: 'Simple', price: '$90–120' },
          { name: 'Medium', price: '$120–205' },
          { name: 'Complex', price: '$205–300' },
          { name: 'Experimental', price: 'Quoted individually' },
        ],
        notes: ['Grading with 3D fit checks: an additional 25–30% of the base style price per size.'],
      },
      provider: 'natalia',
      cta: false,
    },
    {
      id: 'm-techdoc',
      title: 'Garment Technical Documentation',
      by: 'Provided by Polina Kosareva · Garment Technologist',
      intro: 'Technical documentation for garment production, covering construction details, assembly methods, materials and trims.',
      sections: [
        {
          h: 'Scope',
          blocks: [[
            'Garment descriptions covering construction features and assembly sequence',
            'Material and trim specifications',
            'Technical drawings of construction details and processing methods',
            'Sample review comments on workmanship, quality and compliance with the brief',
            'Packaging and labeling comments',
          ]],
        },
        { h: 'Product range', blocks: ['Menswear, womenswear and childrenswear, from underwear to insulated outerwear. All material types and market segments, including mass-market, mid-market and premium.'] },
        { h: 'Working format', blocks: ["Remote, project-based work according to your brief. Documentation can be prepared using Polina's templates or your own."] },
        { h: 'Deliverables', blocks: ['Documents in Excel, PDF or Word, as agreed for the project.'] },
      ],
      pricing: {
        h: 'Service Pricing',
        items: [
          { name: 'Technical Documentation', price: '$120–290 per style' },
          { name: 'Sample Photo Review', price: '$70–170 per sample' },
          { name: 'Quality Control Report Review', price: '$50–120 per report' },
        ],
        notes: ['Pricing depends on the complexity of the garment and the scope of work.\nComplex styles and non-standard requests are quoted individually.'],
      },
      provider: 'polina',
      cta: false,
    },
    {
      id: 'm-fitting',
      title: '3D Fitting',
      by: 'Provided by Natalia Nessler',
      intro: 'Virtual fittings using your patterns to review proportions and fit before a sample is sewn.',
      sections: [
        {
          h: 'Process',
          blocks: [[
            'I receive your patterns and assemble the garment in 3D',
            'I send a detailed video preview showing the garment from different angles and highlighting questions or potential issues for discussion with you and your pattern maker',
            'Where needed, I make targeted pattern adjustments in agreement with your pattern maker',
            'Once everything is approved, I prepare the final images',
          ]],
        },
        {
          h: 'Deliverables',
          blocks: [[
            'A detailed video preview for review and discussion',
            'Final garment renders and technical views in several poses and from multiple angles, with and without fabric textures',
            'Where adjustments have been made, revised patterns can be returned in DXF format, without print preparation or seam allowances added',
          ]],
        },
      ],
      feature: {
        kicker: 'Featured project',
        images: [{
          src: '/img/case-gazprom-media-merch-dress.jpg',
          width: 1600,
          height: 1028,
          label: 'Gazprom Media Merch Dress: 3D try-on, physical try-on of the sewn sample from front and back, and the finished dresses at the event',
        }],
        title: 'Gazprom Media Merch Dress',
        text: '3D fitting and pattern refinement as part of the Factory Base team.',
        link: { label: 'View project on Behance ↗', href: 'https://www.behance.net/gallery/254678705/3D-Fitting-Case-Study-Gazprom-Media-Merch-Dress' },
      },
      pricing: {
        h: 'Service Pricing',
        from: 'From $50 per style',
        items: [
          { name: 'Simple', price: '$50–75' },
          { name: 'Medium', price: '$75–110' },
          { name: 'Complex', price: '$110–135' },
          { name: 'Non-standard', price: 'Quoted individually' },
        ],
        notes: [
          'The exact price is quoted individually.',
          'Minor adjustments are included. Targeted changes to appearance and fit within the original brief are made in coordination with your pattern maker. Preparing patterns for production is not included in this service.',
          'A repeat fitting of a substantially revised pattern set: 50% of the original fitting fee.',
        ],
      },
      provider: 'natalia',
      cta: false,
    },
    {
      id: 'm-visual',
      title: 'Garment & Accessory Visualization',
      by: 'Provided by Natalia Nessler',
      intro: 'Detailed 3D models of garments and accessories for catalogs, animation and CGI projects, with carefully developed fabrics, prints and trims.',
      sections: [
        {
          h: 'Process',
          blocks: [[
            'We discuss the task, references and how the model will be used',
            'I build the model from your patterns or from scratch for visualization',
            'I develop materials, textures, prints, stitching, trims and accessories within the agreed scope',
            'Where needed, I prepare colorways, UV mapping and animation',
            'I review the result with you and prepare files in the required formats',
          ]],
        },
        {
          h: 'Deliverables',
          blocks: [
            'Deliverables and file formats are agreed based on how you plan to use them:',
            ['Still renders or animation', '3D model files with textures, in formats including ZPRJ, OBJ or FBX'],
          ],
        },
      ],
      feature: {
        kicker: 'Featured work',
        video: {
          src: '/video/visual-bakery-showreel.mp4',
          poster: '/img/poster-visual-bakery.jpg',
          width: 1280,
          height: 720,
          label: 'Garment and accessory 3D visualization showreel for Visual Bakery',
        },
        title: '3D Visualization for CGI Videos',
        text: 'A selection of garment and accessory visualizations created for Visual Bakery.',
        link: { label: 'Watch showreel on Behance ↗', href: 'https://www.behance.net/gallery/245131997/3D-Visualization-for-CGI-videos-Showreel' },
      },
      pricing: {
        h: 'Service Pricing',
        from: 'From $75 per style',
        items: [
          { name: 'Simple', price: '$75–120' },
          { name: 'Medium', price: '$120–180' },
          { name: 'Complex', price: '$180–230' },
          { name: 'Non-standard / high detail', price: 'Quoted individually' },
        ],
        notes: [
          'The exact price is quoted individually.',
          'To request a quote, send a sketch or garment photo, any available source files and a description of the deliverables you need.',
        ],
      },
      provider: 'natalia',
      cta: false,
    },
    {
      id: 'm-avatars',
      title: 'Custom Avatars',
      by: 'Provided by Natalia Nessler',
      intro: 'Custom avatars created from photos, measurements or 3D scan data of your fit model or individual client for garment development and virtual fitting.',
      sections: [
        {
          h: 'Process',
          blocks: [[
            'I clarify what the avatar is for: garment development or fitting on a specific body',
            'I send a detailed guide to taking photos and body measurements',
            'I create the avatar from the materials you provide (photos, measurements or 3D scan data) and review the result with you',
          ]],
        },
        {
          h: 'Deliverables',
          blocks: [
            'A custom avatar for use in 3D garment development and fitting.',
            'The file format is agreed before work begins, based on the software you use (CLO3D / Style3D and OBJ).',
          ],
        },
      ],
      feature: {
        kicker: 'Example',
        video: {
          src: '/video/custom-avatars-example.mp4',
          poster: '/img/poster-custom-avatars.jpg',
          ratio: 1.4884,
          width: 1280,
          height: 860,
          label: 'Custom avatar example: reference photos of the body from four sides and the resulting 3D avatar',
        },
      },
      pricing: {
        h: 'Service Pricing',
        from: '$75',
        items: [],
        notes: ['For 3D pattern development or 3D fitting, a custom avatar is created when needed at no extra cost and used only for your project. If you would like to receive the avatar file, it is available at the full price.'],
      },
      provider: 'natalia',
      cta: false,
    },
    {
      id: 'm-brief',
      title: 'Sketch to Technical Design',
      by: 'Provided by Natalia Nessler',
      intro: 'Your rough sketch or design idea turned into a clear technical drawing and a detailed brief for pattern development and sampling.',
      sections: [
        {
          h: 'Process',
          blocks: [[
            'We discuss your sketch: the silhouette, materials and garment details',
            'I help you settle the decisions that are still open',
            'I prepare a technical drawing and a detailed garment description',
            'I create a realistic image so you can review the look',
          ]],
        },
        {
          h: 'Deliverables',
          blocks: [[
            'A technical drawing of the garment',
            'A detailed design description',
            'A photorealistic concept preview to help you review the proposed look',
          ]],
        },
        { h: 'Optional preview', blocks: ['A photo-based preview can show the proposed design on you or your client. It illustrates the intended appearance rather than verifying garment fit.'] },
        { blocks: ['This service can be booked on its own or before 3D pattern development.'] },
      ],
      feature: {
        kicker: 'Examples',
        images: [
          { src: '/img/example-top-and-longline-vest.jpg', width: 2000, height: 875, wide: true, label: 'Sketch to Technical Design example, Top and Longline Vest: original sketch, technical drawing, technical description and photorealistic visualization' },
          { src: '/img/example-crystal-bridal-gown.jpg', width: 2000, height: 875, wide: true, label: 'Sketch to Technical Design example, Crystal Bridal Gown: original sketch, technical drawing, design description and photorealistic visualization' },
        ],
      },
      pricing: {
        h: 'Service Pricing',
        from: 'From $50 per style',
        items: [],
        notes: ['Included in the price when you order pattern development.'],
      },
      provider: 'natalia',
      cta: false,
    },
    {
      id: 'm-about',
      title: 'Our approach',
      intro: 'Phygital Fashion Lab is a collective of independent specialists in garment development, garment technology and 3D visualization. Each of us works independently, and we join forces when a project calls for more than one area of expertise.',
      sections: [
        {
          blocks: [
            "What unites us is a focus on quality and results. In garment development, construction, fit and manufacturing methods are closely connected. That is why we discuss decisions directly: we take each other's requirements into account, spot contradictions early and agree on the details before the garment goes into sewing.",
            'We use 3D to see the shape of a garment early on, check proportions and fit, compare options and discuss changes. This helps reduce the number of physical samples and work through questions that would otherwise only come up at a fitting.',
            'In visualization, we pay close attention to silhouette, texture, details and the way fabric behaves. We create digital garments and accessories for catalogs, presentations, animation and CGI projects, choosing tools to suit each task and combining professional experience, 3D and generative AI.',
            'Each of us prices her own part of the work, agrees on timelines and is responsible for the result. On joint projects, we coordinate the stages and make decisions together. You communicate directly with the specialists doing the work and can come to us for a single service or for a joint project.',
          ],
        },
      ],
      cta: false,
    },
    {
      id: 'm-how',
      title: 'How we work',
      sections: [
        {
          h: '1. Getting to know your project',
          blocks: [
            "You don't need a completed technical brief. An idea, sketch, reference image or existing set of patterns can be a starting point. We discuss what you want to achieve, review the available materials and clarify the next steps together. If a request falls outside our expertise or availability, we'll suggest other options where we can.",
          ],
        },
        {
          h: '2. Agreeing on scope, fees and timeline',
          blocks: [
            'Before work begins, we agree on the scope, deliverables, fees and timeline. Each specialist provides a quote for her part of the project and takes responsibility for that work. Where our tasks overlap or depend on one another, we coordinate the schedule together. The process is tailored to your project, with progress and upcoming stages discussed along the way.',
          ],
        },
        {
          h: '3. Reviewing the results in stages',
          blocks: [
            'We share interim results, discuss your feedback and agree on decisions as the work progresses. For joint projects, we communicate with you or your representative in a shared chat or email thread. Both specialists take part in the discussion, so questions can be addressed directly and decisions stay in context.',
          ],
        },
        {
          h: '4. Making the agreed revisions',
          blocks: [
            'Revisions within the agreed scope are included in the quoted fee. Changes to the agreed design, additional services or new requirements are discussed and quoted separately before the extra work begins.',
          ],
        },
        {
          h: '5. Handing over the deliverables',
          blocks: [
            'We agree on file formats and handover requirements at the start, based on how you plan to use the results. Deliverables may include patterns, technical documentation, fitting previews, renders, animation or textured 3D models.',
          ],
        },
        {
          h: 'Practical details',
          blocks: [
            'We work remotely and communicate in English and Russian via email / WhatsApp / Telegram / VKontakte.\nEach of us operates as a registered self-employed professional.\nInternational payments are handled through Mellow, with invoices and the relevant payment documentation.\nRussian clients pay by bank transfer and receive an official payment receipt.',
          ],
        },
      ],
      cta: true,
    },
  ],

  team: {
    id: 'm-team',
    title: 'Meet the specialists',
    bios: [
      {
        person: 'natalia',
        name: 'Natalia Nessler',
        role: '3D Garment Developer & Visualization Specialist',
        alt: 'Portrait of Natalia Nessler',
        paragraphs: [
          'I have around 12 years of experience in the clothing industry, primarily in womenswear pattern development, fitting and preparation for production.',
          'Today, I combine that experience with 3D garment development and visualization. I develop patterns from sketches and references, carry out virtual fittings using existing patterns, and create detailed digital garments and accessories for catalogs, animation and CGI projects.',
          "My background in pattern making informs how I build digital garments: how the pieces fit together, how fabric behaves and how the garment sits on the body. I enjoy bringing technical precision and visual expression together, whether I'm refining a construction detail or developing fabrics and trims for a close-up render.",
          'I work with CLO3D and Style3D, supported by Blender, Substance, Photoshop and generative AI tools where they suit the task.',
        ],
      },
      {
        person: 'polina',
        name: 'Polina Kosareva',
        role: 'Garment Technologist',
        alt: 'Portrait of Polina Kosareva',
        paragraphs: [
          'I have over six years of experience in industrial garment manufacturing, working across premium and mass-market products. My experience covers womenswear, menswear and childrenswear, from underwear to insulated outerwear.',
          'I have worked both in development departments at major clothing companies and on factory floors, gaining practical knowledge of production equipment and manufacturing processes. My experience includes coordinating the work of six pattern makers at Melon Fashion Group, contributing to a trial production run of protective winter jackets at BTK Group, and overseeing a 500,000-unit knitwear production order in Tajikistan.',
          "I specialize in working through complex construction details and finding practical manufacturing solutions that preserve the design while making garments easier to produce. I adapt construction methods to the client's budget, quality requirements and production context.",
          "Alongside my industry work, I prepare technical documentation for Russian and international factories and support projects through sampling and production approval. I hold a master's degree in Light Industry Product Technology from Saint Petersburg State University of Industrial Technologies and Design, as well as bachelor's and vocational qualifications in garment construction and design.",
          'For me, a successful result is a garment that stays true to the intended design, meets the agreed quality standard and is ready for production.',
        ],
      },
    ],
  },

  faq: {
    title: "FAQ",
    items: [
      {
        q: "What do you need to get started?",
        a: [
          "It depends on the project. You may need sketches, reference images, a description of your idea or existing patterns.\nIf some materials are missing, we'll identify what we can start with and what needs to be clarified as the project progresses.",
        ],
      },
      {
        q: "Can I book just one stage of the process?",
        a: [
          "Yes. You can book an individual service or combine several stages within a single garment development project.",
        ],
      },
      {
        q: "How long does the work take?",
        a: [
          "Timelines depend on the complexity of the project and our current workload. We agree on the schedule after reviewing your materials and before work begins.",
        ],
      },
      {
        q: "How accurately does 3D fitting represent real-world fit? Can it replace physical samples?",
        a: [
          "3D fitting helps assess a garment's silhouette, proportions and fit on the body, identify potential issues before sewing and reduce the number of physical samples.",
          "However, it does not completely replace a physical sample: the specific properties of the material, the finishing methods and the garment's behavior in real life must ultimately be assessed on a finished sample.",
          "Our goal is to resolve as many decisions as possible before sewing, so that the physical sample can be used to validate the result and refine finishing details.",
        ],
      },
      {
        q: "Can you accommodate individual body shapes and proportions?",
        a: [
          "Yes. If a standard avatar is not suitable, we can use a custom avatar created from measurements and photos or from 3D scan data.",
        ],
      },
      {
        q: "Can you prepare the documentation using our template?",
        a: [
          "Yes. We can work with your template or prepare the documentation in our own format.",
        ],
      },
      {
        q: "Do you review physical samples remotely?",
        a: [
          "Yes. Using photos, we compare the visible details of the sample against the approved brief and prepare comments for the factory. If needed, we request additional photos, angles or measurements.",
        ],
      },
    ],
  },

  reviews: {
    id: 'm-reviews',
    title: 'Client testimonials',
    items: [
      {
        photo: '/img/testimonial-nelya-baker.jpg',
        alt: 'Portrait of Nelya Baker, founder and creative director of Visual Bakery',
        quote: '"Natasha is a true master of her craft. No matter how complex the product, she always creates its 3D model quickly and to a high standard, capturing texture and print accurately."',
        name: 'Nelya Baker',
        role: 'Founder and Creative Director, CG & AI studio Visual Bakery',
      },
      {
        photo: '/img/testimonial-lyudmila-berillo.jpg',
        alt: 'Portrait of Lyudmila Berillo, designer at MILLA BERILLO Design Bureau',
        quote: '"Working with Natalia, I\'m confident that even my boldest ideas will be turned into well-made patterns, with a construction that expresses my vision as fully as possible. She is devoted to her craft, highly skilled in many techniques and never afraid to experiment!"',
        name: 'Lyudmila Berillo',
        role: 'Designer, MILLA BERILLO Design Bureau',
      },
    ],
  },
};
