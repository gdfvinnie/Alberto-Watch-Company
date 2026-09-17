import { buildNavItems } from './Header.jsx'
import { FacebookIcon, InstagramIcon, XIcon, YouTubeIcon } from './WatchArt.jsx'
import { settings, contact } from '../data/siteContent.js'

export default function Footer({ onNavigate }) {
  const navItems = buildNavItems(settings.navLabels)
  const links = navItems.filter((i) => i.id !== 'sitemap')

  const go = (e, id) => {
    e.preventDefault()
    onNavigate(id)
  }

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <nav className="footer-col" aria-label="Footer — customer service">
            <h3>Customer Service</h3>
            <ul>
              {links.slice(0, 4).map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} onClick={(e) => go(e, item.id)}>{item.label}</a>
                </li>
              ))}
              <li><a href="#support" onClick={(e) => go(e, 'support')}>Request Support</a></li>
            </ul>
          </nav>

          <nav className="footer-col" aria-label="Footer — account">
            <h3>My Account</h3>
            <ul>
              {links.slice(4).map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} onClick={(e) => go(e, item.id)}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-col">
            <h3>Help</h3>
            <ul>
              <li><a href="#support" onClick={(e) => go(e, 'support')}>Watch Repair</a></li>
              <li><a href="#support" onClick={(e) => go(e, 'support')}>Watch Appraisal</a></li>
              <li><a href="#support" onClick={(e) => go(e, 'support')}>Battery &amp; Strap Service</a></li>
              <li><a href="#store-locator" onClick={(e) => go(e, 'store-locator')}>Store Hours &amp; Directions</a></li>
              <li><a href="#contact" onClick={(e) => go(e, 'contact')}>Contact Us</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>Company Info</h3>
            <ul>
              <li>{contact.address}</li>
              <li><a href={`mailto:${contact.email}`}>{contact.email}</a></li>
              <li><a href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a></li>
              <li>{contact.hoursLine1} · {contact.hoursLine2}</li>
            </ul>
            <ul className="footer-social" aria-label="Social media (placeholders)">
              {[
                ['Facebook', FacebookIcon],
                ['Instagram', InstagramIcon],
                ['X (Twitter)', XIcon],
                ['YouTube', YouTubeIcon],
              ].map(([name, Icon]) => (
                <li key={name}>
                  <a
                    href="#home"
                    onClick={(e) => go(e, 'home')}
                    aria-label={`${name} (placeholder link)`}
                    title={`${name} — placeholder for this academic project`}
                  >
                    <Icon />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col footer-news">
            <h3>Start of Something Good</h3>
            <p>Be the first to know about new arrivals and service offers at the Lagos flagship.</p>
            <form
              className="footer-news-form"
              onSubmit={(e) => {
                e.preventDefault()
                const input = e.currentTarget.querySelector('input')
                const note = e.currentTarget.parentElement.querySelector('.footer-news-note')
                if (input.value.includes('@')) {
                  note.textContent = 'Subscribed — welcome to the club! (Demo only.)'
                  input.value = ''
                } else {
                  note.textContent = 'Please enter a valid email.'
                }
              }}
            >
              <input type="email" aria-label="Email for newsletter (demo)" placeholder="Your email address" />
              <button type="submit" aria-label="Subscribe (demo)">→</button>
            </form>
            <p className="footer-news-note" role="status">Demo only — nothing is sent.</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © 2026 Alberto Watch Company. All Rights Reserved.{' '}
            <span className="footer-demo-note">{settings.footerNote}</span>
          </p>
          <p className="footer-legal">
            <a href="#home" onClick={(e) => go(e, 'home')}>Privacy Policy</a>
            <span aria-hidden="true">·</span>
            <a href="#home" onClick={(e) => go(e, 'home')}>Terms &amp; Conditions</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
