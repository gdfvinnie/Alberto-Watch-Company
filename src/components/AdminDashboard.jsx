import { useEffect, useMemo, useRef, useState } from 'react'
import { useSiteContent } from '../context/SiteContentContext.jsx'
import {
  getAdminUsername,
  logout as authLogout,
  changePassword,
  ADMIN_SESSION_MINUTES,
} from '../data/adminAuth.js'
import { loadImageOptions, exportContentJson, importContentJson, resetPublishedContent } from '../data/contentStore.js'
import { CheckIcon, ShieldIcon } from './WatchArt.jsx'

/* ============================ Small form atoms ============================ */

function Field({ label, hint, children }) {
  return (
    <label className="admin-field">
      <span className="admin-field-label">{label}</span>
      {children}
      {hint && <span className="admin-field-hint">{hint}</span>}
    </label>
  )
}

function TextInput({ value, onChange, ...rest }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      {...rest}
    />
  )
}

function TextArea({ value, onChange, rows = 3, ...rest }) {
  return <textarea rows={rows} value={value} onChange={(e) => onChange(e.target.value)} {...rest} />
}

function Select({ value, onChange, options, ...rest }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} {...rest}>
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  )
}

function ImageInput({ value, onChange, options }) {
  return (
    <>
      <input
        type="text"
        list="awc-image-options"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="/img/…"
      />
      <datalist id="awc-image-options">
        {options.map((p) => (
          <option key={p} value={p} />
        ))}
      </datalist>
    </>
  )
}

/* ============================== Repeater ================================= */

function Repeater({ items, onChange, newItem, renderItem, addLabel, emptyText }) {
  const move = (i, dir) => {
    const next = [...items]
    const j = i + dir
    if (j < 0 || j >= next.length) return
    ;[next[i], next[j]] = [next[j], next[i]]
    onChange(next)
  }
  return (
    <div className="admin-repeater">
      {items.length === 0 && <p className="admin-empty-note">{emptyText}</p>}
      {items.map((item, i) => (
        <div key={i} className="admin-repeater-item">
          <div className="admin-repeater-head">
            <span className="admin-repeater-num">#{i + 1}</span>
            <div className="admin-repeater-actions">
              <button type="button" className="admin-icon-btn" aria-label="Move up" disabled={i === 0} onClick={() => move(i, -1)}>↑</button>
              <button type="button" className="admin-icon-btn" aria-label="Move down" disabled={i === items.length - 1} onClick={() => move(i, 1)}>↓</button>
              <button
                type="button"
                className="admin-icon-btn danger"
                aria-label="Remove item"
                onClick={() => onChange(items.filter((_, idx) => idx !== i))}
              >
                ✕
              </button>
            </div>
          </div>
          {renderItem(item, (patch) => {
            onChange(items.map((it, idx) => (idx === i ? { ...it, ...patch } : it)))
          })}
        </div>
      ))}
      <button
        type="button"
        className="admin-btn admin-btn-ghost admin-btn-sm"
        onClick={() => onChange([...items, typeof newItem === 'function' ? newItem() : newItem])}
      >
        + {addLabel}
      </button>
    </div>
  )
}

/* ============================== Panels =================================== */

function HeroPanel({ draft, update, imageOptions }) {
  const hero = draft.hero
  const set = (patch) => update((d) => { d.hero = { ...d.hero, ...patch }; return d })
  return (
    <div className="admin-panel-body">
      <Field label="Kicker (small line above the heading)">
        <TextInput value={hero.kicker} onChange={(v) => set({ kicker: v })} />
      </Field>
      <Field label="Main heading" hint="Use a line break to split into two lines.">
        <TextArea value={hero.title} onChange={(v) => set({ title: v })} rows={2} />
      </Field>
      <Field label="Intro paragraph">
        <TextArea value={hero.text} onChange={(v) => set({ text: v })} rows={3} />
      </Field>
      <div className="admin-grid-2">
        <Field label="Primary button label">
          <TextInput value={hero.primaryCta} onChange={(v) => set({ primaryCta: v })} />
        </Field>
        <Field label="Primary button links to">
          <Select
            value={hero.primaryTarget}
            onChange={(v) => set({ primaryTarget: v })}
            options={[
              { value: 'products', label: 'Products' },
              { value: 'support', label: 'Support' },
              { value: 'gallery', label: 'Gallery' },
              { value: 'contact', label: 'Contact' },
              { value: 'about', label: 'About' },
              { value: 'store-locator', label: 'Store Locator' },
              { value: 'technology', label: 'Technology' },
            ]}
          />
        </Field>
        <Field label="Secondary button label">
          <TextInput value={hero.secondaryCta} onChange={(v) => set({ secondaryCta: v })} />
        </Field>
        <Field label="Secondary button links to">
          <Select
            value={hero.secondaryTarget}
            onChange={(v) => set({ secondaryTarget: v })}
            options={[
              { value: 'support', label: 'Support' },
              { value: 'products', label: 'Products' },
              { value: 'gallery', label: 'Gallery' },
              { value: 'contact', label: 'Contact' },
              { value: 'about', label: 'About' },
              { value: 'store-locator', label: 'Store Locator' },
              { value: 'technology', label: 'Technology' },
            ]}
          />
        </Field>
      </div>
      <Field label="Hero image path" hint="Pick from the licensed photo library or paste a /img/ path.">
        <ImageInput value={hero.image} onChange={(v) => set({ image: v })} options={imageOptions} />
      </Field>
      <Field label="Hero image alt text (accessibility)">
        <TextInput value={hero.imageAlt} onChange={(v) => set({ imageAlt: v })} />
      </Field>
    </div>
  )
}

function BrandStripPanel({ draft, update }) {
  const strip = draft.brandStrip
  return (
    <div className="admin-panel-body">
      <p className="admin-panel-note">
        Brand names shown in the light strip under the hero. Upper-case names look best.
      </p>
      <Repeater
        items={strip.map((name) => ({ name }))}
        onChange={(items) => update((d) => { d.brandStrip = items.map((i) => i.name) })}
        newItem={() => ({ name: 'NEW BRAND' })}
        addLabel="Add brand"
        emptyText="No brands yet."
        renderItem={(item, patch) => (
          <TextInput value={item.name} onChange={(v) => patch({ name: v })} />
        )}
      />
    </div>
  )
}

function AboutPanel({ draft, update, imageOptions }) {
  const about = draft.about
  const set = (patch) => update((d) => { d.about = { ...d.about, ...patch } })
  return (
    <div className="admin-panel-body">
      <div className="admin-grid-2">
        <Field label="Kicker">
          <TextInput value={about.kicker} onChange={(v) => set({ kicker: v })} />
        </Field>
        <Field label="Section title">
          <TextInput value={about.title} onChange={(v) => set({ title: v })} />
        </Field>
      </div>
      <Field label="Story sub-heading">
        <TextInput value={about.storyTitle} onChange={(v) => set({ storyTitle: v })} />
      </Field>
      <Field label="Story paragraphs">
        <Repeater
          items={about.paragraphs.map((text) => ({ text }))}
          onChange={(items) => set({ paragraphs: items.map((i) => i.text) })}
          newItem={() => ({ text: '' })}
          addLabel="Add paragraph"
          emptyText="No paragraphs yet."
          renderItem={(item, patch) => (
            <TextArea value={item.text} onChange={(v) => patch({ text: v })} rows={3} />
          )}
        />
      </Field>
      <Field label="Bullet points">
        <Repeater
          items={about.points.map((text) => ({ text }))}
          onChange={(items) => set({ points: items.map((i) => i.text) })}
          newItem={() => ({ text: '' })}
          addLabel="Add point"
          emptyText="No points yet."
          renderItem={(item, patch) => (
            <TextInput value={item.text} onChange={(v) => patch({ text: v })} />
          )}
        />
      </Field>
      <Field label="Image path">
        <ImageInput value={about.image} onChange={(v) => set({ image: v })} options={imageOptions} />
      </Field>
      <div className="admin-grid-2">
        <Field label="Image alt text">
          <TextInput value={about.imageAlt} onChange={(v) => set({ imageAlt: v })} />
        </Field>
        <Field label="Image caption">
          <TextInput value={about.imageCaption} onChange={(v) => set({ imageCaption: v })} />
        </Field>
      </div>
      <Field label="Statistics band">
        <Repeater
          items={about.stats}
          onChange={(items) => set({ stats: items })}
          newItem={() => ({ value: 0, suffix: '+', label: 'New Statistic' })}
          addLabel="Add statistic"
          emptyText="No statistics yet."
          renderItem={(item, patch) => (
            <div className="admin-grid-3">
              <TextInput
                type="number"
                value={String(item.value)}
                onChange={(v) => patch({ value: Number(v) || 0 })}
                aria-label="Statistic value"
              />
              <TextInput value={item.suffix} onChange={(v) => patch({ suffix: v })} aria-label="Suffix" />
              <TextInput value={item.label} onChange={(v) => patch({ label: v })} aria-label="Label" />
            </div>
          )}
        />
      </Field>
    </div>
  )
}

function TechnologyPanel({ draft, update }) {
  const technology = draft.technology
  const set = (patch) => update((d) => { d.technology = { ...d.technology, ...patch } })
  return (
    <div className="admin-panel-body">
      <div className="admin-grid-2">
        <Field label="Kicker">
          <TextInput value={technology.kicker} onChange={(v) => set({ kicker: v })} />
        </Field>
        <Field label="Section title">
          <TextInput value={technology.title} onChange={(v) => set({ title: v })} />
        </Field>
      </div>
      <Field label="Intro paragraph">
        <TextArea value={technology.lead} onChange={(v) => set({ lead: v })} rows={2} />
      </Field>
      <Field label="Technology cards" hint="Icons match the card title; unknown titles get a generic icon.">
        <Repeater
          items={technology.items}
          onChange={(items) => set({ items })}
          newItem={() => ({ title: 'New Technology', text: '' })}
          addLabel="Add card"
          emptyText="No cards yet."
          renderItem={(item, patch) => (
            <>
              <TextInput value={item.title} onChange={(v) => patch({ title: v })} placeholder="Title" />
              <TextArea value={item.text} onChange={(v) => patch({ text: v })} rows={2} placeholder="Description" />
            </>
          )}
        />
      </Field>
    </div>
  )
}

function ServicesPanel({ draft, update }) {
  const set = (items) => update((d) => { d.services = { items } })
  return (
    <div className="admin-panel-body">
      <p className="admin-panel-note">
        Support section service cards. Titles like “Watch Repair” or “Battery Replacement” automatically get their matching icon.
      </p>
      <Repeater
        items={draft.services.items}
        onChange={set}
        newItem={() => ({ title: 'New Service', text: '' })}
        addLabel="Add service"
        emptyText="No services yet."
        renderItem={(item, patch) => (
          <>
            <TextInput value={item.title} onChange={(v) => patch({ title: v })} placeholder="Service name" />
            <TextArea value={item.text} onChange={(v) => patch({ text: v })} rows={2} placeholder="Short description" />
          </>
        )}
      />
    </div>
  )
}

function GalleryPanel({ draft, update, imageOptions }) {
  const set = (items) => update((d) => { d.gallery = items })
  return (
    <div className="admin-panel-body">
      <p className="admin-panel-note">Gallery tiles and their filter categories.</p>
      <Repeater
        items={draft.gallery}
        onChange={set}
        newItem={() => ({ key: '/img/watchmaking.jpg', title: 'New image', cat: 'Watch Details' })}
        addLabel="Add gallery image"
        emptyText="No gallery images yet."
        renderItem={(item, patch) => (
          <>
            <ImageInput value={item.key} onChange={(v) => patch({ key: v })} options={imageOptions} />
            <TextInput value={item.title} onChange={(v) => patch({ title: v })} placeholder="Caption title" />
            <TextInput value={item.cat} onChange={(v) => patch({ cat: v })} placeholder="Category" />
          </>
        )}
      />
    </div>
  )
}

function StoresPanel({ draft, update }) {
  const set = (items) => update((d) => { d.stores = items })
  return (
    <div className="admin-panel-body">
      <p className="admin-panel-note">
        Showrooms shown on the Leaflet map and the store cards. Latitude/longitude place the marker on the Nigeria map.
      </p>
      <Repeater
        items={draft.stores}
        onChange={set}
        newItem={() => ({
          id: `store-${Date.now()}`,
          name: 'Alberto Watch Company — New Branch',
          address: '',
          phone: '',
          hours: 'Mon–Sat: 9:00 AM – 6:00 PM · Sun: Closed',
          services: ['Luxury Boutique'],
          lat: 9.08,
          lng: 8.675,
        })}
        addLabel="Add store"
        emptyText="No stores yet."
        renderItem={(item, patch) => (
          <>
            <TextInput value={item.name} onChange={(v) => patch({ name: v })} placeholder="Store name" />
            <TextInput value={item.address} onChange={(v) => patch({ address: v })} placeholder="Address" />
            <div className="admin-grid-2">
              <TextInput value={item.phone} onChange={(v) => patch({ phone: v })} placeholder="Phone" />
              <TextInput value={item.hours} onChange={(v) => patch({ hours: v })} placeholder="Opening hours" />
            </div>
            <div className="admin-grid-2">
              <TextInput
                type="number"
                step="any"
                value={String(item.lat)}
                onChange={(v) => patch({ lat: Number(v) })}
                aria-label="Latitude"
              />
              <TextInput
                type="number"
                step="any"
                value={String(item.lng)}
                onChange={(v) => patch({ lng: Number(v) })}
                aria-label="Longitude"
              />
            </div>
            <TextInput
              value={(item.services || []).join(', ')}
              onChange={(v) => patch({ services: v.split(',').map((s) => s.trim()).filter(Boolean) })}
              placeholder="Services, comma-separated"
            />
          </>
        )}
      />
    </div>
  )
}

function CataloguePanel({ draft, update, imageOptions }) {
  const [expandedId, setExpandedId] = useState(null)
  const [search, setSearch] = useState('')
  const products = draft.products
  const categories = draft.categories

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return products
    return products.filter((p) =>
      [p.brand, p.name, p.reference, p.category].join(' ').toLowerCase().includes(q),
    )
  }, [products, search])

  const setProducts = (items) => update((d) => { d.products = items })

  const addProduct = () => {
    const id = Math.max(0, ...products.map((p) => p.id)) + 1
    const blank = {
      id,
      brand: 'New Brand',
      name: 'New Watch',
      reference: `NEW-${String(id).padStart(3, '0')}`,
      category: categories[0]?.name || 'Luxury',
      price: 0,
      movement: 'Quartz',
      caseSize: '40 mm',
      caseMaterial: 'Stainless steel',
      dial: 'Black',
      bezel: 'Fixed',
      bracelet: 'Leather strap',
      crystal: 'Sapphire',
      waterResistance: '50 m',
      year: 'Current catalogue',
      description: 'A new timepiece description.',
      availability: 'Available',
      condition: 'New',
      image: '/img/snk809.jpg',
    }
    setProducts([...products, blank])
    setExpandedId(id)
    setSearch('')
  }

  const patchProduct = (id, patch) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, ...patch } : p)))
  }

  const removeProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id))
    if (expandedId === id) setExpandedId(null)
  }

  const moveProduct = (index, dir) => {
    const next = [...products]
    const j = index + dir
    if (j < 0 || j >= next.length) return
    ;[next[index], next[j]] = [next[j], next[index]]
    setProducts(next)
  }

  return (
    <div className="admin-panel-body">
      <div className="admin-toolbar">
        <input
          type="search"
          className="admin-search"
          placeholder="Search products…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search products"
        />
        <button type="button" className="admin-btn admin-btn-primary admin-btn-sm" onClick={addProduct}>
          + Add product
        </button>
      </div>
      <p className="admin-panel-note">
        {products.length} products in the catalogue. Changes appear in the grid, the category
        collections, the filter counts and the price list after you publish.
      </p>

      <div className="admin-product-list">
        {filtered.map((p) => {
          const index = products.findIndex((x) => x.id === p.id)
          const expanded = expandedId === p.id
          return (
            <div key={p.id} className={`admin-product-item${expanded ? ' expanded' : ''}`}>
              <div className="admin-product-row">
                <button
                  type="button"
                  className="admin-product-summary"
                  aria-expanded={expanded}
                  onClick={() => setExpandedId(expanded ? null : p.id)}
                >
                  <span className="admin-product-id">#{String(p.id).padStart(2, '0')}</span>
                  <span className="admin-product-name">{p.brand} — {p.name}</span>
                  <span className="admin-product-ref">{p.reference}</span>
                  <span className="admin-product-price">${Number(p.price).toLocaleString('en-US')}</span>
                </button>
                <div className="admin-repeater-actions">
                  <button type="button" className="admin-icon-btn" aria-label="Move up" disabled={index === 0} onClick={() => moveProduct(index, -1)}>↑</button>
                  <button type="button" className="admin-icon-btn" aria-label="Move down" disabled={index === products.length - 1} onClick={() => moveProduct(index, 1)}>↓</button>
                  <button type="button" className="admin-icon-btn danger" aria-label={`Delete ${p.name}`} onClick={() => removeProduct(p.id)}>✕</button>
                </div>
              </div>

              {expanded && (
                <div className="admin-product-editor">
                  <div className="admin-grid-2">
                    <Field label="Brand"><TextInput value={p.brand} onChange={(v) => patchProduct(p.id, { brand: v })} /></Field>
                    <Field label="Model name"><TextInput value={p.name} onChange={(v) => patchProduct(p.id, { name: v })} /></Field>
                    <Field label="Reference number"><TextInput value={p.reference} onChange={(v) => patchProduct(p.id, { reference: v })} /></Field>
                    <Field label="Category">
                      <Select
                        value={p.category}
                        onChange={(v) => patchProduct(p.id, { category: v })}
                        options={categories.map((c) => ({ value: c.name, label: c.name }))}
                      />
                    </Field>
                    <Field label="Price (USD, indicative)">
                      <TextInput type="number" value={String(p.price)} onChange={(v) => patchProduct(p.id, { price: Number(v) || 0 })} />
                    </Field>
                    <Field label="Availability">
                      <Select
                        value={p.availability}
                        onChange={(v) => patchProduct(p.id, { availability: v })}
                        options={['Available', 'Low Stock', 'Out of Stock'].map((a) => ({ value: a, label: a }))}
                      />
                    </Field>
                  </div>
                  <Field label="Description">
                    <TextArea value={p.description} onChange={(v) => patchProduct(p.id, { description: v })} rows={3} />
                  </Field>
                  <div className="admin-grid-2">
                    <Field label="Movement"><TextInput value={p.movement} onChange={(v) => patchProduct(p.id, { movement: v })} /></Field>
                    <Field label="Case size"><TextInput value={p.caseSize} onChange={(v) => patchProduct(p.id, { caseSize: v })} /></Field>
                    <Field label="Case material"><TextInput value={p.caseMaterial} onChange={(v) => patchProduct(p.id, { caseMaterial: v })} /></Field>
                    <Field label="Dial"><TextInput value={p.dial} onChange={(v) => patchProduct(p.id, { dial: v })} /></Field>
                    <Field label="Bezel"><TextInput value={p.bezel} onChange={(v) => patchProduct(p.id, { bezel: v })} /></Field>
                    <Field label="Bracelet / strap"><TextInput value={p.bracelet} onChange={(v) => patchProduct(p.id, { bracelet: v })} /></Field>
                    <Field label="Crystal"><TextInput value={p.crystal} onChange={(v) => patchProduct(p.id, { crystal: v })} /></Field>
                    <Field label="Water resistance"><TextInput value={p.waterResistance} onChange={(v) => patchProduct(p.id, { waterResistance: v })} /></Field>
                    <Field label="Year"><TextInput value={p.year} onChange={(v) => patchProduct(p.id, { year: v })} /></Field>
                    <Field label="Condition"><TextInput value={p.condition} onChange={(v) => patchProduct(p.id, { condition: v })} /></Field>
                  </div>
                  <Field label="Image path">
                    <ImageInput value={p.image} onChange={(v) => patchProduct(p.id, { image: v })} options={imageOptions} />
                  </Field>
                </div>
              )}
            </div>
          )
        })}
        {filtered.length === 0 && <p className="admin-empty-note">No products match “{search}”.</p>}
      </div>

      <h3 className="admin-subhead">Categories</h3>
      <Repeater
        items={categories}
        onChange={(items) => update((d) => { d.categories = items })}
        newItem={() => ({ id: `cat-${Date.now()}`, name: 'New Category', tagline: 'Short tagline', description: 'Category description.', image: '/img/snk809.jpg' })}
        addLabel="Add category"
        emptyText="No categories yet."
        renderItem={(item, patch) => (
          <>
            <div className="admin-grid-2">
              <Field label="Name"><TextInput value={item.name} onChange={(v) => patch({ name: v })} /></Field>
              <Field label="Tagline"><TextInput value={item.tagline} onChange={(v) => patch({ tagline: v })} /></Field>
            </div>
            <Field label="Description"><TextArea value={item.description} onChange={(v) => patch({ description: v })} rows={2} /></Field>
            <ImageInput value={item.image} onChange={(v) => patch({ image: v })} options={imageOptions} />
          </>
        )}
      />
    </div>
  )
}

function ContactPanel({ draft, update }) {
  const contact = draft.contact
  const set = (patch) => update((d) => { d.contact = { ...d.contact, ...patch } })
  return (
    <div className="admin-panel-body">
      <div className="admin-grid-2">
        <Field label="Kicker"><TextInput value={contact.kicker} onChange={(v) => set({ kicker: v })} /></Field>
        <Field label="Section title"><TextInput value={contact.title} onChange={(v) => set({ title: v })} /></Field>
      </div>
      <Field label="Intro paragraph"><TextArea value={contact.lead} onChange={(v) => set({ lead: v })} rows={2} /></Field>
      <Field label="Company name"><TextInput value={contact.company} onChange={(v) => set({ company: v })} /></Field>
      <div className="admin-grid-2">
        <Field label="Email"><TextInput value={contact.email} onChange={(v) => set({ email: v })} /></Field>
        <Field label="Phone"><TextInput value={contact.phone} onChange={(v) => set({ phone: v })} /></Field>
      </div>
      <Field label="Address"><TextInput value={contact.address} onChange={(v) => set({ address: v })} /></Field>
      <div className="admin-grid-2">
        <Field label="Hours line 1"><TextInput value={contact.hoursLine1} onChange={(v) => set({ hoursLine1: v })} /></Field>
        <Field label="Hours line 2"><TextInput value={contact.hoursLine2} onChange={(v) => set({ hoursLine2: v })} /></Field>
      </div>
      <Field label="Map / access note"><TextArea value={contact.mapNote} onChange={(v) => set({ mapNote: v })} rows={2} /></Field>
    </div>
  )
}

function SettingsPanel({ draft, update }) {
  const settings = draft.settings
  const set = (patch) => update((d) => { d.settings = { ...d.settings, ...patch } })
  return (
    <div className="admin-panel-body">
      <h3 className="admin-subhead">Brand</h3>
      <div className="admin-grid-2">
        <Field label="Brand name (large)">
          <TextInput value={settings.brandName} onChange={(v) => set({ brandName: v })} />
        </Field>
        <Field label="Brand sub-line">
          <TextInput value={settings.brandSub} onChange={(v) => set({ brandSub: v })} />
        </Field>
      </div>

      <h3 className="admin-subhead">Header top strip</h3>
      <p className="admin-panel-note">
        The top strip (phone, email, offer line, visitor counter) is currently{' '}
        <strong>{settings.showTopbar ? 'visible' : 'hidden'}</strong> on the public site — exactly
        as requested. Turn it back on here if you ever want it.
      </p>
      <div className="admin-switch-row">
        <label className="admin-switch">
          <input
            type="checkbox"
            checked={settings.showTopbar}
            onChange={(e) => set({ showTopbar: e.target.checked })}
          />
          <span>Show the top strip (phone / email / offer)</span>
        </label>
        <label className="admin-switch">
          <input
            type="checkbox"
            checked={settings.showVisitorCounter}
            onChange={(e) => set({ showVisitorCounter: e.target.checked })}
          />
          <span>Show visitor counter in the top strip</span>
        </label>
      </div>
      <div className="admin-grid-2">
        <Field label="Top strip phone"><TextInput value={settings.topbarPhone} onChange={(v) => set({ topbarPhone: v })} /></Field>
        <Field label="Top strip email"><TextInput value={settings.topbarEmail} onChange={(v) => set({ topbarEmail: v })} /></Field>
      </div>
      <Field label="Top strip offer line"><TextInput value={settings.topbarNote} onChange={(v) => set({ topbarNote: v })} /></Field>

      <h3 className="admin-subhead">Navigation labels</h3>
      <div className="admin-grid-2">
        {Object.entries(settings.navLabels).map(([id, label]) => (
          <Field key={id} label={id}>
            <TextInput
              value={label}
              onChange={(v) => set({ navLabels: { ...settings.navLabels, [id]: v } })}
            />
          </Field>
        ))}
      </div>

      <h3 className="admin-subhead">Footer</h3>
      <Field label="Footer demo note"><TextInput value={settings.footerNote} onChange={(v) => set({ footerNote: v })} /></Field>
    </div>
  )
}

function SecurityPanel({ onLogout }) {
  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [confirm, setConfirm] = useState('')
  const [msg, setMsg] = useState(null) // { ok, text }

  const submit = async (e) => {
    e.preventDefault()
    setMsg(null)
    if (next !== confirm) {
      setMsg({ ok: false, text: 'New passwords do not match.' })
      return
    }
    const result = await changePassword(current, next)
    setMsg(result.ok ? { ok: true, text: 'Password changed.' } : { ok: false, text: result.error })
    if (result.ok) {
      setCurrent('')
      setNext('')
      setConfirm('')
    }
  }

  return (
    <div className="admin-panel-body">
      <div className="admin-security-card">
        <ShieldIcon />
        <div>
          <h3>Session</h3>
          <p>
            Signed in as <strong>{getAdminUsername() || 'admin'}</strong>. Sessions expire
            automatically after {ADMIN_SESSION_MINUTES} minutes or when you sign out.
          </p>
          <button type="button" className="admin-btn admin-btn-danger" onClick={onLogout}>
            Sign out now
          </button>
        </div>
      </div>

      <h3 className="admin-subhead">Change password</h3>
      <form className="admin-form admin-form-inline" onSubmit={submit}>
        <label className="admin-field">
          <span>Current password</span>
          <input type="password" autoComplete="current-password" value={current} onChange={(e) => setCurrent(e.target.value)} required />
        </label>
        <label className="admin-field">
          <span>New password</span>
          <input type="password" autoComplete="new-password" value={next} onChange={(e) => setNext(e.target.value)} required />
        </label>
        <label className="admin-field">
          <span>Confirm new password</span>
          <input type="password" autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
        </label>
        <button type="submit" className="admin-btn admin-btn-primary">Update password</button>
      </form>
      {msg && (
        <p className={msg.ok ? 'admin-form-info' : 'admin-form-error'} role={msg.ok ? 'status' : 'alert'}>
          {msg.ok ? '✓ ' : '✕ '}
          {msg.text}
        </p>
      )}
    </div>
  )
}

function AdvancedPanel({ onResetDone }) {
  const [json, setJson] = useState('')
  const [msg, setMsg] = useState(null)
  const { draft, published, update } = useSiteContent()

  const doExport = () => {
    setJson(exportContentJson(draft || published))
    setMsg({ ok: true, text: 'Current draft exported below — copy it somewhere safe.' })
  }

  const doImport = () => {
    try {
      const parsed = importContentJson(json)
      update(() => parsed)
      setMsg({ ok: true, text: 'Content imported into the draft. Review it, then publish.' })
    } catch (err) {
      setMsg({ ok: false, text: `Import failed: ${err.message}` })
    }
  }

  const doReset = () => {
    if (!window.confirm('Reset ALL published content back to the original defaults? This cannot be undone.')) return
    resetPublishedContent()
    onResetDone()
    setMsg({ ok: true, text: 'Published content reset to defaults.' })
  }

  return (
    <div className="admin-panel-body">
      <p className="admin-panel-note">
        Backup and restore the entire site content as JSON, or reset everything to the original
        state.
      </p>
      <div className="admin-toolbar">
        <button type="button" className="admin-btn admin-btn-ghost admin-btn-sm" onClick={doExport}>Export JSON</button>
        <button type="button" className="admin-btn admin-btn-ghost admin-btn-sm" onClick={doImport}>Import JSON</button>
        <button type="button" className="admin-btn admin-btn-danger admin-btn-sm" onClick={doReset}>Reset to defaults</button>
      </div>
      {msg && <p className={msg.ok ? 'admin-form-info' : 'admin-form-error'}>{msg.text}</p>}
      <TextArea value={json} onChange={setJson} rows={10} placeholder='{"version":1, …}' aria-label="Content JSON" />
    </div>
  )
}

/* ============================ Main dashboard ============================= */

const TABS = [
  { id: 'hero', label: 'Hero' },
  { id: 'brands', label: 'Brand Strip' },
  { id: 'catalogue', label: 'Products' },
  { id: 'about', label: 'About' },
  { id: 'technology', label: 'Technology' },
  { id: 'services', label: 'Services' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'stores', label: 'Stores' },
  { id: 'contact', label: 'Contact' },
  { id: 'settings', label: 'Settings' },
  { id: 'security', label: 'Security' },
  { id: 'advanced', label: 'Backup' },
]

export default function AdminDashboard({ onLogout }) {
  const { draft, published, hasDraft, updateDraft, publish, discardDraft, startPreview, stopPreview, previewing, resetToDefaults } =
    useSiteContent()
  const [tab, setTab] = useState('hero')
  const [imageOptions, setImageOptions] = useState([])
  const [toast, setToast] = useState(null)
  const toastTimer = useRef(null)
  const [confirmPublish, setConfirmPublish] = useState(false)

  useEffect(() => {
    loadImageOptions().then(setImageOptions)
  }, [])

  useEffect(() => () => clearTimeout(toastTimer.current), [])

  const flash = (text) => {
    setToast(text)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 3500)
  }

  const handlePublish = () => {
    if (publish()) {
      setConfirmPublish(false)
      flash('Published — the live website now shows your changes.')
    } else {
      flash('Publishing failed (storage unavailable).')
    }
  }

  const handleLogout = () => {
    authLogout()
    onLogout()
  }

  // Panels always edit *something*: the live draft while editing,
  // otherwise the published content. The first edit transparently
  // creates the draft (updateDraft falls back to published), which
  // also keeps the dashboard alive right after Publish/Discard.
  const editorDraft = draft || published

  if (!editorDraft) return null

  const panelProps = { draft: editorDraft, update: updateDraft, imageOptions }

  return (
    <div className="admin-shell">
      <header className="admin-topbar">
        <div className="admin-topbar-left">
          <span className="admin-logo">AWC</span>
          <div>
            <strong>Admin Panel</strong>
            <span className="admin-topbar-sub">Alberto Watch Company</span>
          </div>
        </div>
        <div className="admin-topbar-actions">
          <span className={`admin-state-pill${hasDraft ? ' draft' : ''}`}>
            {hasDraft ? 'Unpublished changes' : 'All changes published'}
          </span>
          <button
            type="button"
            className="admin-btn admin-btn-ghost admin-btn-sm"
            onClick={() => {
              if (previewing) {
                stopPreview()
                flash('Preview closed — showing the published site.')
              } else {
                startPreview()
                flash('Previewing your draft on the live site.')
              }
            }}
          >
            {previewing ? 'Stop preview' : 'Preview changes'}
          </button>
          <button
            type="button"
            className="admin-btn admin-btn-primary admin-btn-sm"
            onClick={() => (hasDraft ? setConfirmPublish(true) : handlePublish())}
            disabled={previewing}
            title={previewing ? 'Stop preview before publishing' : undefined}
          >
            Publish
          </button>
          <button type="button" className="admin-btn admin-btn-danger admin-btn-sm" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </header>

      {previewing && (
        <div className="admin-preview-banner" role="status">
          Preview mode — you are seeing your unpublished draft. Visitors still see the published site.
        </div>
      )}

      <nav className="admin-tabs" aria-label="Admin sections">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            className={`admin-tab${tab === t.id ? ' active' : ''}`}
            aria-pressed={tab === t.id}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <main className="admin-main">
        {tab === 'hero' && <HeroPanel {...panelProps} />}
        {tab === 'brands' && <BrandStripPanel {...panelProps} />}
        {tab === 'catalogue' && <CataloguePanel {...panelProps} />}
        {tab === 'about' && <AboutPanel {...panelProps} />}
        {tab === 'technology' && <TechnologyPanel {...panelProps} />}
        {tab === 'services' && <ServicesPanel {...panelProps} />}
        {tab === 'gallery' && <GalleryPanel {...panelProps} />}
        {tab === 'stores' && <StoresPanel {...panelProps} />}
        {tab === 'contact' && <ContactPanel {...panelProps} />}
        {tab === 'settings' && <SettingsPanel {...panelProps} />}
        {tab === 'security' && <SecurityPanel onLogout={handleLogout} />}
        {tab === 'advanced' && (
          <AdvancedPanel
            onResetDone={() => {
              resetToDefaults()
              flash('Content reset to defaults.')
            }}
          />
        )}
      </main>

      {hasDraft && (
        <div className="admin-draftbar">
          <span>You have unpublished changes.</span>
          <div className="admin-draftbar-actions">
            <button
              type="button"
              className="admin-linklike danger"
              onClick={() => {
                discardDraft()
                flash('Draft discarded — back to the published content.')
              }}
            >
              Discard draft
            </button>
            <button type="button" className="admin-btn admin-btn-primary admin-btn-sm" onClick={() => setConfirmPublish(true)} disabled={previewing}>
              Publish now
            </button>
          </div>
        </div>
      )}

      {confirmPublish && (
        <div className="admin-modal-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) setConfirmPublish(false) }}>
          <div className="admin-modal" role="dialog" aria-modal="true" aria-labelledby="admin-publish-title">
            <h3 id="admin-publish-title">Publish changes?</h3>
            <p>All draft edits will replace the live website content. Visitors will see the new version immediately.</p>
            <div className="admin-modal-actions">
              <button type="button" className="admin-btn admin-btn-ghost" onClick={() => setConfirmPublish(false)}>Cancel</button>
              <button type="button" className="admin-btn admin-btn-primary" onClick={handlePublish}>
                <CheckIcon className="admin-btn-icon" /> Publish
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && <div className="admin-toast" role="status">{toast}</div>}
    </div>
  )
}
