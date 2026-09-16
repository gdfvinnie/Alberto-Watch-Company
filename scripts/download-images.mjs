/**
 * Downloads all product / gallery photography from Wikimedia Commons
 * (public domain / CC-BY / CC-BY-SA licensed files only) into public/img/.
 * Verifies every download is a real image before reporting success.
 *
 * Usage: node scripts/download-images.mjs
 */
import { writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'

const OUT = 'public/img'
const HEADERS = {
  'User-Agent': 'AlbertoWatchAcademicProject/1.0 (school demo; contact: info@albertowatchcompany.com)',
}

const FILES = {
  /* ---------------------------- products ---------------------------- */
  'submariner.jpg': 'https://upload.wikimedia.org/wikipedia/commons/7/72/Rolex_Oyster_Perpetual_Date_Submariner_Watch.JPG',
  'gmt-batman.jpg': 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Rolex_GMT_Master_II_116710BLNR_Batman.jpg',
  'daytona-116509.jpg': 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Daytona116509.jpg',
  'daydate.jpg': 'https://upload.wikimedia.org/wikipedia/commons/1/18/Rolex_Day_Date.jpg',
  'seadweller.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Rolex_Sea_Dweller_16600.jpg/1280px-Rolex_Sea_Dweller_16600.jpg',
  'yachtmaster.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Rolex_Yachtmaster_II_116680.JPG/1280px-Rolex_Yachtmaster_II_116680.JPG',
  'promaster.jpg': "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Citizen_Promaster_Eco-Drive_AP0440-14F_Diver%27s_200_m_on_a_Citizen_bracelet.JPG/1280px-Citizen_Promaster_Eco-Drive_AP0440-14F_Diver%27s_200_m_on_a_Citizen_bracelet.JPG",
  'turtle.jpg': 'https://upload.wikimedia.org/wikipedia/commons/8/80/Modern_Monday_seiko_turtle_divewatch_srp.jpg',
  'gmt-16710.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Rolex_GMT_Master_II_-_16710_%28without_background%29.jpg/1280px-Rolex_GMT_Master_II_-_16710_%28without_background%29.jpg',
  'speedmaster.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Vintage_Omega_Speedmaster_%22Pre-moon%22.jpg/1280px-Vintage_Omega_Speedmaster_%22Pre-moon%22.jpg',
  'seiko7002.jpg': "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Seiko_7002-7020_Diver%27s_200_m_on_a_4-ring_NATO_style_strap.JPG/1280px-Seiko_7002-7020_Diver%27s_200_m_on_a_4-ring_NATO_style_strap.JPG",
  'amphibia.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/VOSTOK_AMPHIBIA.jpg/1280px-VOSTOK_AMPHIBIA.jpg',
  'datejust.jpg': 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Rolex_Datejust_II_116334_-_1.jpg',
  'bambino.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Orient_Watch_-_Bambino_%28ER24005W%29_%2829121883374%29.jpg/1280px-Orient_Watch_-_Bambino_%28ER24005W%29_%2829121883374%29.jpg',
  'ambassador.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Bulova_Ambassador_Automatic.jpg/1280px-Bulova_Ambassador_Automatic.jpg',
  'mk-slimrunway.jpg': 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Michael_Kors_Slim_Runway_Thin_Bracelet_Stainless_Watch_MK3211.JPG',
  'applewatch7.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Apple_Watch_Series_7%3B_January_2022_%2801%29.jpg/1280px-Apple_Watch_Series_7%3B_January_2022_%2801%29.jpg',
  'applewatch-ultra.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Apple_Watch_Ultra_-_3.jpg/1280px-Apple_Watch_Ultra_-_3.jpg',
  'galaxywatch.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/SAMSUNG_Galaxy_Watch_%283%29.jpg/1280px-SAMSUNG_Galaxy_Watch_%283%29.jpg',
  'fenix.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Garmin_Fenix_6x_Pro_Solar.jpg/1280px-Garmin_Fenix_6x_Pro_Solar.jpg',
  'ga100.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Casio_G-Shock_GA-100%2C_digital_and_analog_watch_%28from_2010%2C_photographed_in_2023%29.jpg/1280px-Casio_G-Shock_GA-100%2C_digital_and_analog_watch_%28from_2010%2C_photographed_in_2023%29.jpg',
  'prx.jpg': 'https://upload.wikimedia.org/wikipedia/commons/3/39/Tissot_PRX_35mm.jpg',
  'snk809.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Seiko_SNK809.jpg/1280px-Seiko_SNK809.jpg',
  'expedition.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Timex_Expedition_Scout.jpg/1280px-Timex_Expedition_Scout.jpg',
  /* ---------------------------- gallery ----------------------------- */
  'daytona-wrist.png': 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Rolex_Cosmograph_Daytona.png',
  'submariner-diving.jpg': 'https://upload.wikimedia.org/wikipedia/commons/2/27/Rolex_Submariner_diving_watch.jpg',
  'rolex-pair.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Rolex_Submariner_and_GMT_Master_II.jpg/1280px-Rolex_Submariner_and_GMT_Master_II.jpg',
  'galaxy5.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/SAMSUNG_Galaxy_Watch_%285%29.jpg/1280px-SAMSUNG_Galaxy_Watch_%285%29.jpg',
  'watchmaking.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Watchmaking_skills.jpg/1280px-Watchmaking_skills.jpg',
  'elgin.jpg': 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Elgin_watchmaker.jpg',
  'eta2801.jpg': 'https://upload.wikimedia.org/wikipedia/commons/2/29/ETA_2801_mechanical_watch_movement.jpg',
  'tourbillon.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Image-Greubel_Forsey_Tourbillon_24_Secondes_Incline.jpg/1280px-Image-Greubel_Forsey_Tourbillon_24_Secondes_Incline.jpg',
  'crown2.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Crown_on_mechanical_watch_-_detailed_view_2.jpeg/1280px-Crown_on_mechanical_watch_-_detailed_view_2.jpeg',
  'quartz-mech.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Quartz_Watch_Mechanism_Closeup.jpg/1280px-Quartz_Watch_Mechanism_Closeup.jpg',
  'eta955.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/ETA-ESA_955.114_movement%2C_front.jpg/1280px-ETA-ESA_955.114_movement%2C_front.jpg',
  'manistee.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Manistee_watch_many_gear_works.jpg/1280px-Manistee_watch_many_gear_works.jpg',
  'chronoswiss.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Chronoswiss_Opus.JPG/1280px-Chronoswiss_Opus.JPG',
  'rolex-store.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Rolex-store-helsinki-12-2018.jpg/1280px-Rolex-store-helsinki-12-2018.jpg',
  'apple-demo.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Apple_Watch_Demo.jpg/1280px-Apple_Watch_Demo.jpg',
  'daytona-pushers.jpg': 'https://upload.wikimedia.org/wikipedia/commons/1/16/Detailed_view_on_chronograph_pushers_and_crown_of_wristwatch_Rolex_Daytona_%28cropped%29.jpg',
  'crown1.jpg': 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Crown_on_mechanical_watch_-_detailed_view.jpg',
  'hevalve.jpg': 'https://upload.wikimedia.org/wikipedia/commons/0/04/He_release_valve_seadweller.jpg',
}

function sniff(buf) {
  if (buf.length < 12) return 'unknown'
  if (buf[0] === 0xff && buf[1] === 0xd8) return 'jpeg'
  if (buf[0] === 0x89 && buf[1] === 0x50) return 'png'
  if (buf.slice(0, 4).toString() === 'RIFF') return 'webp'
  return 'unknown'
}

await mkdir(OUT, { recursive: true })

const failures = []
let ok = 0
for (const [name, url] of Object.entries(FILES)) {
  try {
    const res = await fetch(url, { headers: HEADERS })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const buf = Buffer.from(await res.arrayBuffer())
    const kind = sniff(buf)
    if (kind === 'unknown' || buf.length < 6000) {
      throw new Error(`not a valid image (${kind}, ${buf.length} bytes)`)
    }
    await writeFile(path.join(OUT, name), buf)
    console.log(`OK   ${name.padEnd(22)} ${(buf.length / 1024).toFixed(0).padStart(5)} KB  ${kind}`)
    ok += 1
  } catch (err) {
    failures.push({ name, url, error: err.message })
    console.log(`FAIL ${name.padEnd(22)} ${err.message}`)
  }
  await new Promise((r) => setTimeout(r, 300))
}

console.log(`\n${ok}/${Object.keys(FILES).length} images downloaded.`)
if (failures.length) {
  console.log('\nFailures:')
  for (const f of failures) console.log(`  ${f.name}: ${f.error}\n    ${f.url}`)
  process.exitCode = 1
}
