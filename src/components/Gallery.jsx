import { useEffect, useMemo, useRef, useState } from 'react'
import { useReveal } from '../hooks/hooks.js'
import { artFor } from '../art/artMap.jsx'
import { ChevronLeft, ChevronRight } from './WatchArt.jsx'
import { useSiteContent } from '../context/SiteContentContext.jsx'

function Lightbox({ items, index, onClose, onNav }) {
  const closeRef = useRef(null)

  useEffect(() => {
    if (index === null) return undefined
    const previouslyFocused = document.activeElement
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'

    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onNav(-1)
      if (e.key === 'ArrowRight') onNav(1)
      if (e.key === 'Tab' && closeRef.current) {
        e.preventDefault()
        closeRef.current.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      if (previouslyFocused && previouslyFocused.focus) previouslyFocused.focus()
    }
  }, [index, onClose, onNav])

  if (index === null) return null
  const item = items[index]

  return (
    <div
      className="modal-overlay lightbox-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <figure className="lightbox" role="dialog" aria-modal="true" aria-label={`${item.title} — enlarged gallery image`}>
        <button ref={closeRef} type="button" className="modal-x" aria-label="Close enlarged image" onClick={onClose}>×</button>
        <div className="lightbox-art">{artFor(item.key, item.title)}</div>
        <figcaption className="lightbox-caption">
          <strong>{item.title}</strong>
          <span>{item.cat} · {index + 1} / {items.length}</span>
        </figcaption>
        <button type="button" className="lightbox-nav prev" aria-label="Previous image" onClick={() => onNav(-1)}>
          <ChevronLeft />
        </button>
        <button type="button" className="lightbox-nav next" aria-label="Next image" onClick={() => onNav(1)}>
          <ChevronRight />
        </button>
      </figure>
    </div>
  )
}

export default function Gallery() {
  const { content } = useSiteContent()
  const galleryItems = content.gallery

  const [filter, setFilter] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [headRef, headVisible] = useReveal()

  const categories = useMemo(
    () => ['All', ...[...new Set(galleryItems.map((i) => i.cat))]],
    [galleryItems],
  )

  const items = galleryItems.filter((i) => filter === 'All' || i.cat === filter)

  const nav = (dir) => {
    setLightboxIndex((cur) => {
      if (cur === null) return cur
      return (cur + dir + items.length) % items.length
    })
  }

  return (
    <section id="gallery" className="section gallery-section" aria-labelledby="gallery-title">
      <div className="container">
        <div ref={headRef} className={`section-heading reveal ${headVisible ? 'in' : ''}`}>
          <p className="section-kicker">The Showcase</p>
          <h2 id="gallery-title" className="section-title">Gallery</h2>
          <p className="section-lead">
            A curated look at the boutique, the workshop and the watches themselves. Filter by
            theme and click any image for the enlarged lightbox view.
          </p>
        </div>

        <div className="gallery-filters" role="group" aria-label="Filter gallery by category">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              className={`chip${filter === c ? ' active' : ''}`}
              aria-pressed={filter === c}
              onClick={() => {
                setFilter(c)
                setLightboxIndex(null)
              }}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="gallery-grid">
          {items.map((item, i) => (
            <GalleryTile key={item.key} item={item} onOpen={() => setLightboxIndex(i)} />
          ))}
        </div>
      </div>

      <Lightbox items={items} index={lightboxIndex} onClose={() => setLightboxIndex(null)} onNav={nav} />
    </section>
  )
}

function GalleryTile({ item, onOpen }) {
  const [ref, visible] = useReveal()
  return (
    <button
      ref={ref}
      type="button"
      className={`gallery-tile reveal ${visible ? 'in' : ''}`}
      onClick={onOpen}
      aria-label={`${item.title} — open enlarged image`}
    >
      <div className="gallery-art">{artFor(item.key, item.title)}</div>
      <span className="gallery-tile-label">
        <strong>{item.title}</strong>
        <em>{item.cat}</em>
      </span>
    </button>
  )
}
