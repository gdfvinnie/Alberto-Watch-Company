import { useEffect, useRef, useState, useCallback } from 'react'

/**
 * Reveals an element (adds a CSS class) the first time it scrolls
 * into the viewport. Returns [ref, visible].
 */
export function useReveal(options = { threshold: 0.15 }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return undefined
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      options,
    )
    observer.observe(node)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [ref, visible]
}

/**
 * Animates a number from 0 to `target` once the returned ref enters
 * the viewport. Used by the About statistics counters.
 */
export function useCountUp(target, duration = 1800) {
  const ref = useRef(null)
  const [value, setValue] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    const run = () => {
      if (started.current) return
      started.current = true
      const startTime = performance.now()
      const tick = (now) => {
        const progress = Math.min((now - startTime) / duration, 1)
        // easeOutCubic for a premium deceleration feel
        const eased = 1 - Math.pow(1 - progress, 3)
        setValue(Math.round(eased * target))
        if (progress < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }

    if (typeof IntersectionObserver === 'undefined') {
      run()
      return undefined
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            run()
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.4 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [target, duration])

  return [ref, value]
}

/**
 * Requests the browser's HTML5 Geolocation once and returns a state
 * object describing the outcome. Never throws — every failure mode is
 * reported gracefully so the UI can show a friendly message.
 */
export function useGeolocation() {
  const [state, setState] = useState({
    status: 'idle', // idle | locating | granted | denied | unavailable | error
    coords: null,
    message: '',
  })

  const locate = useCallback(() => {
    if (!('geolocation' in navigator)) {
      setState({
        status: 'unavailable',
        coords: null,
        message: 'Geolocation is not supported by this browser, so we could not detect your location.',
      })
      return
    }
    setState((s) => ({ ...s, status: 'locating', message: '' }))
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          status: 'granted',
          coords: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
          },
          message: '',
        })
      },
      (error) => {
        const messages = {
          1: 'Location permission was denied. Your location stays private — you can still browse all store details below.',
          2: 'Your position could not be determined right now. Please try again in a moment.',
          3: 'The request to get your location timed out. Please try again.',
        }
        setState({
          status: error.code === 1 ? 'denied' : 'error',
          coords: null,
          message: messages[error.code] || 'Your location could not be accessed.',
        })
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 },
    )
  }, [])

  return [state, locate]
}
