import { buildNavItems } from './Header.jsx'
import { useSiteContent } from '../context/SiteContentContext.jsx'

export default function Sitemap({ onNavigate }) {
  const { content } = useSiteContent()
  const navItems = buildNavItems(content.settings.navLabels)
  const links = navItems.filter((i) => i.id !== 'sitemap')

  const go = (e, id) => {
    e.preventDefault()
    onNavigate(id)
  }

  return (
    <section id="sitemap" className="section sitemap-section" aria-labelledby="sitemap-title">
      <div className="container">
        <div className="section-heading">
          <p className="section-kicker">Site Overview</p>
          <h2 id="sitemap-title" className="section-title">Sitemap</h2>
          <p className="section-lead">
            Every section of this single-page application, one click away.
          </p>
        </div>

        <nav aria-label="Sitemap navigation">
          <ul className="sitemap-grid">
            {links.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} onClick={(e) => go(e, item.id)}>
                  <span className="sitemap-num" aria-hidden="true">
                    {String(navItems.findIndex((n) => n.id === item.id) + 1).padStart(2, '0')}
                  </span>
                  <span className="sitemap-label">{item.label}</span>
                  <span className="sitemap-arrow" aria-hidden="true">→</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  )
}
