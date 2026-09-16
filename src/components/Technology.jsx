import { useReveal } from '../hooks/hooks.js'
import { useSiteContent } from '../context/SiteContentContext.jsx'

const TECH_ICONS = {
  'Quartz Movement': (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="24" cy="24" r="17" />
      <path d="M24 7v5M24 36v5M7 24h5M36 24h5" />
      <path d="M24 24 33 15" strokeWidth="2.4" />
      <circle cx="24" cy="24" r="2.4" fill="currentColor" stroke="none" />
    </svg>
  ),
  'Automatic Movement': (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="24" cy="24" r="17" />
      <circle cx="24" cy="24" r="9" opacity="0.65" />
      <path d="M24 24 24 15M24 24l6 4" strokeWidth="2.4" />
      <path d="M10 38c4 3 8 4 14 4" opacity="0.5" />
    </svg>
  ),
  'Eco-Drive Technology': (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="24" cy="24" r="17" />
      <path d="M24 11c5 3 8 7.5 8 13a8 8 0 0 1-16 0c0-5.5 3-10 8-13Z" />
      <path d="M24 34v-7M24 22l-3.5 5h7L24 22Z" strokeWidth="2.2" />
      <path d="M9 9l4 4M39 9l-4 4M9 39l4-4M39 39l-4-4" opacity="0.7" />
    </svg>
  ),
  'Smartwatch Technology': (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="13" y="9" width="22" height="30" rx="7" />
      <path d="M19 9V6h10v3M19 39v3h10v-3" />
      <path d="M19 20h10M19 26h6" opacity="0.8" />
      <circle cx="24" cy="33" r="2.2" fill="currentColor" stroke="none" />
    </svg>
  ),
  'Water Resistance': (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="24" cy="24" r="17" />
      <path d="M13 28c3-2 6-2 9 0s6 2 9 0 4-1.6 4-1.6" opacity="0.85" />
      <path d="M13 34c3-2 6-2 9 0s6 2 9 0" opacity="0.6" />
      <path d="M24 12a5 5 0 0 1 5 5c0 3.3-5 8-5 8s-5-4.7-5-8a5 5 0 0 1 5-5Z" />
    </svg>
  ),
  'Mechanical Precision': (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="24" cy="24" r="17" />
      <path d="M24 12l3 8 8 .6-6.2 5.2 2 8.2-6.8-4.6-6.8 4.6 2-8.2L13 20.6l8-.6 3-8Z" />
    </svg>
  ),
}

const FALLBACK_ICON = (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="24" cy="24" r="17" />
    <circle cx="24" cy="24" r="2.4" fill="currentColor" stroke="none" />
  </svg>
)

function TechCard({ item, index }) {
  const [ref, visible] = useReveal()
  return (
    <div ref={ref} className={`tech-card reveal ${visible ? 'in' : ''}`} style={{ transitionDelay: `${index * 70}ms` }}>
      <div className="tech-icon">{TECH_ICONS[item.title] || FALLBACK_ICON}</div>
      <h3>{item.title}</h3>
      <p>{item.text}</p>
    </div>
  )
}

export default function Technology() {
  const { content } = useSiteContent()
  const { technology } = content

  return (
    <section id="technology" className="section technology-section" aria-labelledby="technology-title">
      <div className="container">
        <div className="section-heading">
          <p className="section-kicker">{technology.kicker}</p>
          <h2 id="technology-title" className="section-title">{technology.title}</h2>
          <p className="section-lead">{technology.lead}</p>
        </div>
        <div className="tech-grid">
          {technology.items.map((item, i) => (
            <TechCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
