import { useCountUp, useReveal } from '../hooks/hooks.js'
import { Photo } from '../art/artMap.jsx'
import { about } from '../data/siteContent.js'

function Stat({ value, suffix, label }) {
  const [ref, display] = useCountUp(value)
  return (
    <div className="stat" ref={ref}>
      <span className="stat-value">
        {Number(display).toLocaleString('en-US')}
        {suffix}
      </span>
      <span className="stat-label">{label}</span>
    </div>
  )
}

export default function About() {
  const [storyRef, storyVisible] = useReveal()
  const [imgRef, imgVisible] = useReveal()

  return (
    <section id="about" className="section about-section" aria-labelledby="about-title">
      <div className="container">
        <div className="section-heading">
          <p className="section-kicker">{about.kicker}</p>
          <h2 id="about-title" className="section-title">{about.title}</h2>
        </div>

        <div className="about-layout">
          <div ref={storyRef} className={`about-story reveal ${storyVisible ? 'in' : ''}`}>
            <h3>{about.storyTitle}</h3>
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <ul className="about-points">
              {about.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>

          <div ref={imgRef} className={`about-visual reveal ${imgVisible ? 'in' : ''}`}>
            <Photo src={about.image} alt={about.imageAlt} className="about-img" />
            <p className="about-img-caption">{about.imageCaption}</p>
          </div>
        </div>

        <div className="stats-band">
          {about.stats.map((s) => (
            <Stat key={s.label} {...s} />
          ))}
        </div>
      </div>
    </section>
  )
}
