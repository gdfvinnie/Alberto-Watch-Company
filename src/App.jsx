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
import { settings } from './data/siteContent.js'

function PublicSite() {
  const navItems = buildNavItems(settings.navLabels)
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
  return <PublicSite />
}
