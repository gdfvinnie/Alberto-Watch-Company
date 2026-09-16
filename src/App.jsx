import { useCallback, useEffect, useState } from 'react'
import Header, { buildNavItems } from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Products from './components/Products.jsx'
import Technology from './components/Technology.jsx'
import StoreLocator from './components/StoreLocator.jsx'
import Support from './components/Support.jsx'
import Gallery from './components/Gallery.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import Sitemap from './components/Sitemap.jsx'
import Footer from './components/Footer.jsx'
import DateTimeTicker from './components/DateTimeTicker.jsx'
import AdminLogin from './components/AdminLogin.jsx'
import AdminDashboard from './components/AdminDashboard.jsx'
import { isAuthenticated, getSession } from './data/adminAuth.js'
import { useSiteContent } from './context/SiteContentContext.jsx'

const isHashAdmin = () => window.location.hash.replace(/^#/, '').toLowerCase() === '/admin'

/** Private admin area — only reachable at #/admin and only with a valid session. */
function AdminArea({ onExit }) {
  const [authed, setAuthed] = useState(() => isAuthenticated())
  const [session, setSession] = useState(() => getSession())

  // Auto sign-out the moment the session token expires.
  useEffect(() => {
    if (!authed) return undefined
    const t = setInterval(() => {
      if (!isAuthenticated()) {
        setAuthed(false)
        setSession(null)
      } else {
        setSession(getSession())
      }
    }, 30000)
    return () => clearInterval(t)
  }, [authed])

  if (!authed) {
    return (
      <AdminLogin
        onAuthed={() => {
          setAuthed(true)
          setSession(getSession())
        }}
      />
    )
  }

  return (
    <div className="admin-root">
      <p className="admin-session-meta" hidden>
        Session for {session?.username} expires at {session ? new Date(session.expiresAt).toLocaleTimeString() : ''}
      </p>
      <AdminDashboard
        onLogout={() => {
          setAuthed(false)
          setSession(null)
          window.location.hash = ''
          onExit?.()
        }}
      />
    </div>
  )
}

function PublicSite() {
  const { content, previewing } = useSiteContent()
  const navItems = buildNavItems(content.settings.navLabels)
  const VALID_IDS = new Set(navItems.map((i) => i.id))

  const [activeSection, setActiveSection] = useState('home')

  const scrollToSection = useCallback(
    (id) => {
      const el = document.getElementById(id)
      if (!el) return
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const headerOffset = 128
      const top = el.getBoundingClientRect().top + window.scrollY - headerOffset
      window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' })
      history.replaceState(null, '', `#${id}`)
    },
    [],
  )

  const navigate = useCallback(
    (id) => {
      if (!VALID_IDS.has(id)) return
      scrollToSection(id)
      setActiveSection(id)
    },
    [VALID_IDS, scrollToSection],
  )

  // Track scroll position so the active menu item always reflects
  // the section currently in view (with a sticky-header margin).
  useEffect(() => {
    const sections = navItems.map((i) => document.getElementById(i.id)).filter(Boolean)
    let raf = null
    const compute = () => {
      raf = null
      const marker = window.scrollY + 140
      let current = sections[0]?.id || 'home'
      for (const section of sections) {
        if (section.offsetTop <= marker) current = section.id
      }
      // Bottom of page always highlights the last section (Sitemap).
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 40) {
        current = sections[sections.length - 1]?.id || current
      }
      setActiveSection(current)
    }
    const onScroll = () => {
      if (raf === null) raf = requestAnimationFrame(compute)
    }
    compute()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf !== null) cancelAnimationFrame(raf)
    }
  }, [navItems])

  // Deep-link support: opening /#products jumps straight there.
  useEffect(() => {
    const initial = window.location.hash.replace('#', '')
    if (initial && VALID_IDS.has(initial)) {
      const t = setTimeout(() => scrollToSection(initial), 60)
      return () => clearTimeout(t)
    }
  }, [VALID_IDS, scrollToSection])

  return (
    <>
      {previewing && (
        <div className="admin-preview-banner public" role="status">
          Admin preview — you are viewing unpublished draft content.{' '}
          <a href="#/admin">Return to the admin panel</a>
        </div>
      )}
      <a className="skip-link" href="#home">Skip to main content</a>
      <Header activeSection={activeSection} onNavigate={navigate} />
      <main>
        <Hero onNavigate={navigate} />
        <Products />
        <Technology />
        <StoreLocator />
        <Support />
        <Gallery />
        <About />
        <Contact />
        <Sitemap onNavigate={navigate} />
      </main>
      <Footer onNavigate={navigate} />
      <DateTimeTicker />
    </>
  )
}

export default function App() {
  const [route, setRoute] = useState(() => (isHashAdmin() ? 'admin' : 'public'))

  // Tiny hash router: #/admin opens the private admin area,
  // anything else renders the public SPA.
  useEffect(() => {
    const onHash = () => {
      const admin = isHashAdmin()
      if (admin) {
        window.scrollTo(0, 0)
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
      setRoute(admin ? 'admin' : 'public')
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  if (route === 'admin') return <AdminArea />

  return <PublicSite />
}
