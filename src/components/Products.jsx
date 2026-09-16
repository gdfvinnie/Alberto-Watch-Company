import { useEffect, useMemo, useRef, useState } from 'react'
import { useSiteContent } from '../context/SiteContentContext.jsx'
import { useReveal } from '../hooks/hooks.js'
import { artFor } from '../art/artMap.jsx'
import { CheckIcon, ErrorIcon } from './WatchArt.jsx'

const currency = (n) => `$${n.toLocaleString('en-US')}`

const PRICE_BANDS = [
  { id: 'all', label: 'Any price', test: () => true },
  { id: 'u250', label: 'Under $250', test: (p) => p.price < 250 },
  { id: '250-500', label: '$250 – $500', test: (p) => p.price >= 250 && p.price <= 500 },
  { id: '500-5k', label: '$500 – $5,000', test: (p) => p.price > 500 && p.price <= 5000 },
  { id: '5k-20k', label: '$5,000 – $20,000', test: (p) => p.price > 5000 && p.price <= 20000 },
  { id: 'o20k', label: 'Over $20,000', test: (p) => p.price > 20000 },
]

const AVAILABILITIES = ['Available', 'Low Stock', 'Out of Stock']

/* ------------------------- Catalogue toolbar ------------------------- */

function FilterToolbar({ filters, onChange, resultCount, brands, movements, totalCount }) {
  const set = (patch) => onChange({ ...filters, ...patch })

  return (
    <div className="filter-toolbar" role="search" aria-label="Filter the watch catalogue">
      <div className="filter-row">
        <div className="filter-field filter-search">
          <label htmlFor="catalogue-search">Search</label>
          <input
            id="catalogue-search"
            type="search"
            placeholder="e.g. Submariner, GMT, Rolex, Automatic…"
            value={filters.query}
            onChange={(e) => set({ query: e.target.value })}
          />
        </div>
        <div className="filter-field">
          <label htmlFor="filter-brand">Brand</label>
          <select id="filter-brand" value={filters.brand} onChange={(e) => set({ brand: e.target.value })}>
            <option value="all">All brands</option>
            {brands.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
        <div className="filter-field">
          <label htmlFor="filter-movement">Movement</label>
          <select id="filter-movement" value={filters.movement} onChange={(e) => set({ movement: e.target.value })}>
            <option value="all">All movements</option>
            {movements.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
        <div className="filter-field">
          <label htmlFor="filter-price">Price</label>
          <select id="filter-price" value={filters.price} onChange={(e) => set({ price: e.target.value })}>
            {PRICE_BANDS.map((b) => (
              <option key={b.id} value={b.id}>{b.label}</option>
            ))}
          </select>
        </div>
        <div className="filter-field">
          <label htmlFor="filter-availability">Availability</label>
          <select
            id="filter-availability"
            value={filters.availability}
            onChange={(e) => set({ availability: e.target.value })}
          >
            <option value="all">Any availability</option>
            {AVAILABILITIES.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="filter-meta">
        <p className="filter-count" role="status">
          {resultCount} of {totalCount} watches
        </p>
        <button
          type="button"
          className="filter-reset"
          onClick={() =>
            onChange({ query: '', brand: 'all', movement: 'all', price: 'all', availability: 'all' })
          }
        >
          Reset filters
        </button>
      </div>
    </div>
  )
}

/* ------------------------- Category cards -------------------------- */

function CategoryCard({ cat, isActive, onSelect }) {
  const [ref, visible] = useReveal()
  return (
    <div
      ref={ref}
      className={`category-card reveal ${visible ? 'in' : ''}${isActive ? ' active' : ''}`}
      role="button"
      tabIndex={0}
      aria-pressed={isActive}
      aria-label={`Show the ${cat.name} collection`}
      onClick={() => onSelect(cat)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect(cat)
        }
      }}
    >
      <div className="category-art">
        {artFor(cat.image, `${cat.name} collection photograph`)}
      </div>
      <div className="category-body">
        <h3>{cat.name}</h3>
        <p className="category-tagline">{cat.tagline}</p>
        <p className="category-desc">{cat.description}</p>
        <span className="btn btn-gold-outline btn-sm category-btn">View Collection</span>
      </div>
    </div>
  )
}

/* --------------------------- Product card -------------------------- */

function ProductCard({ product, onView }) {
  return (
    <article className="product-card" aria-label={`${product.brand} ${product.name} ${product.reference}`}>
      <div className="product-art">
        {artFor(product.image, `${product.brand} ${product.name} reference ${product.reference}`)}
        <span className="product-badge" data-stock={product.availability}>
          {product.availability}
        </span>
        {product.condition?.startsWith('Pre-owned') && (
          <span className="product-condition">Pre-owned</span>
        )}
      </div>
      <div className="product-body">
        <p className="product-brand">{product.brand}</p>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-ref">Ref. {product.reference}</p>
        <p className="product-desc">{product.description}</p>
        <div className="product-meta">
          <span className="product-category">{product.category}</span>
          <span className="product-price">{currency(product.price)}</span>
        </div>
        <button type="button" className="btn btn-gold-outline btn-sm product-btn" onClick={() => onView(product)}>
          View Details
        </button>
      </div>
    </article>
  )
}

/* -------------------------- Product modal -------------------------- */

function ProductModal({ product, onClose }) {
  const closeRef = useRef(null)
  const dialogRef = useRef(null)

  useEffect(() => {
    if (!product) return undefined
    const previouslyFocused = document.activeElement
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'

    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab' && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        )
        if (focusables.length === 0) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      if (previouslyFocused && previouslyFocused.focus) previouslyFocused.focus()
    }
  }, [product, onClose])

  if (!product) return null

  return (
    <div
      className="modal-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        ref={dialogRef}
        className="product-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
      >
        <button
          ref={closeRef}
          type="button"
          className="modal-x"
          aria-label="Close product details"
          onClick={onClose}
        >
          ×
        </button>
        <div className="modal-art">
          {artFor(product.image, `${product.brand} ${product.name} reference ${product.reference}`)}
        </div>
        <div className="modal-info">
          <p className="product-brand">{product.brand}</p>
          <h3 id="product-modal-title">{product.name}</h3>
          <p className="modal-model">Ref. {product.reference}</p>
          <p className="modal-price">
            {currency(product.price)}
            <span className="modal-price-note">indicative sample price</span>
          </p>
          <p className="modal-desc">{product.description}</p>
          <dl className="spec-grid">
            <div>
              <dt>Movement</dt>
              <dd>{product.movement}</dd>
            </div>
            <div>
              <dt>Case size</dt>
              <dd>{product.caseSize}</dd>
            </div>
            <div>
              <dt>Case material</dt>
              <dd>{product.caseMaterial}</dd>
            </div>
            <div>
              <dt>Dial</dt>
              <dd>{product.dial}</dd>
            </div>
            <div>
              <dt>Bezel</dt>
              <dd>{product.bezel}</dd>
            </div>
            <div>
              <dt>Bracelet / strap</dt>
              <dd>{product.bracelet}</dd>
            </div>
            <div>
              <dt>Crystal</dt>
              <dd>{product.crystal}</dd>
            </div>
            <div>
              <dt>Water resistance</dt>
              <dd>{product.waterResistance}</dd>
            </div>
            <div>
              <dt>Year</dt>
              <dd>{product.year}</dd>
            </div>
            <div>
              <dt>Condition</dt>
              <dd>{product.condition}</dd>
            </div>
            <div>
              <dt>Availability</dt>
              <dd>
                <span className="stock-pill" data-stock={product.availability}>
                  {product.availability}
                </span>
              </dd>
            </div>
            <div>
              <dt>Category</dt>
              <dd>{product.category}</dd>
            </div>
          </dl>
          <div className="modal-actions">
            <button type="button" className="btn btn-gold" onClick={onClose}>
              Close
            </button>
            <a className="btn btn-outline-light-lux" href="#contact" onClick={onClose}>
              Enquire
            </a>
          </div>
          <p className="modal-disclaimer">
            Product information and imagery are presented for academic demonstration purposes.
            Alberto Watch Company is not an authorised dealer of, or affiliated with, the brands shown.
          </p>
        </div>
      </div>
    </div>
  )
}

/* --------------------------- Price list ---------------------------- */

function PriceList({ filters, onFilterViaRow, products }) {
  const [ref, visible] = useReveal()

  const rows = useMemo(() => {
    const q = filters.query.trim().toLowerCase()
    const band = PRICE_BANDS.find((b) => b.id === filters.price) || PRICE_BANDS[0]
    return products.filter(
      (p) =>
        band.test(p) &&
        (filters.brand === 'all' || p.brand === filters.brand) &&
        (filters.availability === 'all' || p.availability === filters.availability) &&
        (q === '' ||
          [p.brand, p.name, p.reference, p.movement, p.category]
            .join(' ')
            .toLowerCase()
            .includes(q)),
    )
  }, [filters])

  return (
    <div ref={ref} className={`price-list reveal ${visible ? 'in' : ''}`}>
      <h3 className="subsection-title">Full Price List</h3>
      <p className="price-note">
        Indicative sample pricing for this academic demonstration — subject to change and not an
        offer to sell. The table reflects the catalogue above and scrolls horizontally on small
        screens.
      </p>
      <div className="table-responsive price-table-wrap">
        <table className="table price-table">
          <caption className="visually-hidden">
            Price list of all watches: product, reference, brand, category, movement, price and
            availability
          </caption>
          <thead>
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Reference</th>
              <th scope="col">Brand</th>
              <th scope="col">Category</th>
              <th scope="col">Movement</th>
              <th scope="col" className="text-end">Price</th>
              <th scope="col">Availability</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={7} className="price-empty">No watches match the current filters.</td>
              </tr>
            )}
            {rows.map((p) => (
              <tr key={p.id}>
                <td data-label="Product">
                  <span className="price-id">#{String(p.id).padStart(2, '0')}</span> {p.name}
                </td>
                <td data-label="Reference"><span className="price-ref">{p.reference}</span></td>
                <td data-label="Brand">{p.brand}</td>
                <td data-label="Category">
                  <button
                    type="button"
                    className="price-cat-link"
                    title={`Show the ${p.category} collection`}
                    onClick={() => onFilterViaRow(p.category)}
                  >
                    {p.category}
                  </button>
                </td>
                <td data-label="Movement">{p.movement}</td>
                <td data-label="Price" className="text-end price-cell">{currency(p.price)}</td>
                <td data-label="Availability">
                  <span className="stock-pill" data-stock={p.availability}>{p.availability}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ------------------------- Products section ------------------------ */

const EMPTY_FILTERS = { query: '', brand: 'all', movement: 'all', price: 'all', availability: 'all' }

export default function Products() {
  const { content } = useSiteContent()
  const products = content.products
  const categories = content.categories
  const brands = [...new Set(products.map((p) => p.brand))].sort()
  const movements = [...new Set(products.map((p) => p.movement.split('(')[0].trim()))].sort()

  const [selected, setSelected] = useState(null) // active category object
  const [modalProduct, setModalProduct] = useState(null)
  const [filters, setFilters] = useState(EMPTY_FILTERS)
  const resultsRef = useRef(null)

  const filtered = useMemo(() => {
    const q = filters.query.trim().toLowerCase()
    const band = PRICE_BANDS.find((b) => b.id === filters.price) || PRICE_BANDS[0]
    return products.filter(
      (p) =>
        (!selected || p.category === selected.name) &&
        band.test(p) &&
        (filters.brand === 'all' || p.brand === filters.brand) &&
        (filters.movement === 'all' || p.movement.startsWith(filters.movement)) &&
        (filters.availability === 'all' || p.availability === filters.availability) &&
        (q === '' ||
          [p.brand, p.name, p.reference, p.movement, p.category, p.description]
            .join(' ')
            .toLowerCase()
            .includes(q)),
    )
  }, [selected, filters])

  const selectCategory = (cat) => {
    setSelected((cur) => (cur && cur.id === cat.id ? null : cat))
    requestAnimationFrame(() => {
      if (window.innerWidth < 992 && !selected) {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    })
  }

  const filterToCategory = (categoryName) => {
    const cat = categories.find((c) => c.name === categoryName)
    if (cat) setSelected(cat)
    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="products" className="section products-section" aria-labelledby="products-title">
      <div className="container">
        <div className="section-heading left">
          <p className="section-kicker">The Boutique</p>
          <h2 id="products-title" className="section-title">Our Collections</h2>
          <p className="section-lead">
            Genuine, publicly documented references — from Rolex sport icons to Japanese
            automatics and modern smartwatches. Filter by brand, movement, price or availability;
            every product is loaded dynamically from our JSON dataset.
          </p>
        </div>

        <div className="category-grid">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              cat={cat}
              isActive={selected?.id === cat.id}
              onSelect={selectCategory}
            />
          ))}
        </div>

        <FilterToolbar
          filters={filters}
          onChange={setFilters}
          resultCount={filtered.length}
          brands={brands}
          movements={movements}
          totalCount={products.length}
        />

        <div
          ref={resultsRef}
          className={`collection-results ${selected ? 'open' : ''}`}
          aria-live="polite"
        >
          {selected && (
            <div className="collection-panel">
              <div className="collection-header">
                <div>
                  <p className="section-kicker">{selected.tagline}</p>
                  <h3 className="subsection-title">{selected.name} Collection</h3>
                  <p className="collection-count">
                    {filtered.length} timepiece{filtered.length === 1 ? '' : 's'} ·{' '}
                    <span className="price-from">
                      from {currency(filtered.length ? Math.min(...filtered.map((p) => p.price)) : 0)}
                    </span>
                  </p>
                </div>
                <button
                  type="button"
                  className="btn btn-outline-light-lux btn-sm"
                  onClick={() => setSelected(null)}
                >
                  Close Collection
                </button>
              </div>

              {filtered.length > 0 ? (
                <div className="product-grid">
                  {filtered.map((p) => (
                    <ProductCard key={p.id} product={p} onView={setModalProduct} />
                  ))}
                </div>
              ) : (
                <div className="empty-note" role="status">
                  <ErrorIcon className="empty-icon" />
                  <p>No watches match this combination of category and filters. Try resetting the filters above.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {!selected && filtered.length > 0 && (
          <div className="product-grid all-products" aria-label="All watches in the catalogue">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} onView={setModalProduct} />
            ))}
          </div>
        )}

        <PriceList filters={filters} onFilterViaRow={filterToCategory} products={products} />
      </div>

      <ProductModal product={modalProduct} onClose={() => setModalProduct(null)} />
    </section>
  )
}
