// ─────────────────────────────────────────────────────────
// SALON PREMIUM — Single Source of Truth for Business Info
// ─────────────────────────────────────────────────────────

export const siteConfig = {
  name: 'AURÈLE',
  tagline: 'The Art of Beautiful Hair',
  description:
    'A premium hair salon experience where artistry meets precision. Every visit is a bespoke journey of transformation.',
  shortDescription: 'Premium Hair Salon & Styling Studio',

  // Contact
  phone: '',
  whatsapp: '',
  email: '',
  bookingUrl: '',

  // Location
  address: {
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    full: '',
  },
  coordinates: {
    lat: 0,
    lng: 0,
  },
  mapUrl: '',

  // Hours
  hours: [
    { day: 'Monday', time: 'Closed' },
    { day: 'Tuesday', time: '10:00 AM – 7:00 PM' },
    { day: 'Wednesday', time: '10:00 AM – 7:00 PM' },
    { day: 'Thursday', time: '10:00 AM – 8:00 PM' },
    { day: 'Friday', time: '10:00 AM – 8:00 PM' },
    { day: 'Saturday', time: '9:00 AM – 6:00 PM' },
    { day: 'Sunday', time: '10:00 AM – 4:00 PM' },
  ],

  // Social
  social: {
    instagram: '',
    facebook: '',
    tiktok: '',
    pinterest: '',
  },

  // Services — prices left empty when unknown
  services: [
    {
      id: 'cut-style',
      category: 'Cut & Style',
      title: 'Precision Cut & Style',
      description:
        'A bespoke cutting experience tailored to your face shape, hair texture, and personal style. Includes consultation, shampoo, precision cut, and editorial finish.',
      image: '/images/portrait-1.jpg',
      price: '',
      duration: '',
    },
    {
      id: 'color',
      category: 'Color',
      title: 'Signature Color',
      description:
        'From subtle, sun-kissed dimensions to bold artistic transformations. Our colorists use premium formulations for lasting vibrancy and hair health.',
      image: '/images/color-work.jpg',
      price: '',
      duration: '',
    },
    {
      id: 'balayage',
      category: 'Balayage & Highlights',
      title: 'Balayage & Highlights',
      description:
        'Hand-painted color artistry creating natural, dimensional movement. Each application is customized to complement your skin tone and lifestyle.',
      image: '/images/portrait-3.jpg',
      price: '',
      duration: '',
    },
    {
      id: 'treatment',
      category: 'Treatments',
      title: 'Restorative Treatments',
      description:
        'Deep conditioning, keratin smoothing, and protein repair treatments that restore strength, shine, and manageability.',
      image: '/images/texture-hair.jpg',
      price: '',
      duration: '',
    },
    {
      id: 'styling',
      category: 'Styling',
      title: 'Editorial Styling',
      description:
        'Special occasion styling, blowouts, and updos crafted with precision. From editorial-inspired looks to timeless elegance for your most important moments.',
      image: '/images/portrait-4.jpg',
      price: '',
      duration: '',
    },
    {
      id: 'bridal',
      category: 'Bridal',
      title: 'Bridal Experience',
      description:
        'A comprehensive bridal hair journey including consultation, trial session, and day-of styling. We create looks that photograph beautifully and last through every moment.',
      image: '/images/portrait-5.jpg',
      price: '',
      duration: '',
    },
  ],

  // Navigation
  nav: [
    { label: 'Services', href: '/services' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'About', href: '/about' },
    { label: 'Book', href: '/book' },
  ],

  // SEO
  seo: {
    title: 'AURÈLE — The Art of Beautiful Hair',
    description:
      'A premium hair salon experience where artistry meets precision. Bespoke cuts, signature color, balayage, and editorial styling.',
    ogImage: '/images/hero.jpg',
  },
} as const;

export type Service = (typeof siteConfig.services)[number];
