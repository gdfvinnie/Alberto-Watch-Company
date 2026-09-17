import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { CheckIcon, ErrorIcon } from './WatchArt.jsx'
import { useGeolocation, useReveal } from '../hooks/hooks.js'
import { stores } from '../data/siteContent.js'

function storePopup(store) {
  return `
    <div class="map-popup">
      <strong>${store.name}</strong>
      <span>${store.address}</span>
      <span>Phone: <a href="tel:${store.phone.replace(/\s/g, '')}">${store.phone}</a></span>
      <span>${store.hours}</span>
    </div>
  `
}

/* ------------------------------ Map component --------------------------- */

function StoreMap({ stores, activeId, onSelect }) {
  const containerRef = useRef(null)
  const mapRef = useRef(null)
  const markersRef = useRef({})
  const storesRef = useRef(stores)
  storesRef.current = stores

  useEffect(() => {
    if (mapRef.current || !containerRef.current) return undefined

    // Centre on Nigeria, showing the whole country.
    const map = L.map(containerRef.current, {
      center: [9.08, 8.675],
      zoom: 6,
      zoomControl: false, // re-added top-right below so popups never collide with it
      scrollWheelZoom: false, // keep page scrolling natural; zoom via controls/double-click
      attributionControl: true,
    })
    L.control.zoom({ position: 'topright' }).addTo(map)
    mapRef.current = map

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map)

    return () => {
      map.remove()
      mapRef.current = null
      markersRef.current = {}
    }
  }, [])

  // Create markers once the map exists; refresh them if the store list changes.
  useEffect(() => {
    const map = mapRef.current
    if (!map) return undefined

    Object.values(markersRef.current).forEach((m) => m.remove())
    markersRef.current = {}

    storesRef.current.forEach((store) => {
      const marker = L.circleMarker([store.lat, store.lng], {
        radius: 9,
        weight: 3,
        color: '#4b4f56',
        fillColor: '#7d828a',
        fillOpacity: 1,
      })
        .addTo(map)
        .bindPopup(storePopup(store), { className: 'awc-popup', maxWidth: 260 })
      marker.on('click', () => onSelect(store.id))
      markersRef.current[store.id] = marker
    })

    return undefined
  }, [stores, onSelect])

  // Highlight the active store's marker when selection changes.
  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    Object.entries(markersRef.current).forEach(([id, marker]) => {
      const isActive = id === activeId
      marker.setStyle({
        color: isActive ? '#3a3d42' : '#4b4f56',
        fillColor: isActive ? '#3a3d42' : '#7d828a',
        radius: isActive ? 11 : 9,
      })
      if (isActive) marker.openPopup()
    })
  }, [activeId, stores])

  return <div ref={containerRef} className="leaflet-map" role="application" aria-label="Interactive map of Nigeria showing Alberto Watch Company store locations" />
}

/* ------------------------------ Section --------------------------------- */

export default function StoreLocator() {
  const [geo, locate] = useGeolocation()
  const [active, setActive] = useState(stores[0]?.id || '')
  const [headRef, headVisible] = useReveal()

  const activeStore = stores.find((s) => s.id === active) || stores[0]

  const distanceNote = geo.coords
    ? `Your coordinates: ${geo.coords.latitude.toFixed(4)}°, ${geo.coords.longitude.toFixed(4)}° (±${Math.round(geo.coords.accuracy)} m)`
    : null

  return (
    <section id="store-locator" className="section stores-section" aria-labelledby="stores-title">
      <div className="container">
        <div ref={headRef} className={`section-heading reveal ${headVisible ? 'in' : ''}`}>
          <p className="section-kicker">Visit Us</p>
          <h2 id="stores-title" className="section-title">Store Locator</h2>
          <p className="section-lead">
            Three Alberto Watch Company showrooms across Nigeria — flagship service centres where
            our watchmakers and appraisers are at your disposal. Click a marker for details.
          </p>
        </div>

        <div className="stores-layout">
          <div className="stores-map-col">
            <div className="map-frame">
              <StoreMap stores={stores} activeId={activeStore?.id} onSelect={setActive} />
            </div>
            <div className="geo-panel">
              <button type="button" className="btn btn-charcoal" onClick={locate} disabled={geo.status === 'locating'}>
                {geo.status === 'locating' ? 'Locating…' : 'Find My Location'}
              </button>
              <p className="geo-hint">
                Uses the HTML5 Geolocation API. Your location is never sent anywhere — it is only
                read in your browser for this demonstration.
              </p>
              {geo.coords && (
                <p className="geo-result geo-ok" role="status">
                  <CheckIcon className="geo-icon" /> {distanceNote}
                </p>
              )}
              {(geo.status === 'denied' || geo.status === 'unavailable' || geo.status === 'error') && (
                <p className="geo-result geo-fail" role="alert">
                  <ErrorIcon className="geo-icon" /> {geo.message}
                </p>
              )}
            </div>
          </div>

          <div className="stores-cards">
            {stores.map((store) => (
              <article
                key={store.id}
                className={`store-card${activeStore?.id === store.id ? ' active' : ''}`}
                onMouseEnter={() => setActive(store.id)}
              >
                <h3>{store.name}</h3>
                <ul className="store-facts">
                  <li>
                    <span className="store-fact-label">Address</span>
                    <span>{store.address}</span>
                  </li>
                  <li>
                    <span className="store-fact-label">Phone</span>
                    <a href={`tel:${store.phone.replace(/\s/g, '')}`}>{store.phone}</a>
                  </li>
                  <li>
                    <span className="store-fact-label">Hours</span>
                    <span>{store.hours}</span>
                  </li>
                </ul>
                <p className="store-services-label">Services available</p>
                <ul className="store-services">
                  {store.services.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
