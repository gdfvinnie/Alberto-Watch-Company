import { Photo } from '../art/artMap.jsx'
import { hero, brandStrip } from '../data/siteContent.js'

export default function Hero({ onNavigate }) {

  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="hero-inner container">
        <div className="hero-copy">
          <p className="hero-kicker">
            <span className="hero-dash" aria-hidden="true" />
            {hero.kicker}
          </p>
          <h1 id="hero-title" className="hero-title">
            {hero.title.split('\n').map((line, i, arr) => (
              <span key={i}>
                {line}
                {i < arr.length - 1 && <br />}
              </span>
            ))}
          </h1>
          <p className="hero-text">{hero.text}</p>
          <div className="hero-actions">
            <button
              type="button"
              className="btn btn-red btn-lg"
              onClick={() => onNavigate(hero.primaryTarget)}
            >
              {hero.primaryCta}
            </button>
            <button
              type="button"
              className="btn btn-ghost btn-lg"
              onClick={() => onNavigate(hero.secondaryTarget)}
            >
              {hero.secondaryCta}
            </button>
          </div>
        </div>
        <div className="hero-art">
          <Photo src={hero.image} alt={hero.imageAlt} className="hero-photo" />
        </div>
      </div>

      {/* Light brand strip under the hero (reference: grey logos band) */}
      <div className="brand-strip" role="list" aria-label="Brands stocked in store">
        <div className="container brand-strip-inner">
          {brandStrip.map((b) => (
            <span role="listitem" key={b} className="brand-strip-item">{b}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
