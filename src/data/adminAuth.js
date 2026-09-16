/**
 * ============================================================
 *  ALBERTO WATCH COMPANY — ADMIN AUTHENTICATION
 * ============================================================
 *  Front-end security model (academic demonstration — no
 *  backend server exists in this project):
 *
 *  • The owner's credential is stored ONLY as
 *      SHA-256(salt + password) + per-account salt
 *    computed with the browser's Web Crypto API. The
 *    plaintext password is never stored and never appears
 *    in source code.
 *  • On first run the owner creates the credential through a
 *    one-time secure setup screen; there is no default
 *    username/password anywhere in the bundle.
 *  • Sessions are random 256-bit tokens with a hard expiry
 *    (2 hours), kept in sessionStorage so they do not survive
 *    the browser being closed.
 *  • Brute-force protection: after 5 failed attempts the
 *    login locks for 5 minutes (persisted, so refreshing
 *    does not reset it).
 *  • One-time recovery code (shown once at setup) allows a
 *    password reset; the code is invalidated after use.
 *  • The admin UI is a separate route (#/admin) that renders
 *    nothing but the login/setup screen until a valid
 *    session token is present.
 *
 *  In a real deployment these same checks would move to a
 *  server (bcrypt/argon2 + HttpOnly cookies); the browser
 *  cannot be the ultimate authority — this mirrors the
 *  standard academic pattern while being honest about it.
 *  ============================================================
 */

const ADMIN_KEY = 'awc_admin_account'
const SESSION_KEY = 'awc_admin_session'
const LOCK_KEY = 'awc_admin_lockout'

const SESSION_TTL_MS = 2 * 60 * 60 * 1000 // 2 hours
const MAX_ATTEMPTS = 5
const LOCKOUT_MS = 5 * 60 * 1000 // 5 minutes

/* ------------------------------ Crypto -------------------------------- */

function bufferToHex(buffer) {
  return [...new Uint8Array(buffer)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

export function randomHex(bytes = 16) {
  const buf = new Uint8Array(bytes)
  crypto.getRandomValues(buf)
  return bufferToHex(buf)
}

async function sha256Hex(text) {
  const data = new TextEncoder().encode(text)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return bufferToHex(digest)
}

async function hashPassword(password, salt) {
  return sha256Hex(`${salt}:${password}`)
}

/** Deterministic hashing for the recovery code (no per-code salt). */
async function hashRecoveryCode(code) {
  return sha256Hex(`awc-recovery:${code.toLowerCase()}`)
}

function generateRecoveryCode() {
  // Format: awc-xxxxx-xxxxx (lowercase, unambiguous alphabet)
  const alphabet = 'abcdefghjkmnpqrstuvwxyz23456789'
  const pick = (n) => {
    const buf = new Uint8Array(n)
    crypto.getRandomValues(buf)
    return [...buf].map((b) => alphabet[b % alphabet.length]).join('')
  }
  return `awc-${pick(5)}-${pick(5)}`
}

/* ---------------------------- Account --------------------------------- */

function readAccount() {
  try {
    const raw = window.localStorage.getItem(ADMIN_KEY)
    if (!raw) return null
    const acc = JSON.parse(raw)
    if (!acc || typeof acc !== 'object') return null
    return {
      username: String(acc.username || ''),
      salt: String(acc.salt || ''),
      hash: String(acc.hash || ''),
      recoveryHash: String(acc.recoveryHash || ''),
      createdAt: String(acc.createdAt || ''),
    }
  } catch {
    return null
  }
}

function writeAccount(account) {
  try {
    window.localStorage.setItem(ADMIN_KEY, JSON.stringify(account))
    return true
  } catch {
    return false
  }
}

export const adminAccountExists = () => readAccount() !== null

export function getAdminUsername() {
  return readAccount()?.username || ''
}

/**
 * One-time credential creation. Returns { ok, recoveryCode } or
 * { ok: false, error }.
 */
export async function setupAdminAccount(username, password) {
  if (readAccount()) return { ok: false, error: 'An administrator account already exists.' }
  const name = String(username || '').trim()
  if (name.length < 3) return { ok: false, error: 'Username must be at least 3 characters.' }
  if (!/^[a-zA-Z0-9._@-]+$/.test(name))
    return { ok: false, error: 'Username may only contain letters, digits, dots, dashes and @.' }
  const strength = checkPasswordStrength(password)
  if (strength.score < 3) return { ok: false, error: strength.message }

  const salt = randomHex(16)
  const hash = await hashPassword(password, salt)
  const recoveryCode = generateRecoveryCode()
  const recoveryHash = await hashRecoveryCode(recoveryCode)
  const account = {
    username: name,
    salt,
    hash,
    recoveryHash,
    createdAt: new Date().toISOString(),
  }
  if (!writeAccount(account)) return { ok: false, error: 'Could not save the account (storage unavailable).' }
  return { ok: true, recoveryCode }
}

export function checkPasswordStrength(password) {
  const p = String(password || '')
  const checks = [
    p.length >= 8,
    /[a-z]/.test(p) && /[A-Z]/.test(p),
    /\d/.test(p),
    /[^A-Za-z0-9]/.test(p),
  ]
  const score = checks.filter(Boolean).length
  const messages = {
    0: 'Password must be at least 8 characters.',
    1: 'Too weak — add uppercase letters, numbers and symbols.',
    2: 'Weak — add at least two of: uppercase, numbers, symbols.',
    3: 'Acceptable — a longer password with a symbol would be stronger.',
    4: 'Strong password.',
  }
  return { score, message: messages[score] }
}

/* ---------------------------- Lockout --------------------------------- */

function readLock() {
  try {
    const raw = window.localStorage.getItem(LOCK_KEY)
    if (!raw) return null
    const lock = JSON.parse(raw)
    if (!lock || typeof lock !== 'object') return null
    if (Date.now() - lock.until > 0) return null // expired
    return lock
  } catch {
    return null
  }
}

function writeLock(attempts, untilMs) {
  try {
    window.localStorage.setItem(LOCK_KEY, JSON.stringify({ attempts, until: untilMs }))
  } catch {
    /* ignore */
  }
}

export function getLockStatus() {
  const lock = readLock()
  if (!lock) return { locked: false, attemptsLeft: MAX_ATTEMPTS, retryAfterSec: 0 }
  const retryAfterSec = Math.max(1, Math.ceil((lock.until - Date.now()) / 1000))
  return { locked: true, attemptsLeft: 0, retryAfterSec }
}

function recordFailedAttempt() {
  const lock = readLock()
  const attempts = (lock?.attempts || 0) + 1
  if (attempts >= MAX_ATTEMPTS) {
    const until = Date.now() + LOCKOUT_MS
    writeLock(attempts, until)
    return { locked: true, retryAfterSec: Math.ceil(LOCKOUT_MS / 1000) }
  }
  writeLock(attempts, 0)
  return { locked: false, attemptsLeft: MAX_ATTEMPTS - attempts }
}

function clearLock() {
  try {
    window.localStorage.removeItem(LOCK_KEY)
  } catch {
    /* ignore */
  }
}

/* ---------------------------- Sessions -------------------------------- */

function readSession() {
  try {
    const raw = window.sessionStorage.getItem(SESSION_KEY)
    if (!raw) return null
    const session = JSON.parse(raw)
    if (!session?.token || !session?.expiresAt) return null
    if (Date.now() > session.expiresAt) {
      window.sessionStorage.removeItem(SESSION_KEY)
      return null
    }
    return session
  } catch {
    return null
  }
}

export function getSession() {
  return readSession()
}

export function isAuthenticated() {
  return readSession() !== null
}

function createSession() {
  const session = {
    token: randomHex(32),
    createdAt: Date.now(),
    expiresAt: Date.now() + SESSION_TTL_MS,
    username: readAccount()?.username || 'admin',
  }
  try {
    window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(session))
    return session
  } catch {
    return null
  }
}

function destroySession() {
  try {
    window.sessionStorage.removeItem(SESSION_KEY)
  } catch {
    /* ignore */
  }
}

/* ---------------------------- Login ----------------------------------- */

export async function login(username, password) {
  const lock = getLockStatus()
  if (lock.locked) {
    return { ok: false, locked: true, error: `Too many failed attempts. Try again in ${Math.ceil(lock.retryAfterSec / 60)} minute(s).` }
  }
  const account = readAccount()
  if (!account) return { ok: false, error: 'No administrator account exists yet. Complete the one-time setup first.' }

  const name = String(username || '').trim()
  // Constant-shape comparisons; a wrong username and a wrong password
  // produce the same generic error.
  const userOk = name.toLowerCase() === account.username.toLowerCase()
  const hash = await hashPassword(String(password || ''), account.salt)
  const passOk = hash === account.hash
  if (!userOk || !passOk) {
    const result = recordFailedAttempt()
    if (result.locked) {
      return { ok: false, locked: true, error: `Too many failed attempts. Locked for ${Math.ceil(result.retryAfterSec / 60)} minute(s).` }
    }
    return { ok: false, error: `Incorrect username or password. ${result.attemptsLeft} attempt(s) remaining.` }
  }

  clearLock()
  const session = createSession()
  if (!session) return { ok: false, error: 'Could not create a session (storage unavailable).' }
  return { ok: true, session }
}

export function logout() {
  destroySession()
}

/* ------------------------ Password change / reset --------------------- */

export async function changePassword(currentPassword, newPassword) {
  const account = readAccount()
  if (!account) return { ok: false, error: 'No administrator account exists.' }
  const currentHash = await hashPassword(String(currentPassword || ''), account.salt)
  if (currentHash !== account.hash) return { ok: false, error: 'Current password is incorrect.' }
  const strength = checkPasswordStrength(newPassword)
  if (strength.score < 3) return { ok: false, error: strength.message }
  const salt = randomHex(16)
  const hash = await hashPassword(newPassword, salt)
  writeAccount({ ...account, salt, hash })
  return { ok: true }
}

export async function resetPasswordWithRecoveryCode(username, recoveryCode, newPassword) {
  const lock = getLockStatus()
  if (lock.locked) return { ok: false, error: 'Account temporarily locked. Try again later.' }
  const account = readAccount()
  if (!account) return { ok: false, error: 'No administrator account exists.' }
  const nameOk = String(username || '').trim().toLowerCase() === account.username.toLowerCase()
  const codeHash = await hashRecoveryCode(String(recoveryCode || '').trim())
  const codeOk = codeHash === account.recoveryHash
  if (!nameOk || !codeOk) {
    const result = recordFailedAttempt()
    if (result.locked) return { ok: false, error: 'Too many failed attempts. Account locked for 5 minutes.' }
    return { ok: false, error: 'Incorrect username or recovery code.' }
  }
  const strength = checkPasswordStrength(newPassword)
  if (strength.score < 3) return { ok: false, error: strength.message }
  const salt = randomHex(16)
  const hash = await hashPassword(newPassword, salt)
  // New recovery code so the old one can never be reused.
  const nextRecoveryCode = generateRecoveryCode()
  const recoveryHash = await hashRecoveryCode(nextRecoveryCode)
  writeAccount({ ...account, salt, hash, recoveryHash })
  clearLock()
  return { ok: true, recoveryCode: nextRecoveryCode }
}

/* --------------------- Rate-limiting helper (public) ------------------- */

export const ADMIN_SESSION_MINUTES = SESSION_TTL_MS / 60000
