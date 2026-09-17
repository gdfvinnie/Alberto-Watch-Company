import { useState } from 'react'
import { useReveal } from '../hooks/hooks.js'
import { CheckIcon } from './WatchArt.jsx'
import { services } from '../data/siteContent.js'

const SERVICE_ICONS = {
  'Watch Repair': (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="24" cy="24" r="14" />
      <path d="M24 17v7l5 3" />
      <path d="M30 10l4-4 4 4-4 4M14 38l-4 4" opacity="0.6" />
    </svg>
  ),
  'Watch Appraisal': (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="21" cy="21" r="11" />
      <path d="m30 30 8 8" />
      <path d="M17 21h8M21 17v8" opacity="0.8" />
    </svg>
  ),
  'Battery Replacement': (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="14" y="16" width="20" height="20" rx="3" />
      <path d="M19 16v-4h10v4" />
      <path d="M24 22v8M20 26h8" />
    </svg>
  ),
  'Strap Replacement': (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="17" y="8" width="14" height="32" rx="6" />
      <path d="M17 18h14M17 30h14" opacity="0.7" />
    </svg>
  ),
  'Cleaning & Maintenance': (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M24 8c7 6 11 12 11 18a11 11 0 0 1-22 0c0-6 4-12 11-18Z" />
      <path d="M19 28a5 5 0 0 0 10 0" opacity="0.8" />
    </svg>
  ),
  'Warranty Support': (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M24 6l14 6v10c0 9-6 15-14 18-8-3-14-9-14-18V12l14-6Z" />
      <path d="m17 24 5 5 9-10" />
    </svg>
  ),
}

const FALLBACK_ICON = (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="24" cy="24" r="14" />
    <path d="M24 17v7l5 3" />
  </svg>
)

const EMPTY = { name: '', email: '', phone: '', service: '', message: '' }

export function validateSupportForm(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Please enter your full name.'
  else if (values.name.trim().length < 2) errors.name = 'Name must be at least 2 characters.'
  if (!values.email.trim()) errors.email = 'Please enter your email address.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
    errors.email = 'Please enter a valid email address (e.g. name@example.com).'
  if (!values.phone.trim()) errors.phone = 'Please enter your phone number.'
  else if (!/^[+\d][\d\s\-()]{6,19}$/.test(values.phone.trim()))
    errors.phone = 'Please enter a valid phone number (7–20 digits, may start with +).'
  if (!values.service) errors.service = 'Please select the service you require.'
  if (!values.message.trim()) errors.message = 'Please tell us briefly about your request.'
  else if (values.message.trim().length < 10)
    errors.message = 'Message should be at least 10 characters.'
  return errors
}

function ServiceCard({ service, index, onChoose }) {
  const [ref, visible] = useReveal()
  return (
    <div
      ref={ref}
      className={`service-card reveal ${visible ? 'in' : ''}`}
      style={{ transitionDelay: `${index * 60}ms` }}
      role="button"
      tabIndex={0}
      onClick={() => onChoose(service.title)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onChoose(service.title)
        }
      }}
    >
      <div className="service-icon">{SERVICE_ICONS[service.title] || FALLBACK_ICON}</div>
      <h3>{service.title}</h3>
      <p>{service.text}</p>
      <span className="service-cta">Request this service →</span>
    </div>
  )
}

export default function Support() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [headRef, headVisible] = useReveal()

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched((t) => ({ ...t, [name]: true }))
    setErrors(validateSupportForm(values))
  }

  const chooseService = (title) => {
    setValues((v) => ({ ...v, service: v.service === title ? '' : title }))
    document.getElementById('support-name')?.focus({ preventScroll: true })
    document.getElementById('support-request-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const nextErrors = validateSupportForm(values)
    setErrors(nextErrors)
    setTouched({ name: true, email: true, phone: true, service: true, message: true })
    if (Object.keys(nextErrors).length === 0) {
      // Front-end simulation — no data is sent to any server.
      setSubmitted(true)
      setValues(EMPTY)
      setTouched({})
      setTimeout(() => setSubmitted(false), 8000)
    }
  }

  const fieldError = (name) => (touched[name] && errors[name] ? errors[name] : null)

  return (
    <section id="support" className="section support-section" aria-labelledby="support-title">
      <div className="container">
        <div ref={headRef} className={`section-heading reveal ${headVisible ? 'in' : ''}`}>
          <p className="section-kicker">Customer Care</p>
          <h2 id="support-title" className="section-title">Support &amp; Services</h2>
          <p className="section-lead">
            Six first-class services, one dedicated team. Choose a service card to pre-fill the
            request form — validation runs entirely in your browser.
          </p>
        </div>

        <div className="service-grid">
          {services.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} onChoose={chooseService} />
          ))}
        </div>

        <div className="support-form-wrap">
          <form
            id="support-request-form"
            className="lux-form"
            noValidate
            onSubmit={handleSubmit}
            aria-labelledby="support-form-title"
          >
            <h3 id="support-form-title" className="subsection-title">Request a Service</h3>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="support-name">Full Name *</label>
                <input
                  id="support-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="e.g. Adaeze Okonkwo"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!fieldError('name')}
                  aria-describedby={fieldError('name') ? 'support-name-error' : undefined}
                />
                {fieldError('name') && (
                  <p className="field-error" id="support-name-error" role="alert">{errors.name}</p>
                )}
              </div>
              <div className="form-field">
                <label htmlFor="support-email">Email *</label>
                <input
                  id="support-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="e.g. adaeze@example.com"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!fieldError('email')}
                  aria-describedby={fieldError('email') ? 'support-email-error' : undefined}
                />
                {fieldError('email') && (
                  <p className="field-error" id="support-email-error" role="alert">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="support-phone">Phone *</label>
                <input
                  id="support-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="e.g. +234 801 234 5678"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!fieldError('phone')}
                  aria-describedby={fieldError('phone') ? 'support-phone-error' : undefined}
                />
                {fieldError('phone') && (
                  <p className="field-error" id="support-phone-error" role="alert">{errors.phone}</p>
                )}
              </div>
              <div className="form-field">
                <label htmlFor="support-service">Service Required *</label>
                <select
                  id="support-service"
                  name="service"
                  value={values.service}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!fieldError('service')}
                  aria-describedby={fieldError('service') ? 'support-service-error' : undefined}
                >
                  <option value="">Select a service…</option>
                  {services.map((s) => (
                    <option key={s.title} value={s.title}>{s.title}</option>
                  ))}
                  <option value="Other Enquiry">Other Enquiry</option>
                </select>
                {fieldError('service') && (
                  <p className="field-error" id="support-service-error" role="alert">{errors.service}</p>
                )}
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="support-message">Message *</label>
              <textarea
                id="support-message"
                name="message"
                rows="4"
                placeholder="Tell us about your watch and what you need…"
                value={values.message}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!fieldError('message')}
                aria-describedby={fieldError('message') ? 'support-message-error' : undefined}
              />
              {fieldError('message') && (
                <p className="field-error" id="support-message-error" role="alert">{errors.message}</p>
              )}
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-gold">Submit Request</button>
              <p className="form-note">Fields marked * are required. This demo form does not send data to a server.</p>
            </div>

            {submitted && (
              <div className="form-success" role="status">
                <CheckIcon className="success-icon" />
                <div>
                  <strong>Request received!</strong>
                  <p>
                    Thank you — our service team will contact you within one business day. (Front-end
                    demonstration: no data was transmitted.)
                  </p>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
