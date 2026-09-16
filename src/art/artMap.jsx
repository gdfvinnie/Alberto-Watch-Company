import { useState } from 'react'

/**
 * ============================================================
 *  PHOTO LAYER
 * ============================================================
 *  Product and gallery imagery is real photography served from
 *  /public/img (sourced from Wikimedia Commons under free
 *  licences — see src/data/imageCredits.json).
 *
 *  <Photo> renders an <img> with graceful degradation: if a file
 *  is missing, a neutral dark placeholder with a watch glyph is
 *  shown instead of a broken-image icon.
 *
 *  artFor(key, alt) remains the universal entry point used by
 *  Products / Gallery / category cards. It accepts either:
 *    - a path beginning with "/" (served from public/, e.g.
 *      "/img/submariner.jpg"), or
 *    - a legacy SVG art key (e.g. "vintage-chronometer"), which
 *      is mapped to a catalogue photograph below.
 * ============================================================
 */

const LEGACY_KEYS = {
  /* gallery / legacy aliases -> local photos */
  'luxury-tourbillon': '/img/daytona-wrist.png',
  'vintage-chronometer': '/img/speedmaster.jpg',
  'smart-active': '/img/applewatch7.jpg',
  'sport-diver': '/img/submariner-diving.jpg',
  workshop: '/img/watchmaking.jpg',
  'classic-roman': '/img/bambino.jpg',
  'luxury-moonphase': '/img/daydate.jpg',
  'sport-racing': '/img/yachtmaster.jpg',
  'smart-hybrid': '/img/galaxy5.jpg',
  'vintage-pilot': '/img/gmt-16710.jpg',
  'classic-openheart': '/img/eta2801.jpg',
  'everyday-eco': '/img/rolex-store.jpg',
  'sport-pilot': '/img/fenix.jpg',
  'vintage-diver': '/img/amphibia.jpg',
  'smart-classic': '/img/apple-demo.jpg',
  'classic-slim': '/img/prx.jpg',
  'luxury-dress': '/img/mk-slimrunway.jpg',
  'everyday-field': '/img/expedition.jpg',
  /* old category art keys */
  vintage: '/img/speedmaster.jpg',
  luxury: '/img/rolex-pair.jpg',
  smart: '/img/applewatch-ultra.jpg',
  sport: '/img/turtle.jpg',
  everyday: '/img/snk809.jpg',
  classic: '/img/bambino.jpg',
}

export function resolveImage(key) {
  if (!key) return null
  if (key.startsWith('/')) return key
  return LEGACY_KEYS[key] || null
}

function Placeholder({ alt }) {
  return (
    <div className="img-placeholder" role="img" aria-label={alt}>
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <circle cx="32" cy="34" r="17" fill="none" stroke="currentColor" strokeWidth="2.4" />
        <path d="M32 25v9l6.5 4.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M28 12h8" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" />
        <path d="M30 50h4" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" />
      </svg>
    </div>
  )
}

export function Photo({ src, alt, creditId, className }) {
  const resolved = resolveImage(src)
  const [failed, setFailed] = useState(false)

  if (!resolved || failed) return <Placeholder alt={alt} />

  return (
    <img
      src={resolved}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      data-credit-id={creditId}
    />
  )
}

/* Universal entry point — drop-in replacement for the old SVG art map. */
export function artFor(key, alt) {
  return <Photo src={key} alt={alt || 'Luxury timepiece photograph'} />
}

export default artFor
