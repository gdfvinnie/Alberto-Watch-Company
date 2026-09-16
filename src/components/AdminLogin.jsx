import { useEffect, useRef, useState } from 'react'
import {
  adminAccountExists,
  setupAdminAccount,
  login,
  getLockStatus,
  resetPasswordWithRecoveryCode,
  checkPasswordStrength,
} from '../data/adminAuth.js'
import { KeyIcon, ShieldIcon } from './WatchArt.jsx'

/**
 * AdminLogin — full-screen gate in front of the admin dashboard.
 * Three modes: setup (first run only), login, and recovery.
 * No credentials exist in the source; the owner creates them
 * through the one-time setup screen.
 */
export default function AdminLogin({ onAuthed }) {
  const exists = adminAccountExists()
  const [mode, setMode] = useState(exists ? 'login' : 'setup')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [lock, setLock] = useState(() => getLockStatus())

  // --- form state ---
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [recoveryCode, setRecoveryCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [showSetupResult, setShowSetupResult] = useState(null) // { username, recoveryCode }

  const userRef = useRef(null)

  useEffect(() => {
    userRef.current?.focus()
    document.title = 'Admin — Alberto Watch Company'
    return () => {
      document.title = 'Alberto Watch Company — Luxury Watch SPA'
    }
  }, [])

  useEffect(() => {
    if (!lock.locked) return undefined
    const t = setInterval(() => setLock(getLockStatus()), 1000)
    return () => clearInterval(t)
  }, [lock.locked])

  const strength = checkPasswordStrength(mode === 'recovery' ? newPassword : password)

  const handleSetup = async (e) => {
    e.preventDefault()
    setError('')
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }
    setBusy(true)
    const result = await setupAdminAccount(username, password)
    setBusy(false)
    if (!result.ok) {
      setError(result.error)
      return
    }
    setShowSetupResult({ username: username.trim(), recoveryCode: result.recoveryCode })
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setBusy(true)
    const result = await login(username, password)
    setBusy(false)
    if (!result.ok) {
      setError(result.error)
      setLock(getLockStatus())
      return
    }
    onAuthed()
  }

  const handleRecovery = async (e) => {
    e.preventDefault()
    setError('')
    setBusy(true)
    const result = await resetPasswordWithRecoveryCode(username, recoveryCode, newPassword)
    setBusy(false)
    if (!result.ok) {
      setError(result.error)
      return
    }
    setMode('login')
    setShowSetupResult({ username: username.trim(), recoveryCode: result.recoveryCode, wasReset: true })
    setInfo('Password changed. Save your new recovery code — the old one no longer works.')
  }

  /* ------------------------- Setup success screen ------------------------ */
  if (showSetupResult) {
    return (
      <div className="admin-gate">
        <div className="admin-gate-card admin-gate-wide">
          <div className="admin-gate-icon"><ShieldIcon /></div>
          <h1>{showSetupResult.wasReset ? 'Password reset complete' : 'Administrator account created'}</h1>
          <p className="admin-gate-lead">
            {showSetupResult.wasReset
              ? 'Your password has been changed and a new recovery code was generated.'
              : 'Your private admin account is ready. Store the recovery code somewhere safe — it is the only way to regain access if you forget your password.'}
          </p>
          <div className="recovery-code-box">
            <p className="recovery-code-label">Your recovery code (shown only once)</p>
            <code className="recovery-code">{showSetupResult.recoveryCode}</code>
            <button
              type="button"
              className="admin-btn admin-btn-ghost admin-btn-sm"
              onClick={() => navigator.clipboard?.writeText(showSetupResult.recoveryCode)}
            >
              Copy
            </button>
          </div>
          <button type="button" className="admin-btn admin-btn-primary" onClick={() => onAuthed()}>
            Continue to Dashboard
          </button>
        </div>
      </div>
    )
  }

  /* ------------------------------ Locked view ---------------------------- */
  if (lock.locked && mode === 'login') {
    return (
      <div className="admin-gate">
        <div className="admin-gate-card">
          <div className="admin-gate-icon"><ShieldIcon /></div>
          <h1>Temporarily locked</h1>
          <p className="admin-gate-lead">
            Too many failed sign-in attempts. For security, try again in{' '}
            <strong>{Math.ceil(lock.retryAfterSec / 60)} minute(s)</strong> ({lock.retryAfterSec} seconds).
          </p>
        </div>
      </div>
    )
  }

  /* -------------------------------- Gate --------------------------------- */
  return (
    <div className="admin-gate">
      <div className="admin-gate-card admin-gate-wide">
        <div className="admin-gate-icon"><KeyIcon /></div>
        <h1>{mode === 'setup' ? 'Create your administrator account' : 'Administrator sign in'}</h1>
        <p className="admin-gate-lead">
          {mode === 'setup'
            ? 'First run: choose a username and a strong password. Nothing is hard-coded — this credential exists only on this device.'
            : 'Private area. Only the site owner can sign in.'}
        </p>

        {error && <p className="admin-form-error" role="alert">{error}</p>}
        {info && <p className="admin-form-info" role="status">{info}</p>}

        {mode !== 'recovery' ? (
          <form onSubmit={mode === 'setup' ? handleSetup : handleLogin} className="admin-form">
            <label className="admin-field">
              <span>Username or email</span>
              <input
                ref={userRef}
                type="text"
                name="admin-username"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
            <label className="admin-field">
              <span>Password</span>
              <input
                type="password"
                name="admin-password"
                autoComplete={mode === 'setup' ? 'new-password' : 'current-password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            {mode === 'setup' && (
              <>
                <label className="admin-field">
                  <span>Confirm password</span>
                  <input
                    type="password"
                    name="admin-password-confirm"
                    autoComplete="new-password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    required
                  />
                </label>
                <div className={`pw-meter pw-${strength.score}`}>
                  <div className="pw-meter-bar" />
                  <span className="pw-meter-text">{strength.message}</span>
                </div>
              </>
            )}
            <button type="submit" className="admin-btn admin-btn-primary" disabled={busy || lock.locked}>
              {busy ? 'Please wait…' : mode === 'setup' ? 'Create account' : 'Sign in'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRecovery} className="admin-form">
            <label className="admin-field">
              <span>Username</span>
              <input
                ref={userRef}
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
            <label className="admin-field">
              <span>Recovery code</span>
              <input
                type="text"
                autoComplete="off"
                placeholder="awc-xxxxx-xxxxx"
                value={recoveryCode}
                onChange={(e) => setRecoveryCode(e.target.value)}
                required
              />
            </label>
            <label className="admin-field">
              <span>New password</span>
              <input
                type="password"
                autoComplete="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </label>
            <div className={`pw-meter pw-${strength.score}`}>
              <div className="pw-meter-bar" />
              <span className="pw-meter-text">{strength.message}</span>
            </div>
            <button type="submit" className="admin-btn admin-btn-primary" disabled={busy}>
              {busy ? 'Please wait…' : 'Reset password'}
            </button>
          </form>
        )}

        <div className="admin-gate-foot">
          {mode === 'login' && (
            <button type="button" className="admin-linklike" onClick={() => { setMode('recovery'); setError(''); setInfo('') }}>
              Forgot password?
            </button>
          )}
          {mode === 'recovery' && (
            <button type="button" className="admin-linklike" onClick={() => { setMode('login'); setError(''); setInfo('') }}>
              Back to sign in
            </button>
          )}
          <span className="admin-gate-note">Protected area · all activity is local to this browser</span>
        </div>
      </div>
    </div>
  )
}
