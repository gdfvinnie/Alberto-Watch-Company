/**
 * Round 3: movement / craftsmanship imagery + Daytona metadata check.
 * Usage: node scripts/commons-search.mjs
 */
const API = 'https://commons.wikimedia.org/w/api.php'
const HEADERS = {
  'User-Agent': 'AlbertoWatchAcademicProject/1.0 (school demo; contact: info@albertowatchcompany.com)',
}

const QUERIES = [
  'mechanical watch movement',
  'watchmaker',
  'tourbillon',
  'watch gears',
  'ETA movement watch',
  'chronograph movement skeleton',
]

async function search(q) {
  const url = new URL(API)
  url.search = new URLSearchParams({
    action: 'query',
    format: 'json',
    generator: 'search',
    gsrsearch: `filetype:bitmap ${q}`,
    gsrnamespace: '6',
    gsrlimit: '6',
    prop: 'imageinfo',
    iiprop: 'url|size|extmetadata',
    iiurlwidth: '1200',
  }).toString()
  const res = await fetch(url, { headers: HEADERS })
  if (!res.ok) return []
  const data = await res.json()
  const pages = data?.query?.pages ? Object.values(data.query.pages) : []
  return pages
    .filter((p) => p.imageinfo?.[0])
    .map((p) => {
      const ii = p.imageinfo[0]
      const md = ii.extmetadata || {}
      return {
        title: p.title?.replace('File:', ''),
        w: ii.width,
        h: ii.height,
        license: md.LicenseShortName?.value || '?',
        url: ii.thumburl || ii.url,
      }
    })
}

for (const q of QUERIES) {
  const results = await search(q)
  console.log(`\n=== ${q} ===`)
  for (const r of results) {
    console.log(`  [${r.w}x${r.h}] (${r.license}) ${r.title}`)
    console.log(`      ${r.url}`)
  }
  if (!results.length) console.log('  (no results)')
  await new Promise((r) => setTimeout(r, 350))
}

// Dump descriptions for the ambiguous Daytona / Datejust photos
const TITLES = [
  'File:Daytona116509.jpg',
  'File:Rolex Daytona Cosmograph.jpg',
  'File:Rolex Cosmograph Daytona.png',
  'File:Rolex Datejust II 116334 - 1.jpg',
  'File:Bulova-96c23.jpg',
  'File:Michael Kors Slim Runway Thin Bracelet Stainless Watch MK3211.JPG',
  'File:Rolex GMT Master II - 16710 (without background).jpg',
  'File:Rolex Oyster Perpetual Date Submariner Watch.JPG',
]
console.log('\n=== FILE DESCRIPTIONS ===')
const url2 = new URL(API)
url2.search = new URLSearchParams({
  action: 'query',
  format: 'json',
  titles: TITLES.join('|'),
  prop: 'imageinfo',
  iiprop: 'extmetadata',
}).toString()
const res2 = await fetch(url2, { headers: HEADERS })
const data2 = await res2.json()
for (const page of Object.values(data2?.query?.pages || {})) {
  const md = page.imageinfo?.[0]?.extmetadata || {}
  const desc = (md.ImageDescription?.value || '').replace(/<[^>]+>/g, '').slice(0, 220)
  console.log(`\n${page.title}\n  ${desc}`)
}
