import { useState, useEffect } from 'react'
import type { Lang, User } from '../../types'
import { STR } from '../../i18n'
import { ME, suggestLogin } from '../../data'
import { Icon } from '../ui/Icon'
import { AltiMark } from '../ui/AltiMark'

// ─── Reusable input field ─────────────────────────────────────────────────

interface FieldProps {
  icon?: 'at' | 'lock' | 'mail' | 'user'
  type?: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  hint?: string
  error?: string
  autoComplete?: string
}

function Field({ icon, type = 'text', value, onChange, placeholder, hint, error, autoComplete }: FieldProps) {
  const [showPassword, setShowPassword] = useState(false)
  const inputType = type === 'password' && showPassword ? 'text' : type

  return (
    <div className="flex flex-col gap-1.5">
      <div
        className="ring flex items-center gap-2.5 rounded-xl border border-transparent transition-shadow duration-200"
        style={{ background: 'var(--bg-3)', padding: '12px 14px' }}
      >
        {icon && (
          <Icon name={icon} size={18} style={{ color: 'var(--text-3)', flexShrink: 0 }} />
        )}
        <input
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="flex-1 bg-transparent border-none outline-none"
          style={{ fontSize: 15, color: 'var(--text)' }}
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            className="flex border-none bg-transparent p-0.5"
            style={{ color: 'var(--text-3)' }}
          >
            <Icon name={showPassword ? 'eye-off' : 'eye'} size={18} />
          </button>
        )}
      </div>

      {error
        ? <span className="text-xs pl-1" style={{ color: '#FF453A' }}>{error}</span>
        : hint
        ? <span className="text-xs pl-1" style={{ color: 'var(--text-3)' }}>{hint}</span>
        : null
      }
    </div>
  )
}

// ─── Primary action button ────────────────────────────────────────────────

interface PrimaryButtonProps {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit'
}

function PrimaryButton({ children, onClick, disabled, type = 'button' }: PrimaryButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="w-full rounded-xl py-3 px-4 font-semibold text-white border-none transition-all duration-150 active:scale-[0.98]"
      style={{
        fontSize: 15,
        background: disabled
          ? 'color-mix(in oklab, var(--accent) 35%, transparent)'
          : 'var(--accent)',
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
      {children}
    </button>
  )
}

// ─── Social login ghost button ────────────────────────────────────────────

interface GhostButtonProps {
  children: React.ReactNode
  onClick?: () => void
  icon: React.ReactNode
}

function GhostButton({ children, onClick, icon }: GhostButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-1 items-center justify-center gap-2 rounded-xl py-3 px-4 font-medium border"
      style={{
        fontSize: 14,
        background: 'var(--bg-3)',
        color: 'var(--text)',
        borderColor: 'var(--hairline)',
      }}
    >
      {icon}
      {children}
    </button>
  )
}

// ─── Tab switcher (Sign in / Register) ───────────────────────────────────

interface SegmentedAuthProps {
  mode: 'in' | 'up'
  onSetMode: (mode: 'in' | 'up') => void
  signInLabel: string
  registerLabel: string
}

function SegmentedAuth({ mode, onSetMode, signInLabel, registerLabel }: SegmentedAuthProps) {
  return (
    <div
      className="flex rounded-xl gap-1 p-1"
      style={{ background: 'var(--bg-3)' }}
    >
      {([['in', signInLabel], ['up', registerLabel]] as const).map(([id, label]) => (
        <button
          key={id}
          onClick={() => onSetMode(id)}
          className="flex-1 rounded-[9px] py-2.5 px-3 border-none font-semibold text-sm transition-all duration-150"
          style={{
            color: mode === id ? 'var(--text)' : 'var(--text-2)',
            background: mode === id ? 'var(--surface-elev)' : 'transparent',
            boxShadow: mode === id ? '0 1px 3px rgba(0,0,0,0.1), 0 0 0 0.5px var(--hairline)' : 'none',
          }}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

// ─── Login suggestion preview ─────────────────────────────────────────────

interface LoginPreviewProps {
  login: string
  availableLabel: string
  regenerateLabel: string
  suggestedLabel: string
  onRegenerate: () => void
}

function LoginPreview({ login, availableLabel, regenerateLabel, suggestedLabel, onRegenerate }: LoginPreviewProps) {
  return (
    <div
      className="flex items-center gap-2.5 rounded-xl animate-pop-in"
      style={{ background: 'var(--bg-3)', padding: '12px 14px' }}
    >
      <Icon name="at" size={18} style={{ color: 'var(--text-3)' }} />
      <div className="flex-1 flex flex-col gap-0.5">
        <span
          className="uppercase font-semibold"
          style={{ fontSize: 11.5, color: 'var(--text-3)', letterSpacing: '0.06em' }}
        >
          {suggestedLabel}
        </span>
        <span className="font-semibold" style={{ fontSize: 15 }}>
          @{login}{' '}
          <span className="font-medium" style={{ color: '#30D158', fontSize: 12 }}>
            · {availableLabel}
          </span>
        </span>
      </div>
      <button
        type="button"
        onClick={onRegenerate}
        className="rounded-lg font-medium"
        style={{
          padding: '6px 10px',
          fontSize: 12,
          background: 'var(--surface-elev)',
          border: '0.5px solid var(--hairline)',
          color: 'var(--text)',
        }}
      >
        {regenerateLabel}
      </button>
    </div>
  )
}

// ─── Main AuthScreen component ────────────────────────────────────────────

interface AuthScreenProps {
  lang: Lang
  onAuth: (user: User) => void
  onSwitchLang: (lang: Lang) => void
}

export function AuthScreen({ lang, onAuth, onSwitchLang }: AuthScreenProps) {
  const t = STR[lang]

  const [mode, setMode]           = useState<'in' | 'up'>('in')
  const [identifier, setIdentifier] = useState('')
  const [email, setEmail]         = useState('')
  const [password, setPassword]   = useState('')
  const [password2, setPassword2] = useState('')
  const [name, setName]           = useState('')
  const [login, setLogin]         = useState('')
  const [touched, setTouched]     = useState<Record<string, boolean>>({})

  // Auto-suggest a login when email is valid
  useEffect(() => {
    if (mode !== 'up' || !email.includes('@')) return
    setLogin(suggestLogin(email))
  }, [email, mode])

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const errors: Record<string, string> = {}
  if (mode === 'up') {
    if (touched.email    && !emailValid)           errors.email    = t.invalid_email
    if (touched.password && password.length < 6)  errors.password = t.pwd_weak
    if (touched.password2 && password !== password2) errors.password2 = t.pwd_mismatch
  }

  const canSubmit = mode === 'in'
    ? identifier.length > 1 && password.length > 0
    : emailValid && password.length >= 6 && password === password2 && name.trim().length > 0

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit) {
      setTouched({ email: true, password: true, password2: true })
      return
    }
    onAuth({
      ...ME,
      ...(mode === 'up' ? { email, login, name } : {}),
    })
  }

  const yandexIcon = (
    <svg width="16" height="16" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="11" fill="#FC3F1D"/>
      <path d="M13.4 18h2V6h-2.9c-2.9 0-4.4 1.5-4.4 3.7 0 1.7.8 2.7 2.3 3.7L7.7 18h2.2l2.9-5.3-1-.7c-1.2-.8-1.8-1.5-1.8-2.6 0-1 .7-1.7 2-1.7h1.4z" fill="#fff"/>
    </svg>
  )

  const googleIcon = (
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.5 12.3c0-.8-.1-1.5-.2-2.2H12v4.2h5.9c-.3 1.4-1 2.5-2.2 3.3v2.7h3.6c2.1-1.9 3.2-4.7 3.2-8z"/>
      <path fill="#34A853" d="M12 23c2.9 0 5.4-1 7.2-2.7l-3.6-2.7c-1 .7-2.3 1.1-3.7 1.1-2.8 0-5.2-1.9-6-4.5H2.2v2.8C4 20.5 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M6 14.2c-.2-.7-.4-1.4-.4-2.2s.1-1.5.4-2.2V7H2.2C1.4 8.5 1 10.2 1 12s.4 3.5 1.2 5z"/>
      <path fill="#EA4335" d="M12 5.4c1.6 0 3 .5 4.1 1.6l3.1-3.1C17.4 2 14.9 1 12 1 7.7 1 4 3.5 2.2 7l3.8 2.8c.9-2.6 3.3-4.4 6-4.4z"/>
    </svg>
  )

  return (
    <div className="relative z-10 h-screen w-full flex items-center justify-center p-6 animate-fade-in">

      {/* Language switcher */}
      <div className="absolute top-5 right-6 flex gap-1.5 z-10">
        {(['ru', 'en'] as Lang[]).map((l) => (
          <button
            key={l}
            onClick={() => onSwitchLang(l)}
            className="px-3 py-1.5 rounded-[9px] font-semibold border-none"
            style={{
              fontSize: 13,
              background: lang === l ? 'var(--bg-3)' : 'transparent',
              color: lang === l ? 'var(--text)' : 'var(--text-2)',
            }}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Auth card */}
      <div
        className="glass flex flex-col gap-5 animate-slide-up"
        style={{
          width: 'min(420px, 100%)',
          padding: 32,
          borderRadius: 28,
          boxShadow: 'var(--shadow-1)',
        }}
      >
        {/* Logo + title */}
        <div className="flex flex-col items-center gap-3.5">
          <AltiMark size={64} />
          <div className="text-center">
            <h1 className="font-bold" style={{ fontSize: 22, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>
              {mode === 'in' ? t.welcome_back : t.welcome_alti}
            </h1>
            <p className="mt-1" style={{ fontSize: 14, color: 'var(--text-2)', margin: '4px 0 0' }}>
              {mode === 'in' ? t.auth_subtitle_in : t.auth_subtitle_up}
            </p>
          </div>
        </div>

        <SegmentedAuth
          mode={mode}
          onSetMode={setMode}
          signInLabel={t.login}
          registerLabel={t.register}
        />

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {mode === 'in' ? (
            <>
              <Field
                icon="at"
                placeholder={t.email_or_login}
                value={identifier}
                onChange={setIdentifier}
                autoComplete="username"
              />
              <Field
                icon="lock"
                type="password"
                placeholder={t.password}
                value={password}
                onChange={setPassword}
                autoComplete="current-password"
              />
            </>
          ) : (
            <>
              <Field
                icon="user"
                placeholder={t.name}
                value={name}
                onChange={setName}
                autoComplete="name"
              />
              <Field
                icon="mail"
                type="email"
                placeholder={t.email}
                value={email}
                onChange={(v) => { setEmail(v); setTouched((s) => ({ ...s, email: true })) }}
                error={errors.email}
                autoComplete="email"
              />
              <Field
                icon="at"
                placeholder={t.username_placeholder}
                value={login}
                onChange={(v) => setLogin(v.replace(/[^a-z0-9._]/gi, '').toLowerCase())}
                hint={t.username_hint}
                autoComplete="username"
              />
              {login && emailValid && (
                <LoginPreview
                  login={login}
                  availableLabel={t.available}
                  regenerateLabel={t.regenerate}
                  suggestedLabel={t.suggested_login}
                  onRegenerate={() => setLogin(suggestLogin(email))}
                />
              )}
              <Field
                icon="lock"
                type="password"
                placeholder={t.password}
                value={password}
                onChange={(v) => { setPassword(v); setTouched((s) => ({ ...s, password: true })) }}
                error={errors.password}
                autoComplete="new-password"
              />
              <Field
                icon="lock"
                type="password"
                placeholder={t.repeat_password}
                value={password2}
                onChange={(v) => { setPassword2(v); setTouched((s) => ({ ...s, password2: true })) }}
                error={errors.password2}
                autoComplete="new-password"
              />
            </>
          )}

          <PrimaryButton type="submit" disabled={!canSubmit}>
            {mode === 'in' ? t.sign_in : t.sign_up}
          </PrimaryButton>
        </form>

        {/* Social login */}
        <div className="flex gap-2">
          <GhostButton icon={yandexIcon}>Yandex</GhostButton>
          <GhostButton icon={googleIcon}>Google</GhostButton>
        </div>

        {/* Switch mode */}
        <p className="text-center m-0" style={{ fontSize: 13, color: 'var(--text-2)' }}>
          {mode === 'in' ? t.no_account : t.have_account}{' '}
          <button
            type="button"
            onClick={() => setMode(mode === 'in' ? 'up' : 'in')}
            className="border-none bg-transparent font-semibold p-0"
            style={{ fontSize: 13, color: 'var(--accent)' }}
          >
            {mode === 'in' ? t.register : t.login}
          </button>
        </p>
      </div>
    </div>
  )
}
