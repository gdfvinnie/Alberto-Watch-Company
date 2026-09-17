/**
 * ============================================================
 *  ALBERTO WATCH COMPANY — SITE CONTENT
 * ============================================================
 *  Static site content (hero, brand strip, about, contact,
 *  technology, services, gallery, stores, settings).
 *  Product records and categories live in products.js and are
 *  re-exported here for convenience.
 *  ============================================================
 */
import { products, categories } from './products.js'

export const settings = {
  brandName: 'ALBERTO',
  brandSub: 'WATCH COMPANY',
  navLabels: {
    home: 'Home',
    products: 'Products',
    technology: 'Technology',
    'store-locator': 'Store Locator',
    support: 'Support',
    gallery: 'Gallery',
    about: 'About Us',
    contact: 'Contact Us',
    sitemap: 'Sitemap',
  },
  footerNote: 'Demonstration project — all data fictional.',
}

export const hero = {
  kicker: 'Est. 2006 — Full-service watch house',
  title: 'Timeless Precision.\nExceptional Craftsmanship.',
  text:
    'Discover exceptional timepieces, professional watch repair, appraisal services and first-class customer care at Alberto Watch Company.',
  primaryCta: 'Explore Collection',
  primaryTarget: 'products',
  secondaryCta: 'Our Services',
  secondaryTarget: 'support',
  image: '/img/submariner.jpg',
  imageAlt:
    "Rolex Submariner Date diver's watch with blue dial, blue bezel and Rolesor bracelet",
}

export const brandStrip = ['ROLEX', 'OMEGA', 'CITIZEN', 'SEIKO', 'BULOVA', 'MICHAEL KORS']

export const about = {
  kicker: 'Our Story',
  title: 'About Alberto Watch Company',
  storyTitle: 'Traditional craft, modern care',
  paragraphs: [
    'Alberto Watch Company combines traditional watchmaking craftsmanship with modern retail and customer service. Founded in 2006 as a single repair bench in Lagos, the company has grown into a full-service watch house — retailing luxury timepieces while keeping a master watchmaker on every shop floor.',
    "Today we provide luxury watches, professional watch repair, watch appraisal, preventive maintenance and lifetime customer support for every watch we sell — and most watches we don't.",
  ],
  points: [
    'Every timepiece authenticated before it reaches the shelf',
    'In-house certified watchmakers — no shipping your watch away',
    'Written appraisals accepted by all major Nigerian insurers',
    '2-year service warranty on every repair we perform',
  ],
  image: '/img/watchmaking.jpg',
  imageAlt: 'Watchmaker assembling a movement at the Alberto Watch Company repair bench',
  imageCaption: 'Movement servicing at our Lagos workshop — every repair is done in-house.',
  stats: [
    { value: 20, suffix: '+', label: 'Years of Experience' },
    { value: 5000, suffix: '+', label: 'Watches Serviced' },
    { value: 2500, suffix: '+', label: 'Happy Customers' },
    { value: 15, suffix: '+', label: 'Premium Brands' },
  ],
}

export const contact = {
  kicker: 'Get in Touch',
  title: 'Contact Us',
  lead:
    'Questions about a timepiece, a repair, or an appraisal? Our Lagos flagship replies within one business day.',
  company: 'Alberto Watch Company',
  email: 'info@albertowatchcompany.com',
  phone: '+234 800 123 4567',
  address: '12 Luxury Avenue, Victoria Island, Lagos, Nigeria',
  hoursLine1: 'Monday – Saturday: 9:00 AM – 6:00 PM',
  hoursLine2: 'Sunday: Closed',
  mapNote:
    'Flagship showroom on Victoria Island — validated parking, wheelchair accessible, private appointment lounge available.',
}

export const technology = {
  kicker: 'Inside the Movement',
  title: 'Watch Technology',
  lead:
    'From a vibrating quartz crystal to light-powered calibres — understand the engineering that makes a great watch more than the sum of its parts.',
  items: [
    {
      title: 'Quartz Movement',
      text: 'An electronic oscillator regulated by a quartz crystal vibrates 32,768 times per second. The circuit counts these vibrations and steps the motor — accuracy within ±15 seconds a month.',
    },
    {
      title: 'Automatic Movement',
      text: 'A swinging rotor winds the mainspring as your wrist moves, so the watch powers itself through pure mechanics — no battery, hundreds of precision parts working in harmony.',
    },
    {
      title: 'Eco-Drive Technology',
      text: 'Citizen Eco-Drive-style watches convert any light source into energy through a solar cell beneath the dial, storing it in a rechargeable cell — no battery replacements, ever.',
    },
    {
      title: 'Smartwatch Technology',
      text: 'Optical heart-rate sensors, SpO₂ and GPS pair with Bluetooth to deliver notifications, fitness tracking, mobile payments and voice assistants on your wrist.',
    },
    {
      title: 'Water Resistance',
      text: 'Ratings are pressure tests, not depth limits: 30 m survives splashes, 50–100 m handles swimming, 200 m+ suits diving. Gaskets and screw-down crowns keep moisture out.',
    },
    {
      title: 'Mechanical Precision',
      text: 'Hand-assembled movements regulated in five positions achieve chronometric excellence. Bevelling, Geneva stripes and blued screws — craftsmanship measured in microns.',
    },
  ],
}

export const services = [
  { title: 'Watch Repair', text: 'From movement Overhauls to full restorations, performed in-house by certified watchmakers.' },
  { title: 'Watch Appraisal', text: 'Insurance-grade written valuations with documentation — ideal for estates and coverage.' },
  { title: 'Battery Replacement', text: 'Pressure-tested battery changes while you wait, with new case-back gaskets fitted.' },
  { title: 'Strap Replacement', text: 'Leather, rubber, NATO and bracelet fitting from our stocked designer collections.' },
  { title: 'Cleaning & Maintenance', text: 'Ultrasonic cleaning, polishing and water-resistance re-testing to keep watches thriving.' },
  { title: 'Warranty Support', text: 'Two-year service warranty on all repairs, with authorised-brand support handled for you.' },
]

export const gallery = [
  { key: '/img/daytona-wrist.png', title: 'Cosmograph Daytona, on the wrist', cat: 'Luxury Watches' },
  { key: '/img/submariner-diving.jpg', title: 'Submariner, working tool', cat: 'Sport Watches' },
  { key: '/img/rolex-pair.jpg', title: 'Submariner & GMT-Master II', cat: 'Luxury Watches' },
  { key: '/img/speedmaster.jpg', title: 'Speedmaster "Pre-Moon"', cat: 'Vintage Watches' },
  { key: '/img/gmt-16710.jpg', title: 'GMT-Master II 16710', cat: 'Vintage Watches' },
  { key: '/img/daytona-pushers.jpg', title: 'Chronograph pushers, up close', cat: 'Watch Details' },
  { key: '/img/hevalve.jpg', title: 'Helium escape valve', cat: 'Watch Details' },
  { key: '/img/crown1.jpg', title: 'Fluted crown, macro', cat: 'Watch Details' },
  { key: '/img/crown2.jpg', title: 'Crown and case, detailed', cat: 'Watch Details' },
  { key: '/img/eta2801.jpg', title: 'ETA 2801 movement', cat: 'Movements' },
  { key: '/img/eta955.jpg', title: 'ETA 955 quartz calibre', cat: 'Movements' },
  { key: '/img/tourbillon.jpg', title: 'Tourbillon cage', cat: 'Movements' },
  { key: '/img/chronoswiss.jpg', title: 'Skeletonised chronograph', cat: 'Movements' },
  { key: '/img/quartz-mech.jpg', title: 'Quartz mechanism', cat: 'Movements' },
  { key: '/img/manistee.jpg', title: 'Gear works, bench view', cat: 'Watch Repair' },
  { key: '/img/watchmaking.jpg', title: 'The repair bench', cat: 'Watch Repair' },
  { key: '/img/elgin.jpg', title: 'Watchmaker at work, 1940s', cat: 'Watch Repair' },
  { key: '/img/rolex-store.jpg', title: 'Boutique window display', cat: 'Store' },
  { key: '/img/apple-demo.jpg', title: 'Smart watch display', cat: 'Smart Watches' },
  { key: '/img/galaxy5.jpg', title: 'Galaxy Watch, editorial', cat: 'Smart Watches' },
  { key: '/img/daydate.jpg', title: 'Day-Date, yellow gold', cat: 'Luxury Watches' },
  { key: '/img/bambino.jpg', title: 'Bambino, domed dial', cat: 'Dress Watches' },
  { key: '/img/turtle.jpg', title: 'Prospex Turtle', cat: 'Sport Watches' },
  { key: '/img/prx.jpg', title: 'PRX 35 mm', cat: 'Dress Watches' },
]

export const stores = [
  {
    id: 'lagos',
    name: 'Alberto Watch Company — Lagos (Flagship)',
    address: '12 Luxury Avenue, Victoria Island, Lagos, Nigeria',
    phone: '+234 800 123 4567',
    hours: 'Mon–Sat: 9:00 AM – 6:00 PM · Sun: Closed',
    services: ['Watch Repair', 'Appraisal', 'Luxury Boutique', 'Battery & Strap Service'],
    lat: 6.4281,
    lng: 3.4219,
  },
  {
    id: 'abuja',
    name: 'Alberto Watch Company — Abuja',
    address: '45 Heritage Close, Wuse II, Abuja, FCT, Nigeria',
    phone: '+234 800 765 4321',
    hours: 'Mon–Sat: 9:30 AM – 6:30 PM · Sun: Closed',
    services: ['Luxury Boutique', 'Watch Repair', 'Trade-In Evaluation'],
    lat: 9.0578,
    lng: 7.4951,
  },
  {
    id: 'phc',
    name: 'Alberto Watch Company — Port Harcourt',
    address: '8 Marine Drive, Trans-Amadi, Port Harcourt, Rivers, Nigeria',
    phone: '+234 800 246 8101',
    hours: 'Mon–Sat: 10:00 AM – 6:00 PM · Sun: Closed',
    services: ['Boutique', 'Battery Replacement', 'Cleaning & Maintenance'],
    lat: 4.8156,
    lng: 7.0498,
  },
]

export { products, categories }
