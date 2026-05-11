import { useState } from 'react'
import type { User, Lang } from '../../types'
import { STR } from '../../i18n'
import { Avatar } from '../ui/Avatar'
import { Icon } from '../ui/Icon'

interface ProfileViewProps {
  user: User
  lang: Lang
  onOpenSettings: () => void
}

function Section({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle?: string
  children: React.ReactNode
}) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div className="flex items-baseline justify-between" style={{ marginBottom: 12, padding: '0 4px' }}>
        <span
          className="font-semibold uppercase tracking-widest"
          style={{ fontSize: 13, color: 'var(--text-3)', letterSpacing: '0.06em' }}
        >
          {title}
        </span>
        {subtitle && (
          <span style={{ fontSize: 12.5, color: 'var(--text-3)' }}>{subtitle}</span>
        )}
      </div>
      <div
        style={{
          background: 'var(--surface-elev)',
          border: '0.5px solid var(--hairline)',
          borderRadius: 16,
          padding: 16,
        }}
      >
        {children}
      </div>
    </div>
  )
}

export function ProfileView({ user, lang, onOpenSettings }: ProfileViewProps) {
  const t = STR[lang]
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  return (
    <div style={{ padding: '32px 40px 60px', maxWidth: 880, margin: '0 auto' }}>

      {/* ── Hero card ──────────────────────────────────────────────────── */}
      <div
        className="glass flex items-center gap-6"
        style={{
          padding: 28,
          borderRadius: 24,
          marginBottom: 28,
          boxShadow: 'var(--shadow-1)',
        }}
      >
        <Avatar user={user} size={104} />

        <div className="flex-1 min-w-0">
          <h1
            className="font-bold m-0"
            style={{ fontSize: 26, letterSpacing: '-0.02em', color: 'var(--text)' }}
          >
            {user.name}
          </h1>
          <div style={{ fontSize: 15, color: 'var(--text-2)', marginTop: 2, fontFeatureSettings: '"tnum"' }}>
            @{user.login}
          </div>
          <div
            className="flex items-center gap-1.5"
            style={{ fontSize: 13.5, color: 'var(--text-3)', marginTop: 6 }}
          >
            <Icon name="mail" size={13} />
            {user.email}
          </div>
        </div>

        {/* Settings button */}
        <button
          onClick={onOpenSettings}
          className="flex items-center gap-1.5 border-none font-semibold"
          style={{
            background: 'var(--accent)',
            color: 'white',
            borderRadius: 10,
            padding: '10px 18px',
            fontSize: 14,
          }}
        >
          <Icon name="settings" size={14} />
          {t.settings}
        </button>
      </div>

      {/* ── Bio ────────────────────────────────────────────────────────── */}
      <Section title={t.bio}>
        <p style={{ fontSize: 15, lineHeight: 1.5, color: 'var(--text)', margin: 0, padding: '4px 4px 8px' }}>
          {user.bio}
        </p>
      </Section>

      {/* ── Album ──────────────────────────────────────────────────────── */}
      <Section title={t.album} subtitle={`${user.album.length} ${t.photos}`}>
        <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {user.album.map((bg, i) => (
            <button
              key={i}
              onClick={() => setLightboxIndex(i)}
              className="relative overflow-hidden border-none p-0 transition-transform duration-200 hover:scale-[1.02]"
              style={{ aspectRatio: '1/1', borderRadius: 16, background: bg }}
            >
              <div
                className="absolute inset-0"
                style={{ background: 'radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.3), transparent 55%)' }}
              />
            </button>
          ))}

          {/* Add photo button */}
          <button
            className="flex flex-col items-center justify-center gap-1 border-none bg-transparent"
            style={{
              aspectRatio: '1/1',
              borderRadius: 16,
              border: '1.5px dashed var(--hairline-strong)',
              color: 'var(--text-3)',
              fontSize: 12,
            }}
          >
            <Icon name="plus" size={22} />
            <span>{t.photo}</span>
          </button>
        </div>
      </Section>

      {/* ── Lightbox ───────────────────────────────────────────────────── */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 flex items-center justify-center z-[100] animate-fade-in"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(20px)' }}
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="animate-pop-in"
            style={{
              width: 'min(560px, 90vw)',
              aspectRatio: '1/1',
              borderRadius: 24,
              background: user.album[lightboxIndex],
              boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
            }}
          />
        </div>
      )}
    </div>
  )
}
