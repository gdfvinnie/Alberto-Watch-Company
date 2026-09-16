import { useEffect, useState } from 'react'

const LOCATIONS = [
  'Lagos, Nigeria',
  'Abuja, Nigeria',
  'Port Harcourt, Nigeria',
]

/**
 * Bottom information ticker. Date/time update every second from the
 * system clock; the location starts as a friendly default and is
 * refined with the HTML5 Geolocation API when the user grants
 * permission (reverse geocoding falls back to the nearest known
 * demo city). If geolocation is denied or unsupported it gracefully
 * shows "Location unavailable".
 */
export default function DateTimeTicker() {
  const [now, setNow] = useState(() => new Date())
  const [location, setLocation] = useState('Lagos, Nigeria')
  const [geoState, setGeoState] = useState('pending') // pending | granted | denied

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // One gentle geolocation attempt per session.
  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setGeoState('denied')
      setLocation('Location unavailable')
      return undefined
    }
    let settled = false
    navigator.geolocation.getCurrentPosition(
      (position) => {
        settled = true
        setGeoState('granted')
        const { latitude, longitude } = position.coords
        const near =
          Math.abs(latitude - 6.45) < 1.6 && Math.abs(longitude - 3.4) < 1.6
            ? 'Lagos, Nigeria'
            : Math.abs(latitude - 9.06) < 1.6 && Math.abs(longitude - 7.49) < 1.6
              ? 'Abuja, Nigeria'
              : Math.abs(latitude - 4.82) < 1.6 && Math.abs(longitude - 7.03) < 1.6
                ? 'Port Harcourt, Nigeria'
                : `${latitude.toFixed(3)}°, ${longitude.toFixed(3)}°`
        setLocation(near)
      },
      () => {
        settled = true
        setGeoState('denied')
        setLocation('Location unavailable')
      },
      { timeout: 8000, maximumAge: 600000 },
    )
    const fallbackTimer = setTimeout(() => {
      if (!settled) {
        setGeoState('denied')
        setLocation('Location unavailable')
      }
    }, 9000)
    return () => clearTimeout(fallbackTimer)
  }, [])

  const dateStr = now.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  const timeStr = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  })

  // Content is duplicated once for a seamless right-to-left loop.
  const content = `${dateStr} | Time: ${timeStr} | Location: ${location}`

  return (
    <div className="ticker" role="timer" aria-label={`Current date, time and location: ${content}`}>
      <div className="ticker-track" key={geoState + location}>
        <span className="ticker-item">{content}</span>
        <span className="ticker-item" aria-hidden="true">{content}</span>
        <span className="ticker-item" aria-hidden="true">{content}</span>
      </div>
      <span className="ticker-live" aria-hidden="true">LIVE</span>
    </div>
  )
}
