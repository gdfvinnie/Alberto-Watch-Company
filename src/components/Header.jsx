import { useEffect, useState, useCallback, useRef } from 'react'
import { settings } from '../data/siteContent.js'

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

export default function Header({ activeSection, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const navListRef = useRef(null)

  const navItems = buildNavItems(settings.navLabels)

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
