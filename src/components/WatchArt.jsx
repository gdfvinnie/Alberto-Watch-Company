/**
 * ============================================================
 *  ALBERTO WATCH COMPANY — SVG ART LIBRARY
 * ============================================================
 *  Offline, dependency-free artwork used across the whole SPA:
 *  watch scenes for products/categories/gallery, brand logos,
 *  hero clock, category icons and small UI icons.
 *  Every component accepts standard SVG props (className, role,
 *  aria-label, ...) so each usage can supply its own alt text.
 * ============================================================
 */

/* ------------------------------ ICONS ------------------------------ */

export function BagIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M5 8h14l-1.2 12.2a1.8 1.8 0 0 1-1.8 1.8H8a1.8 1.8 0 0 1-1.8-1.8L5 8Z" />
      <path d="M8.5 10V6.5a3.5 3.5 0 0 1 7 0V10" />
    </svg>
  )
}

export function KeyIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <circle cx="8" cy="15" r="4" />
      <path d="m11 12 9-9" />
      <path d="m16 7 2.5 2.5" />
      <path d="m13.5 9.5 2 2" />
    </svg>
  )
}

export function ShieldIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M12 3l8 3v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3Z" />
      <path d="m9 12 2 2 4-4.5" />
    </svg>
  )
}

export function CrownIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M4.5 7.5 8 11l4-5.5L16 11l3.5-3.5V14a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2V7.5Zm0 10h15v1.8h-15V17.5Z" />
    </svg>
  )
}

export function ClockGlyph(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2.5" />
    </svg>
  )
}

export function PinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M12 21s-6.5-5.6-6.5-10.5a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21Z" />
      <circle cx="12" cy="10.5" r="2.3" />
    </svg>
  )
}

export function PhoneIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M5 4h4l1.5 4.5-2.2 1.7a12.8 12.8 0 0 0 5.5 5.5l1.7-2.2L20 15v4a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3 6.2 2 2 0 0 1 5 4Z" />
    </svg>
  )
}

export function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6.5 8.5 7 8.5-7" />
    </svg>
  )
}

export function ErrorIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5v5.5" />
      <circle cx="12" cy="16.5" r="0.6" fill="currentColor" />
    </svg>
  )
}

export function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="m4.5 12.5 5 5 10-11" />
    </svg>
  )
}

export function ChevronLeft(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="m14.5 6-6 6 6 6" />
    </svg>
  )
}

export function ChevronRight(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="m9.5 6 6 6-6 6" />
    </svg>
  )
}

/* --------------------------- SOCIAL ICONS -------------------------- */

export function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.6-1.5h1.3V4.9c-.3 0-1.1-.1-2.1-.1-2.1 0-3.6 1.3-3.6 3.8V11H8.3v3h2.4v7h2.8Z" />
    </svg>
  )
}

export function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true" {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function XIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M4 4h3.6l4.6 6.1L17 4h3l-6.2 7.7L20.5 20h-3.6l-4.9-6.5L6.8 20H4l6.5-8L4 4Z" />
    </svg>
  )
}

export function YouTubeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M21.6 7.2a2.6 2.6 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4a2.6 2.6 0 0 0-1.8 1.8A27 27 0 0 0 2 12a27 27 0 0 0 .4 4.8 2.6 2.6 0 0 0 1.8 1.8c1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4a2.6 2.6 0 0 0 1.8-1.8A27 27 0 0 0 22 12a27 27 0 0 0-.4-4.8ZM10 15.2V8.8L15.5 12 10 15.2Z" />
    </svg>
  )
}

/* ------------------------------ LOGOS ------------------------------ */

export function RolexLogo(props) {
  return (
    <svg viewBox="0 0 130 36" role="img" aria-label="Rolex" {...props}>
      <path d="M11 4.5 15.5 9 20 3l4.5 6L29 4.5V12H11V4.5Z" fill="currentColor" />
      <text x="2" y="31" fontFamily="'Playfair Display', serif" fontSize="21" fontWeight="700" letterSpacing="5" fill="currentColor">ROLEX</text>
    </svg>
  )
}

export function MichaelKorsLogo(props) {
  return (
    <svg viewBox="0 0 215 40" role="img" aria-label="Michael Kors" {...props}>
      <text x="6" y="31" fontFamily="'Playfair Display', serif" fontSize="32" fontWeight="700" fill="currentColor">M</text>
      <text x="38" y="31" fontFamily="'Playfair Display', serif" fontSize="32" fontWeight="700" fill="currentColor">K</text>
      <text x="76" y="26" fontFamily="'Jost', sans-serif" fontSize="13.5" letterSpacing="2.5" fill="currentColor">MICHAEL KORS</text>
    </svg>
  )
}

export function CitizenLogo(props) {
  return (
    <svg viewBox="0 0 130 36" role="img" aria-label="Citizen" {...props}>
      <rect x="2" y="8" width="26" height="20" rx="10" fill="none" stroke="currentColor" strokeWidth="2.4" />
      <circle cx="15" cy="18" r="5" fill="currentColor" />
      <text x="38" y="25.5" fontFamily="'Playfair Display', serif" fontSize="21" fontWeight="700" letterSpacing="2" fill="currentColor">CITIZEN</text>
    </svg>
  )
}

export function BulovaLogo(props) {
  return (
    <svg viewBox="0 0 130 36" role="img" aria-label="Bulova" {...props}>
      <path d="M12 8a10 10 0 0 1 10 10 10 10 0 0 1-10 10 10 10 0 0 1-10-10h20" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M12 4v6" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
      <text x="36" y="25.5" fontFamily="'Jost', sans-serif" fontSize="19" fontWeight="600" letterSpacing="4" fill="currentColor">BULOVA</text>
    </svg>
  )
}

export function OmegaLogo(props) {
  return (
    <svg viewBox="0 0 130 36" role="img" aria-label="Omega" {...props}>
      <path d="M15 30c-6.6 0-11-4.8-11-12S8.4 6 15 6s11 4.8 11 12-4.4 12-11 12Zm0-6.4c3 0 4.8-2.2 4.8-5.6s-1.8-5.6-4.8-5.6S10.2 14.6 10.2 18s1.8 5.6 4.8 5.6Z" fill="currentColor" />
      <text x="36" y="25.5" fontFamily="'Playfair Display', serif" fontSize="20" fontWeight="600" letterSpacing="3" fill="currentColor">OMEGA</text>
    </svg>
  )
}

export function TagHeuerLogo(props) {
  return (
    <svg viewBox="0 0 150 36" role="img" aria-label="TAG Heuer" {...props}>
      <path d="M14 10v16M8 10h12M8 18h9M8 26h12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <text x="32" y="25" fontFamily="'Jost', sans-serif" fontSize="17" fontWeight="600" letterSpacing="2" fill="currentColor">TAG HEUER</text>
    </svg>
  )
}

/* ------------------------ WATCH SCENE ART -------------------------- */
/* Each scene: dark radial backdrop + strap + crown + case + dial     */

function SceneBase({ children, ...props }) {
  return (
    <svg viewBox="0 0 640 480" preserveAspectRatio="xMidYMid slice" aria-hidden="true" {...props}>
      <defs>
        <radialGradient id="awc-bg" cx="50%" cy="38%" r="85%">
          <stop offset="0%" stopColor="#1c2438" />
          <stop offset="60%" stopColor="#0e1322" />
          <stop offset="100%" stopColor="#05070d" />
        </radialGradient>
        <radialGradient id="awc-spot" cx="50%" cy="30%" r="55%">
          <stop offset="0%" stopColor="#d4af37" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="640" height="480" fill="url(#awc-bg)" />
      <rect width="640" height="480" fill="url(#awc-spot)" />
      {children}
    </svg>
  )
}

function Strap({ topY, botY, cx, halfW, color, accent }) {
  const taper = (y) => halfW * (1 - Math.abs(y - 240) / 900)
  const path = `M ${cx - taper(topY)} ${topY} L ${cx + taper(topY)} ${topY} L ${cx + halfW} ${240 - 30} L ${cx - halfW} ${240 - 30} Z`
  const path2 = `M ${cx - halfW} ${240 + 30} L ${cx + halfW} ${240 + 30} L ${cx + taper(botY)} ${botY} L ${cx - taper(botY)} ${botY} Z`
  return (
    <g>
      <path d={path} fill={color} />
      <path d={path2} fill={color} />
      <rect x={cx - halfW} y={topY + 14} width={halfW * 2} height="3" fill={accent} opacity="0.35" rx="1.5" />
      <rect x={cx - halfW} y={topY + 30} width={halfW * 2} height="3" fill={accent} opacity="0.25" rx="1.5" />
      <rect x={cx - halfW} y={botY - 20} width={halfW * 2} height="3" fill={accent} opacity="0.35" rx="1.5" />
      <rect x={cx - halfW} y={botY - 36} width={halfW * 2} height="3" fill={accent} opacity="0.25" rx="1.5" />
    </g>
  )
}

function CaseAndDial({
  cx = 320,
  cy = 240,
  r = 128,
  caseFill,
  caseStroke,
  dialFill,
  dialStroke,
  indexColor,
  handColor,
  secondColor,
  subdial,
  crownTone = '#c9a227',
  dateWindow = false,
  bezelFill,
  skeleton,
}) {
  const ticks = []
  for (let i = 0; i < 12; i++) {
    const a = (i * 30 * Math.PI) / 180
    const x1 = cx + Math.sin(a) * (r * 0.78)
    const y1 = cy - Math.cos(a) * (r * 0.78)
    const x2 = cx + Math.sin(a) * (r * 0.88)
    const y2 = cy - Math.cos(a) * (r * 0.88)
    const w = i % 3 === 0 ? 7 : 3.5
    ticks.push(<line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={indexColor} strokeWidth={w} strokeLinecap="round" />)
  }
  return (
    <g>
      <circle cx={cx} cy={cy} r={r + 14} fill={caseFill} stroke={caseStroke} strokeWidth="3" />
      {bezelFill && <circle cx={cx} cy={cy} r={r - 4} fill="none" stroke={bezelFill} strokeWidth="14" />}
      <circle cx={cx} cy={cy} r={r - 12} fill={dialFill} stroke={dialStroke} strokeWidth="2" />
      {skeleton && (
        <>
          <circle cx={cx} cy={cy} r={r * 0.52} fill="none" stroke={indexColor} strokeWidth="1.6" opacity="0.6" />
          <circle cx={cx} cy={cy} r={r * 0.3} fill="none" stroke={indexColor} strokeWidth="1.2" opacity="0.5" />
          <path d={`M ${cx - r * 0.45} ${cy} H ${cx + r * 0.45} M ${cx} ${cy - r * 0.45} V ${cy + r * 0.45}`} stroke={indexColor} strokeWidth="1.1" opacity="0.5" />
          <circle cx={cx} cy={cy} r="7" fill={indexColor} opacity="0.85" />
        </>
      )}
      {subdial && (
        <>
          <circle cx={cx - r * 0.42} cy={cy + r * 0.1} r={r * 0.22} fill="none" stroke={indexColor} strokeWidth="1.6" />
          <line x1={cx - r * 0.42} y1={cy + r * 0.1} x2={cx - r * 0.32} y2={cy} stroke={indexColor} strokeWidth="2" strokeLinecap="round" />
          <circle cx={cx + r * 0.42} cy={cy + r * 0.1} r={r * 0.22} fill="none" stroke={indexColor} strokeWidth="1.6" />
          <line x1={cx + r * 0.42} y1={cy + r * 0.1} x2={cx + r * 0.52} y2={cy - r * 0.02} stroke={indexColor} strokeWidth="2" strokeLinecap="round" />
        </>
      )}
      {dateWindow !== false && (
        <>
          <rect x={cx + r * 0.5} y={cy - r * 0.16} width={r * 0.16} height={r * 0.3} rx="3" fill="#f4efe4" stroke={indexColor} strokeWidth="1.4" />
          <rect x={cx + r * 0.5 + 4} y={cy - r * 0.1} width={r * 0.1} height={r * 0.18} rx="1.5" fill={indexColor} opacity="0.85" />
        </>
      )}
      {ticks}
      <line x1={cx} y1={cy} x2={cx - r * 0.42} y2={cy + r * 0.28} stroke={handColor} strokeWidth="7" strokeLinecap="round" />
      <line x1={cx} y1={cy} x2={cx + r * 0.24} y2={cy - r * 0.58} stroke={handColor} strokeWidth="5.5" strokeLinecap="round" />
      <line x1={cx} y1={cy} x2={cx + r * 0.55} y2={cy + r * 0.3} stroke={secondColor || handColor} strokeWidth="2.2" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r="7.5" fill={handColor} stroke={secondColor || handColor} strokeWidth="2" />
      {/* crown */}
      <rect x={cx + r + 10} y={cy - 11} width="16" height="22" rx="4" fill={crownTone} />
      <rect x={cx + r + 13} y={cy - 7} width="10" height="14" rx="2" fill="rgba(0,0,0,0.25)" />
      {/* lugs */}
      <path d={`M ${cx - r * 0.62} ${cy - r - 8} L ${cx - r * 0.3} ${cy - r + 6} M ${cx + r * 0.62} ${cy - r - 8} L ${cx + r * 0.3} ${cy - r + 6}`} stroke={caseFill} strokeWidth="12" strokeLinecap="round" />
      <path d={`M ${cx - r * 0.62} ${cy + r + 8} L ${cx - r * 0.3} ${cy + r - 6} M ${cx + r * 0.62} ${cy + r + 8} L ${cx + r * 0.3} ${cy + r - 6}`} stroke={caseFill} strokeWidth="12" strokeLinecap="round" />
    </g>
  )
}

export function VintageChronometer(props) {
  return (
    <SceneBase {...props}>
      <Strap topY={-20} botY={500} cx={320} halfW={96} color="#241a10" accent="#c9a227" />
      <CaseAndDial
        caseFill="#d9c689"
        caseStroke="#8a6d1f"
        dialFill="#f3ecd8"
        dialStroke="#b7a469"
        indexColor="#3c3116"
        handColor="#2c2410"
        secondColor="#8a6d1f"
        dateWindow
      />
    </SceneBase>
  )
}

export function VintageDiver(props) {
  return (
    <SceneBase {...props}>
      <Strap topY={-20} botY={500} cx={320} halfW={104} color="#2b3a2d" accent="#7fae86" />
      <CaseAndDial
        caseFill="#b9c2c9"
        caseStroke="#5c6a75"
        dialFill="#122b1e"
        dialStroke="#2e4a38"
        indexColor="#d9e6dc"
        handColor="#e8f2ea"
        secondColor="#d05a3a"
        bezelFill="#2f573f"
      />
    </SceneBase>
  )
}

export function VintagePilot(props) {
  return (
    <SceneBase {...props}>
      <Strap topY={-20} botY={500} cx={320} halfW={100} color="#3a2a1c" accent="#c08a4e" />
      <CaseAndDial
        caseFill="#9aa3ab"
        caseStroke="#4d565e"
        dialFill="#2b2320"
        dialStroke="#4a3c33"
        indexColor="#e7d9c4"
        handColor="#f0e6d2"
        secondColor="#d0873a"
        subdial
      />
    </SceneBase>
  )
}

export function LuxuryTourbillon(props) {
  return (
    <SceneBase {...props}>
      <Strap topY={-20} botY={500} cx={320} halfW={92} color="#301b1b" accent="#d4af37" />
      <CaseAndDial
        caseFill="#e3b96d"
        caseStroke="#8f6a1c"
        dialFill="#241d10"
        dialStroke="#6b5518"
        indexColor="#ecd9a0"
        handColor="#f5e6b8"
        secondColor="#d4af37"
        skeleton
      />
    </SceneBase>
  )
}

export function LuxuryDress(props) {
  return (
    <SceneBase {...props}>
      <Strap topY={-20} botY={500} cx={320} halfW={98} color="#8a6a34" accent="#e6c877" />
      <CaseAndDial
        caseFill="#e8c568"
        caseStroke="#96731f"
        dialFill="#f6eddb"
        dialStroke="#c3a04f"
        indexColor="#5c4a17"
        handColor="#43350f"
        secondColor="#a8871f"
        subdial
        dateWindow={false}
      />
    </SceneBase>
  )
}

export function LuxuryMoonphase(props) {
  return (
    <SceneBase {...props}>
      <Strap topY={-20} botY={500} cx={320} halfW={94} color="#2c2136" accent="#b98fd4" />
      <CaseAndDial
        caseFill="#d9a9b8"
        caseStroke="#7d4b60"
        dialFill="#181430"
        dialStroke="#3c3260"
        indexColor="#e6d8f2"
        handColor="#f2e9fa"
        secondColor="#b98fd4"
      />
      <circle cx="320" cy="196" r="34" fill="#f1e8c8" opacity="0.92" />
      <circle cx="306" cy="188" r="9" fill="#d9cd9f" />
      <circle cx="332" cy="204" r="6" fill="#d9cd9f" />
    </SceneBase>
  )
}

export function SmartActive(props) {
  return (
    <SceneBase {...props}>
      <Strap topY={-20} botY={500} cx={320} halfW={100} color="#14181f" accent="#3ee6c1" />
      <rect x="216" y="132" width="208" height="216" rx="52" fill="#20262f" stroke="#414b58" strokeWidth="3" />
      <rect x="232" y="148" width="176" height="184" rx="42" fill="#0a0d12" />
      <path d="M248 300 Q320 200 392 288" stroke="#3ee6c1" strokeWidth="3" fill="none" />
      <path d="M248 312 Q320 236 392 300" stroke="#4f7cf7" strokeWidth="3" fill="none" opacity="0.8" />
      <text x="320" y="205" textAnchor="middle" fontFamily="'Jost', sans-serif" fontSize="44" fill="#f4f6f8">09:41</text>
      <text x="320" y="232" textAnchor="middle" fontFamily="'Jost', sans-serif" fontSize="15" fill="#8b95a3" letterSpacing="2">TUE 13 · SEPT</text>
      <circle cx="270" cy="258" r="5" fill="#3ee6c1" />
      <circle cx="300" cy="250" r="5" fill="#4f7cf7" />
      <circle cx="330" cy="244" r="5" fill="#f4b23e" />
      <circle cx="360" cy="242" r="5" fill="#f05d5d" />
      <rect x="420" y="222" width="10" height="36" rx="5" fill="#3a424d" />
      <circle cx="437" cy="240" r="9" fill="#e0452f" />
    </SceneBase>
  )
}

export function SmartClassic(props) {
  return (
    <SceneBase {...props}>
      <Strap topY={-20} botY={500} cx={320} halfW={96} color="#1a1d22" accent="#8f98a4" />
      <circle cx="320" cy="240" r="126" fill="#232830" stroke="#4a525d" strokeWidth="3" />
      <circle cx="320" cy="240" r="106" fill="#0b0e13" />
      <text x="320" y="225" textAnchor="middle" fontFamily="'Jost', sans-serif" fontSize="40" fill="#f0f2f5">10:08</text>
      <text x="320" y="252" textAnchor="middle" fontFamily="'Jost', sans-serif" fontSize="13" fill="#9aa4b1" letterSpacing="3">TUESDAY, SEPTEMBER</text>
      <rect x="282" y="272" width="36" height="30" rx="7" fill="#171c23" stroke="#2c333d" />
      <rect x="324" y="272" width="36" height="30" rx="7" fill="#171c23" stroke="#2c333d" />
      <text x="300" y="292" textAnchor="middle" fontSize="14" fill="#3ee6c1">♥</text>
      <text x="342" y="292" textAnchor="middle" fontSize="13" fill="#4f7cf7">98</text>
      <path d="M262 310 Q320 292 378 310" stroke="#2f3a49" strokeWidth="2" fill="none" />
      <rect x="441" y="228" width="11" height="24" rx="4" fill="#3a424d" />
      <circle cx="433" cy="240" r="26" fill="none" stroke="#313a46" strokeWidth="10" />
    </SceneBase>
  )
}

export function SmartHybrid(props) {
  return (
    <SceneBase {...props}>
      <Strap topY={-20} botY={500} cx={320} halfW={98} color="#2a2018" accent="#9db7c9" />
      <CaseAndDial
        caseFill="#aab6bf"
        caseStroke="#54606b"
        dialFill="#e9eef2"
        dialStroke="#9fb0bd"
        indexColor="#37424c"
        handColor="#2b333c"
        secondColor="#3f7fc2"
      />
      <rect x="320" y="284" width="86" height="20" rx="10" fill="#12202e" opacity="0.9" />
      <text x="363" y="299" textAnchor="middle" fontFamily="'Jost', sans-serif" fontSize="12" fill="#9fd6ff" letterSpacing="1">ECO-DRIVE</text>
    </SceneBase>
  )
}

export function SportDiver(props) {
  return (
    <SceneBase {...props}>
      <Strap topY={-20} botY={500} cx={320} halfW={106} color="#16202c" accent="#4f7cf7" />
      <CaseAndDial
        caseFill="#8e979f"
        caseStroke="#454e57"
        dialFill="#0e1c2e"
        dialStroke="#24405e"
        indexColor="#dfe9f5"
        handColor="#eef4fb"
        secondColor="#4f7cf7"
        bezelFill="#1d3a5f"
      />
    </SceneBase>
  )
}

export function SportPilot(props) {
  return (
    <SceneBase {...props}>
      <Strap topY={-20} botY={500} cx={320} halfW={102} color="#1d1f24" accent="#f4b23e" />
      <CaseAndDial
        caseFill="#a7adb3"
        caseStroke="#4b5157"
        dialFill="#1c1f26"
        dialStroke="#343941"
        indexColor="#f2e9d4"
        handColor="#f7f0dd"
        secondColor="#f4b23e"
        subdial
      />
    </SceneBase>
  )
}

export function SportRacing(props) {
  return (
    <SceneBase {...props}>
      <Strap topY={-20} botY={500} cx={320} halfW={100} color="#101318" accent="#f05d5d" />
      <CaseAndDial
        caseFill="#9aa2a9"
        caseStroke="#474e55"
        dialFill="#15181f"
        dialStroke="#2b3140"
        indexColor="#eceef2"
        handColor="#f4f6f9"
        secondColor="#f05d5d"
        subdial
        bezelFill="#28324a"
      />
    </SceneBase>
  )
}

export function EverydayEco(props) {
  return (
    <SceneBase {...props}>
      <Strap topY={-20} botY={500} cx={320} halfW={94} color="#3a2f22" accent="#c8a468" />
      <CaseAndDial
        caseFill="#c2c9cf"
        caseStroke="#5b646d"
        dialFill="#f4f6f2"
        dialStroke="#b9c1b4"
        indexColor="#3c453e"
        handColor="#2e372f"
        secondColor="#c8912f"
      />
    </SceneBase>
  )
}

export function EverydayDaydate(props) {
  return (
    <SceneBase {...props}>
      <Strap topY={-20} botY={500} cx={320} halfW={96} color="#d7c9a8" accent="#b3924d" />
      <CaseAndDial
        caseFill="#d9c078"
        caseStroke="#8d7526"
        dialFill="#f7f1e0"
        dialStroke="#c8ad68"
        indexColor="#54441c"
        handColor="#3e3312"
        secondColor="#a8871f"
      />
    </SceneBase>
  )
}

export function EverydayMini(props) {
  return (
    <SceneBase {...props}>
      <Strap topY={-20} botY={500} cx={320} halfW={88} color="#d8b7b0" accent="#c99a8f" />
      <CaseAndDial
        caseFill="#e4b7ad"
        caseStroke="#96655a"
        dialFill="#faf3ef"
        dialStroke="#d0a99f"
        indexColor="#6b4a42"
        handColor="#54372f"
        secondColor="#c98a7d"
      />
    </SceneBase>
  )
}

export function EverydayField(props) {
  return (
    <SceneBase {...props}>
      <Strap topY={-20} botY={500} cx={320} halfW={98} color="#4b4433" accent="#a89a6d" />
      <CaseAndDial
        caseFill="#9aa1a7"
        caseStroke="#4a5157"
        dialFill="#22261f"
        dialStroke="#3c4238"
        indexColor="#e6e2d2"
        handColor="#f0ecdc"
        secondColor="#a89a6d"
      />
    </SceneBase>
  )
}

export function ClassicSlim(props) {
  return (
    <SceneBase {...props}>
      <Strap topY={-20} botY={500} cx={320} halfW={90} color="#26221c" accent="#cbb277" />
      <CaseAndDial
        caseFill="#d5d9dd"
        caseStroke="#6a7078"
        dialFill="#f2f1ea"
        dialStroke="#b9b9ad"
        indexColor="#42413a"
        handColor="#33322c"
        secondColor="#a8871f"
      />
    </SceneBase>
  )
}

export function ClassicOpenheart(props) {
  return (
    <SceneBase {...props}>
      <Strap topY={-20} botY={500} cx={320} halfW={94} color="#2e2a24" accent="#b5a48a" />
      <CaseAndDial
        caseFill="#b7bdc2"
        caseStroke="#565c62"
        dialFill="#20242b"
        dialStroke="#3a4049"
        indexColor="#dfe3e8"
        handColor="#eef1f4"
        secondColor="#c9a227"
      />
      <circle cx="274" cy="216" r="30" fill="none" stroke="#c9a227" strokeWidth="2" />
      <path d="M274 216 L274 196 M274 216 L290 224" stroke="#c9a227" strokeWidth="2.4" strokeLinecap="round" />
    </SceneBase>
  )
}

export function ClassicRoman(props) {
  return (
    <SceneBase {...props}>
      <Strap topY={-20} botY={500} cx={320} halfW={92} color="#33261c" accent="#c0935c" />
      <CaseAndDial
        caseFill="#c6ccd1"
        caseStroke="#5d646b"
        dialFill="#f6f3ec"
        dialStroke="#bcb4a2"
        indexColor="#3f3a2e"
        handColor="#2f2b22"
        secondColor="#c0935c"
      />
      <text x="320" y="164" textAnchor="middle" fontFamily="'Playfair Display', serif" fontSize="26" fill="#3f3a2e">XII</text>
      <text x="320" y="336" textAnchor="middle" fontFamily="'Playfair Display', serif" fontSize="26" fill="#3f3a2e">VI</text>
      <text x="216" y="252" textAnchor="middle" fontFamily="'Playfair Display', serif" fontSize="24" fill="#3f3a2e">IX</text>
      <text x="424" y="252" textAnchor="middle" fontFamily="'Playfair Display', serif" fontSize="24" fill="#3f3a2e">III</text>
    </SceneBase>
  )
}

/* --------------------------- HERO ART ------------------------------ */

export function HeroWatch(props) {
  return (
    <SceneBase {...props}>
      <circle cx="470" cy="120" r="150" fill="#d4af37" opacity="0.05" />
      <circle cx="150" cy="380" r="190" fill="#d4af37" opacity="0.04" />
      <Strap topY={-20} botY={500} cx={320} halfW={110} color="#22180c" accent="#d4af37" />
      <circle cx="320" cy="240" r="150" fill="#e8c568" opacity="0.14" />
      <CaseAndDial
        cx={320}
        cy={240}
        r={138}
        caseFill="#e3b96d"
        caseStroke="#8f6a1c"
        dialFill="#1d1712"
        dialStroke="#6b5518"
        indexColor="#f0dfae"
        handColor="#f7ecc8"
        secondColor="#d4af37"
        subdial
        bezelFill="#a8871f"
      />
      <text x="320" y="196" textAnchor="middle" fontFamily="'Playfair Display', serif" fontSize="26" letterSpacing="6" fill="#d4af37">ALBERTO</text>
      <text x="320" y="222" textAnchor="middle" fontFamily="'Jost', sans-serif" fontSize="11" letterSpacing="4" fill="#9a8a5e">AUTOMATIC · SINCE 1958</text>
    </SceneBase>
  )
}

export function WorkshopScene(props) {
  return (
    <SceneBase {...props}>
      <rect x="60" y="70" width="520" height="340" rx="18" fill="#0d111c" stroke="#232b3d" strokeWidth="2" />
      <rect x="90" y="110" width="230" height="150" rx="10" fill="#131a29" stroke="#2b3550" />
      <circle cx="205" cy="185" r="52" fill="none" stroke="#d4af37" strokeWidth="2.4" />
      <circle cx="205" cy="185" r="34" fill="none" stroke="#8f7429" strokeWidth="1.6" />
      <path d="M205 145v18M205 207v18M165 185h18M227 185h18" stroke="#d4af37" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="205" cy="185" r="5" fill="#d4af37" />
      <rect x="340" y="110" width="210" height="150" rx="10" fill="#131a29" stroke="#2b3550" />
      <path d="M370 230 L415 150 L445 210 L470 165 L505 230" stroke="#4f7cf7" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="415" cy="150" r="4" fill="#4f7cf7" />
      <circle cx="445" cy="210" r="4" fill="#4f7cf7" />
      <circle cx="470" cy="165" r="4" fill="#4f7cf7" />
      <rect x="90" y="280" width="460" height="100" rx="10" fill="#111624" stroke="#2b3550" />
      <circle cx="150" cy="330" r="24" fill="none" stroke="#d4af37" strokeWidth="2" />
      <circle cx="210" cy="330" r="18" fill="none" stroke="#8f98a4" strokeWidth="2" />
      <path d="M250 345 Q290 305 330 345" stroke="#3ee6c1" strokeWidth="2.2" fill="none" />
      <rect x="360" y="312" width="150" height="36" rx="8" fill="#1a2135" stroke="#2b3550" />
      <text x="435" y="336" textAnchor="middle" fontFamily="'Jost', sans-serif" fontSize="14" fill="#8b95a3" letterSpacing="2">REPAIR LAB</text>
    </SceneBase>
  )
}
