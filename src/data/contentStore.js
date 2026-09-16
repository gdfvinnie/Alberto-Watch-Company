/**
 * ============================================================
 *  ALBERTO WATCH COMPANY — SITE CONTENT STORE
 * ============================================================
 *  Single source of truth for every editable piece of site
 *  content (hero, brand strip, about, contact, catalogue,
 *  gallery, stores, settings).
 *
 *  Storage model (front-end demonstration — no backend):
 *    • awc_content_published  — the live content visitors see
 *    • awc_content_draft      — work-in-progress from the admin
 *    • sessionStorage preview flag — admin "Preview" mode
 *
 *  Publishing copies the draft over the published content.
 *  ============================================================
 */
import { products as DEFAULT_PRODUCTS, categories as DEFAULT_CATEGORIES } from './products.js'

const PUBLISHED_KEY = 'awc_content_published'
const DRAFT_KEY = 'awc_content_draft'
const PREVIEW_KEY = 'awc_content_preview'

/* ------------------------------ Defaults ------------------------------ */

export const DEFAULT_CONTENT = {
  version: 1,

  settings: {
    brandName: 'ALBERTO',
    brandSub: 'WATCH COMPANY',
    showTopbar: false,
    topbarPhone: '+234 800 123 4567',
    topbarEmail: 'info@albertowatchcompany.com',
    topbarNote: 'Free appraisal with every purchase',
    showVisitorCounter: false,
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
  },

  hero: {
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
  },

  brandStrip: ['ROLEX', 'OMEGA', 'CITIZEN', 'SEIKO', 'BULOVA', 'MICHAEL KORS'],

  about: {
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
  },

  contact: {
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
  },

  technology: {
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
  },

  services: {
    items: [
      { title: 'Watch Repair', text: 'From movement Overhauls to full restorations, performed in-house by certified watchmakers.' },
      { title: 'Watch Appraisal', text: 'Insurance-grade written valuations with documentation — ideal for estates and coverage.' },
      { title: 'Battery Replacement', text: 'Pressure-tested battery changes while you wait, with new case-back gaskets fitted.' },
      { title: 'Strap Replacement', text: 'Leather, rubber, NATO and bracelet fitting from our stocked designer collections.' },
      { title: 'Cleaning & Maintenance', text: 'Ultrasonic cleaning, polishing and water-resistance re-testing to keep watches thriving.' },
      { title: 'Warranty Support', text: 'Two-year service warranty on all repairs, with authorised-brand support handled for you.' },
    ],
  },

  gallery: [
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
  ],

  stores: [
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
  ],

  categories: DEFAULT_CATEGORIES,
  products: DEFAULT_PRODUCTS,
}

/* --------------------------- Normalisation ---------------------------- */

function isPlainObject(v) {
  return v !== null && typeof v === 'object' && !Array.isArray(v)
}

/** Shallow per-section merge so old stored content gains new fields. */
export function normalizeContent(raw) {
  const base = DEFAULT_CONTENT
  if (!isPlainObject(raw)) return structuredCloneSafe(base)
  const out = structuredCloneSafe(base)
  for (const key of Object.keys(base)) {
    if (!(key in raw)) continue
    if (isPlainObject(base[key]) && isPlainObject(raw[key]) && key !== 'settings') {
      out[key] = { ...structuredCloneSafe(base[key]), ...raw[key] }
    } else if (key === 'settings') {
      out.settings = { ...base.settings, ...raw.settings, navLabels: { ...base.settings.navLabels, ...(raw.settings?.navLabels || {}) } }
    } else {
      out[key] = raw[key]
    }
  }
  return out
}

function structuredCloneSafe(v) {
  return JSON.parse(JSON.stringify(v))
}

/* ------------------------------ Storage ------------------------------- */

function readJson(key) {
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function writeJson(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

export function loadPublished() {
  const stored = readJson(PUBLISHED_KEY)
  return stored ? normalizeContent(stored) : structuredCloneSafe(DEFAULT_CONTENT)
}

export function loadDraft() {
  const stored = readJson(DRAFT_KEY)
  return stored ? normalizeContent(stored) : null
}

export function saveDraft(draft) {
  return writeJson(DRAFT_KEY, draft)
}

export function clearDraft() {
  try {
    window.localStorage.removeItem(DRAFT_KEY)
  } catch {
    /* ignore */
  }
}

export function publishContent(draft) {
  const ok = writeJson(PUBLISHED_KEY, draft)
  if (ok) clearDraft()
  return ok
}

export function resetPublishedContent() {
  try {
    window.localStorage.removeItem(PUBLISHED_KEY)
  } catch {
    /* ignore */
  }
  return structuredCloneSafe(DEFAULT_CONTENT)
}

/* --------------------------- Preview flag ----------------------------- */

export function readPreviewFlag() {
  try {
    return window.sessionStorage.getItem(PREVIEW_KEY) === '1'
  } catch {
    return false
  }
}

export function writePreviewFlag(on) {
  try {
    if (on) window.sessionStorage.setItem(PREVIEW_KEY, '1')
    else window.sessionStorage.removeItem(PREVIEW_KEY)
  } catch {
    /* ignore */
  }
}

/* ------------------------- Import / export ---------------------------- */

export function exportContentJson(content) {
  return JSON.stringify(content, null, 2)
}

export function importContentJson(text) {
  const parsed = JSON.parse(text)
  return normalizeContent(parsed)
}

/** Known image paths (from the licensing manifest) for datalist suggestions. */
export async function loadImageOptions() {
  try {
    const res = await fetch('/img/CREDITS.json')
    if (!res.ok) return []
    const credits = await res.json()
    const files = new Set()
    const push = (p) => {
      if (typeof p === 'string' && p.startsWith('/img/')) files.add(p)
    }
    if (Array.isArray(credits)) credits.forEach((c) => push(c.local || c.file || c.path))
    else if (credits && typeof credits === 'object') {
      Object.values(credits).forEach((c) => push(typeof c === 'string' ? c : c?.local || c?.file || c?.path))
    }
    return [...files].sort()
  } catch {
    return []
  }
}
