/**
 * Fetches author + license metadata for every image in public/img from the
 * Wikimedia Commons API (matched by exact file title) and writes
 * public/img/CREDITS.json plus a human-readable credits table.
 *
 * Usage: node scripts/fetch-credits.mjs
 */
import { readdir, writeFile } from 'node:fs/promises'

const API = 'https://commons.wikimedia.org/w/api.php'
const HEADERS = {
  'User-Agent': 'AlbertoWatchAcademicProject/1.0 (school demo; contact: info@albertowatchcompany.com)',
}

/* local file -> Commons File: title it was downloaded from */
const SOURCE_MAP = {
  'submariner.jpg': 'File:Rolex Oyster Perpetual Date Submariner Watch.JPG',
  'gmt-batman.jpg': 'File:Rolex GMT Master II 116710BLNR Batman.jpg',
  'daytona-116509.jpg': 'File:Daytona116509.jpg',
  'daydate.jpg': 'File:Rolex Day Date.jpg',
  'seadweller.jpg': 'File:Rolex Sea Dweller 16600.jpg',
  'yachtmaster.jpg': 'File:Rolex Yachtmaster II 116680.JPG',
  'promaster.jpg': "File:Citizen Promaster Eco-Drive AP0440-14F Diver's 200 m on a Citizen bracelet.JPG",
  'turtle.jpg': 'File:Modern Monday seiko turtle divewatch srp.jpg',
  'gmt-16710.jpg': 'File:Rolex GMT Master II - 16710 (without background).jpg',
  'speedmaster.jpg': 'File:Vintage Omega Speedmaster "Pre-moon".jpg',
  'seiko7002.jpg': "File:Seiko 7002-7020 Diver's 200 m on a 4-ring NATO style strap.JPG",
  'amphibia.jpg': 'File:VOSTOK AMPHIBIA.jpg',
  'datejust.jpg': 'File:Rolex Datejust II 116334 - 1.jpg',
  'bambino.jpg': 'File:Orient Watch - Bambino (ER24005W) (29121883374).jpg',
  'ambassador.jpg': 'File:Bulova Ambassador Automatic.jpg',
  'mk-slimrunway.jpg': 'File:Michael Kors Slim Runway Thin Bracelet Stainless Watch MK3211.JPG',
  'applewatch7.jpg': 'File:Apple Watch Series 7; January 2022 (01).jpg',
  'applewatch-ultra.jpg': 'File:Apple Watch Ultra - 3.jpg',
  'galaxywatch.jpg': 'File:SAMSUNG Galaxy Watch (3).jpg',
  'fenix.jpg': 'File:Garmin Fenix 6x Pro Solar.jpg',
  'ga100.jpg': 'File:Casio G-Shock GA-100, digital and analog watch (from 2010, photographed in 2023).jpg',
  'prx.jpg': 'File:Tissot PRX 35mm.jpg',
  'snk809.jpg': 'File:Seiko SNK809.jpg',
  'expedition.jpg': 'File:Timex Expedition Scout.jpg',
  'daytona-wrist.png': 'File:Rolex Cosmograph Daytona.png',
  'submariner-diving.jpg': 'File:Rolex Submariner diving watch.jpg',
  'rolex-pair.jpg': 'File:Rolex Submariner and GMT Master II.jpg',
  'galaxy5.jpg': 'File:SAMSUNG Galaxy Watch (5).jpg',
  'watchmaking.jpg': 'File:Watchmaking skills.jpg',
  'elgin.jpg': 'File:Elgin watchmaker.jpg',
  'eta2801.jpg': 'File:ETA 2801 mechanical watch movement.jpg',
  'tourbillon.jpg': 'File:Image-Greubel Forsey Tourbillon 24 Secondes Incline.jpg',
  'crown2.jpg': 'File:Crown on mechanical watch - detailed view 2.jpeg',
  'quartz-mech.jpg': 'File:Quartz Watch Mechanism Closeup.jpg',
  'eta955.jpg': 'File:ETA-ESA 955.114 movement, front.jpg',
  'manistee.jpg': 'File:Manistee watch many gear works.jpg',
  'chronoswiss.jpg': 'File:Chronoswiss Opus.JPG',
  'rolex-store.jpg': 'File:Rolex-store-helsinki-12-2018.jpg',
  'apple-demo.jpg': 'File:Apple Watch Demo.jpg',
  'daytona-pushers.jpg': 'File:Detailed view on chronograph pushers and crown of wristwatch Rolex Daytona (cropped).jpg',
  'crown1.jpg': 'File:Crown on mechanical watch - detailed view.jpg',
  'hevalve.jpg': 'File:He release valve seadweller.jpg',
}

const strip = (html) => (html || '').replace(/<[^>]+>/g, '').trim()

const files = (await readdir('public/img')).filter((f) => /\.(jpe?g|png)$/i.test(f))
const titles = files.map((f) => SOURCE_MAP[f]).filter(Boolean)

const credits = {}
for (let i = 0; i < titles.length; i += 20) {
  const batch = titles.slice(i, i + 20)
  const url = new URL(API)
  url.search = new URLSearchParams({
    action: 'query',
    format: 'json',
    titles: batch.join('|'),
    prop: 'imageinfo',
    iiprop: 'extmetadata|url',
  }).toString()
  const res = await fetch(url, { headers: HEADERS })
  const data = await res.json()
  for (const page of Object.values(data?.query?.pages || {})) {
    const md = page.imageinfo?.[0]?.extmetadata || {}
    const title = page.title
    const local = Object.keys(SOURCE_MAP).find((k) => SOURCE_MAP[k] === title)
    credits[local || title] = {
      commonsTitle: title,
      author: strip(md.Artist?.value) || 'Unknown',
      license: md.LicenseShortName?.value || 'See Commons',
      licenseUrl: md.LicenseUrl?.value || '',
      credit: strip(md.Credit?.value) || '',
    }
    await new Promise((r) => setTimeout(r, 80))
  }
  await new Promise((r) => setTimeout(r, 200))
}

await writeFile('public/img/CREDITS.json', JSON.stringify(credits, null, 2))

let md = '# Photography credits\n\nAll photographs are sourced from Wikimedia Commons.\n'
for (const [local, c] of Object.entries(credits)) {
  md += `- \`${local}\` — ${c.commonsTitle} by ${c.author} (${c.license})\n`
}
await writeFile('IMAGE-CREDITS.md', md)
console.log(`Wrote credits for ${Object.keys(credits).length} images.`)
const missing = files.filter((f) => !credits[f])
if (missing.length) console.log('Missing credit for:', missing.join(', '))
