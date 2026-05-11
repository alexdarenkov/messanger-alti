import { useRef, useState } from 'react'
import type { User, Lang } from '../../types'
import { STR } from '../../i18n'
import { Avatar } from '../ui/Avatar'
import { Icon } from '../ui/Icon'

// ─── Settings row wrapper ─────────────────────────────────────────────────

function SettingsRow({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div style={{ marginBottom: 22 }}>
      <div
        className="font-semibold uppercase tracking-widest"
        style={{ fontSize: 12.5, color: 'var(--text-3)', letterSpacing: '0.06em', marginBottom: 8, paddingLeft: 4 }}
      >
        {label}
      </div>
      {children}
      {hint && (
        <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 6, paddingLeft: 4 }}>
          {hint}
        </div>
      )}
    </div>
  )
}

// ─── Settings text input ──────────────────────────────────────────────────

function SettingsInput({
  value,
  onChange,
  type = 'text',
  prefix,
  readOnly,
  actionLabel,
}: {
  value: string
  onChange: (v: string) => void
  type?: string
  prefix?: string
  readOnly?: boolean
  actionLabel?: string
}) {
  return (
    <div
      className="ring flex items-center gap-1 rounded-[10px] border"
      style={{
        background: 'var(--surface-elev)',
        borderColor: 'var(--hairline)',
        padding: '10px 12px',
      }}
    >
      {prefix && <span style={{ color: 'var(--text-3)', fontSize: 14 }}>{prefix}</span>}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        readOnly={readOnly}
        className="flex-1 bg-transparent border-none outline-none"
        style={{ fontSize: 14, color: 'var(--text)' }}
      />
      {actionLabel && (
        <button
          className="rounded-[7px] font-medium border"
          style={{
            padding: '5px 10px',
            fontSize: 12.5,
            background: 'var(--bg-3)',
            borderColor: 'var(--hairline)',
            color: 'var(--text)',
          }}
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}

// ─── Account settings panel ───────────────────────────────────────────────

interface AccountSettingsProps {
  user: User
  onUpdateUser: (user: User) => void
  lang: Lang
}

export function AccountSettings({ user, onUpdateUser, lang }: AccountSettingsProps) {
  const t = STR[lang]

  const [draft, setDraft] = useState<User>({ ...user })
  const fileRef = useRef<HTMLInputElement>(null)

  function update(patch: Partial<User>) {
    setDraft((d) => ({ ...d, ...patch }))
  }

  const isDirty = JSON.stringify(draft) !== JSON.stringify(user)

  return (
    <div style={{ padding: '32px 40px 60px', maxWidth: 720, margin: '0 auto' }}>
      <h1 className="font-bold m-0" style={{ fontSize: 28, letterSpacing: '-0.02em', color: 'var(--text)' }}>
        {t.account}
      </h1>
      <p style={{ fontSize: 14, color: 'var(--text-2)', margin: '6px 0 24px' }}>
        {t.manage_account}
      </p>

      {/* Photo */}
      <SettingsRow label={t.change_photo}>
        <div className="flex items-center gap-3.5">
          <Avatar user={draft} size={64} />
          <button
            onClick={() => fileRef.current?.click()}
            className="flex items-center gap-1.5 rounded-[9px] font-medium border"
            style={{
              padding: '8px 14px',
              fontSize: 13.5,
              background: 'var(--bg-3)',
              borderColor: 'var(--hairline)',
              color: 'var(--text)',
            }}
          >
            <Icon name="camera" size={14} />
            {t.change_photo}
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
          />
        </div>
      </SettingsRow>

      <SettingsRow label={t.change_name}>
        <SettingsInput value={draft.name} onChange={(v) => update({ name: v })} />
      </SettingsRow>

      <SettingsRow
        label={t.change_login}
        hint={lang === 'ru' ? 'Уникальный, по нему вас находят' : 'Unique handle people use to find you'}
      >
        <SettingsInput
          prefix="@"
          value={draft.login}
          onChange={(v) => update({ login: v.replace(/[^a-z0-9._]/gi, '').toLowerCase() })}
        />
      </SettingsRow>

      <SettingsRow label={t.change_email}>
        <SettingsInput type="email" value={draft.email} onChange={(v) => update({ email: v })} />
      </SettingsRow>

      <SettingsRow label={t.change_password}>
        <SettingsInput
          type="password"
          value="••••••••"
          onChange={() => {}}
          readOnly
          actionLabel={lang === 'ru' ? 'Изменить' : 'Change'}
        />
      </SettingsRow>

      <SettingsRow label={t.change_bio}>
        <textarea
          value={draft.bio}
          onChange={(e) => update({ bio: e.target.value })}
          rows={3}
          maxLength={140}
          className="w-full resize-y border outline-none rounded-[10px]"
          style={{
            minHeight: 80,
            background: 'var(--surface-elev)',
            borderColor: 'var(--hairline)',
            padding: '10px 12px',
            fontSize: 14,
            color: 'var(--text)',
            fontFamily: 'inherit',
          }}
        />
        <div className="text-right mt-1" style={{ fontSize: 11.5, color: 'var(--text-3)' }}>
          {draft.bio.length}/140
        </div>
      </SettingsRow>

      {/* Save bar — appears when there are unsaved changes */}
      <div
        className="sticky bottom-0 flex justify-end gap-2.5 transition-all duration-200"
        style={{
          marginTop: 28,
          background: isDirty ? 'var(--surface-2)' : 'transparent',
          backdropFilter: isDirty ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: isDirty ? 'blur(20px)' : 'none',
          padding: isDirty ? '12px 0' : 0,
          borderTop: isDirty ? '0.5px solid var(--hairline)' : 'none',
          opacity: isDirty ? 1 : 0,
          pointerEvents: isDirty ? 'auto' : 'none',
        }}
      >
        <button
          onClick={() => setDraft({ ...user })}
          className="border rounded-[9px] font-medium"
          style={{
            padding: '9px 16px',
            fontSize: 14,
            background: 'transparent',
            borderColor: 'var(--hairline-strong)',
            color: 'var(--text)',
          }}
        >
          {t.cancel}
        </button>
        <button
          onClick={() => onUpdateUser(draft)}
          className="border-none rounded-[9px] font-semibold text-white"
          style={{ padding: '9px 18px', fontSize: 14, background: 'var(--accent)' }}
        >
          {t.save}
        </button>
      </div>
    </div>
  )
}
