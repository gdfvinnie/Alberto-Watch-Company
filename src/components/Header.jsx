import { useEffect, useState, useCallback, useRef } from 'react'
import { useSiteContent } from '../context/SiteContentContext.jsx'

export function buildNavItems(navLabels) {
  const labels = navLabels || {}
  return [
    { id: 'home', label: labels.home || 'Home' },
    { id: 'products', label: labels.products || 'Products' },
    { id: 'technology', label: labels.technology || 'Technology' },
    { id: 'store-locator', label: labels['store-locator'] || 'Store Locator' },
    { id: 'support', label: labels.support || 'Support' },
    { id: 'gallery', label: labels.gallery || 'Gallery' },
    { id: 'about', label: labels.about || 'About Us' },
    { id: 'contact', label: labels.contact || 'Contact Us' },
    { id: 'sitemap', label: labels.sitemap || 'Sitemap' },
  ]
}

const VISITOR_BASE = 1245

/** Front-end persistent visitor counter (localStorage simulated backend). */
function getVisitorCount() {
  try {
    const stored = window.localStorage.getItem('awc_visitors')
    const base = stored !== null ? parseInt(stored, 10) : VISITOR_BASE
    const count = (Number.isFinite(base) ? base : VISITOR_BASE) + 1
    window.localStorage.setItem('awc_visitors', String(count))
    return count
  } catch {
    /* private mode / storage disabled — session-only fallback */
    return VISITOR_BASE + 1
  }
}

function formatCounter(n) {
  return String(n).padStart(6, '0')
}

export default function Header({ activeSection, onNavigate }) {
  const { content } = useSiteContent()
  const { settings } = content

  const [visitors, setVisitors] = useState(() => formatCounter(VISITOR_BASE))
  const [menuOpen, setMenuOpen] = useState(false)
  const navListRef = useRef(null)

  const navItems = buildNavItems(settings.navLabels)

  // Increment once per page load/refresh, then display the padded value.
  useEffect(() => {
    setVisitors(formatCounter(getVisitorCount()))
  }, [])

  // Close the mobile menu with Escape or when clicking outside.
  useEffect(() => {
    if (!menuOpen) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    const onClick = (e) => {
      if (
        navListRef.current &&
        !navListRef.current.contains(e.target) &&
        !e.target.closest('.hamburger')
      ) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('click', onClick, true)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('click', onClick, true)
    }
  }, [menuOpen])

  const handleNavClick = useCallback(
    (e, id) => {
      e.preventDefault()
      onNavigate(id)
      setMenuOpen(false)
    },
    [onNavigate],
  )

  return (
    <header className="site-header" id="site-top">
      {/* -------- Utility topbar — optional, managed from the admin panel -------- */}
      {settings.showTopbar && (
        <div className="topbar">
          <div className="container topbar-inner">
            <ul className="topbar-links">
              <li><a href={`tel:${settings.topbarPhone.replace(/\s/g, '')}`}>{settings.topbarPhone}</a></li>
              <li><a href={`mailto:${settings.topbarEmail}`}>{settings.topbarEmail}</a></li>
            </ul>
            <ul className="topbar-links">
              <li><span className="topbar-note">{settings.topbarNote}</span></li>
              {settings.showVisitorCounter && (
                <li>
                  <span className="visitor-badge" title="Unique visits since first launch (stored in your browser)">
                    Visitors: <span className="visitor-count">{visitors}</span>
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>
      )}

      {/* -------- Brand row: ALBERTO perfectly centered on every screen -------- */}
      <div className="brand-row">
        <button
          type="button"
          className={`hamburger${menuOpen ? ' open' : ''}`}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-nav-list"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>

        <a
          href="#home"
          className="brand"
          onClick={(e) => handleNavClick(e, 'home')}
          aria-label="Alberto Watch Company — go to Home"
        >
          <span className="brand-name">{settings.brandName}</span>
          <span className="brand-sub">{settings.brandSub}</span>
        </a>

        <span className="brand-row-spacer" aria-hidden="true" />
      </div>

      {/* -------- Navigation row: centred on desktop, dropdown on mobile -------- */}
      <nav className="main-nav" aria-label="Primary navigation">
        <ul ref={navListRef} id="primary-nav-list" className={menuOpen ? 'nav-open' : ''}>
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={activeSection === item.id ? 'active' : ''}
                aria-current={activeSection === item.id ? 'true' : undefined}
                onClick={(e) => handleNavClick(e, item.id)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
