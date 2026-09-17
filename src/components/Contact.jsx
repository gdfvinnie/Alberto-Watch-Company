import { useState } from 'react'
import { MailIcon, PhoneIcon, PinIcon, ClockGlyph, CheckIcon } from './WatchArt.jsx'
import { contact } from '../data/siteContent.js'

const EMPTY = { name: '', email: '', phone: '', subject: '', message: '' }

export function validateContactForm(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Please enter your name.'
  else if (values.name.trim().length < 2) errors.name = 'Name must be at least 2 characters.'
  if (!values.email.trim()) errors.email = 'Please enter your email address.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
    errors.email = 'Please enter a valid email address.'
  if (values.phone.trim() && !/^[+\d][\d\s\-()]{6,19}$/.test(values.phone.trim()))
    errors.phone = 'Please enter a valid phone number (or leave it empty).'
  if (!values.subject.trim()) errors.subject = 'Please choose a subject.'
  if (!values.message.trim()) errors.message = 'Please enter a message.'
  else if (values.message.trim().length < 10)
    errors.message = 'Message should be at least 10 characters.'
  return errors
}

const SUBJECTS = ['General Enquiry', 'Product Question', 'Repair Status', 'Appraisal Booking', 'Feedback']

export default function Contact() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [sent, setSent] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    if (sent) setSent(false)
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched((t) => ({ ...t, [name]: true }))
    setErrors(validateContactForm(values))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const nextErrors = validateContactForm(values)
    setErrors(nextErrors)
    setTouched({ name: true, email: true, phone: true, subject: true, message: true })
    if (Object.keys(nextErrors).length === 0) {
      // Front-end simulation — nothing is sent to a server.
      setSent(true)
      setValues(EMPTY)
      setTouched({})
      setTimeout(() => setSent(false), 8000)
    }
  }

  const fieldError = (name) => (touched[name] && errors[name] ? errors[name] : null)

  return (
    <section id="contact" className="section contact-section" aria-labelledby="contact-title">
      <div className="container">
        <div className="section-heading">
          <p className="section-kicker">{contact.kicker}</p>
          <h2 id="contact-title" className="section-title">{contact.title}</h2>
          <p className="section-lead">{contact.lead}</p>
        </div>

        <div className="contact-layout">
          <div className="contact-info">
            <h3 className="contact-company">{contact.company}</h3>
            <ul className="contact-list">
              <li>
                <span className="contact-icon"><MailIcon /></span>
                <div>
                  <p className="contact-label">Email</p>
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </div>
              </li>
              <li>
                <span className="contact-icon"><PhoneIcon /></span>
                <div>
                  <p className="contact-label">Phone</p>
                  <a href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a>
                </div>
              </li>
              <li>
                <span className="contact-icon"><PinIcon /></span>
                <div>
                  <p className="contact-label">Address</p>
                  <p>{contact.address}</p>
                </div>
              </li>
              <li>
                <span className="contact-icon"><ClockGlyph /></span>
                <div>
                  <p className="contact-label">Opening Hours</p>
                  <p>
                    {contact.hoursLine1}
                    <br />
                    {contact.hoursLine2}
                  </p>
                </div>
              </li>
            </ul>
            <div className="contact-map-note">
              <PinIcon className="contact-map-pin" />
              <p>{contact.mapNote}</p>
            </div>
          </div>

          <form className="lux-form" noValidate onSubmit={handleSubmit} aria-labelledby="contact-form-title">
            <h3 id="contact-form-title" className="subsection-title">Send a Message</h3>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="contact-name">Name *</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your full name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!fieldError('name')}
                  aria-describedby={fieldError('name') ? 'contact-name-error' : undefined}
                />
                {fieldError('name') && (
                  <p className="field-error" id="contact-name-error" role="alert">{errors.name}</p>
                )}
              </div>
              <div className="form-field">
                <label htmlFor="contact-email">Email *</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!fieldError('email')}
                  aria-describedby={fieldError('email') ? 'contact-email-error' : undefined}
                />
                {fieldError('email') && (
                  <p className="field-error" id="contact-email-error" role="alert">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="contact-phone">Phone</label>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+234 … (optional)"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!fieldError('phone')}
                  aria-describedby={fieldError('phone') ? 'contact-phone-error' : undefined}
                />
                {fieldError('phone') && (
                  <p className="field-error" id="contact-phone-error" role="alert">{errors.phone}</p>
                )}
              </div>
              <div className="form-field">
                <label htmlFor="contact-subject">Subject *</label>
                <select
                  id="contact-subject"
                  name="subject"
                  value={values.subject}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!fieldError('subject')}
                  aria-describedby={fieldError('subject') ? 'contact-subject-error' : undefined}
                >
                  <option value="">Select a subject…</option>
                  {SUBJECTS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                {fieldError('subject') && (
                  <p className="field-error" id="contact-subject-error" role="alert">{errors.subject}</p>
                )}
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="contact-message">Message *</label>
              <textarea
                id="contact-message"
                name="message"
                rows="4"
                placeholder="How can we help?"
                value={values.message}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!fieldError('message')}
                aria-describedby={fieldError('message') ? 'contact-message-error' : undefined}
              />
              {fieldError('message') && (
                <p className="field-error" id="contact-message-error" role="alert">{errors.message}</p>
              )}
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-gold">Send Message</button>
              <p className="form-note">Fields marked * are required. Demo form — nothing is sent to a server.</p>
            </div>

            {sent && (
              <div className="form-success" role="status">
                <CheckIcon className="success-icon" />
                <div>
                  <strong>Message sent!</strong>
                  <p>
                    Thank you for contacting Alberto Watch Company — we reply within one business
                    day. (Front-end demonstration: no data was transmitted.)
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
