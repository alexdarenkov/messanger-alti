import type { Lang, Theme } from '../../types'
import { STR } from '../../i18n'
import { Icon, type IconName } from '../ui/Icon'

const ACCENT_COLORS = [
  { id: '#0A84FF', label: 'Blue' },
  { id: '#5E5CE6', label: 'Indigo' },
  { id: '#30D158', label: 'Green' },
  { id: '#FF375F', label: 'Pink' },
  { id: '#FF9500', label: 'Orange' },
  { id: '#BF5AF2', label: 'Purple' },
] as const

interface AppearanceSettingsProps {
  theme: Theme
  onSetTheme: (theme: Theme) => void
  accent: string
  onSetAccent: (accent: string) => void
  lang: Lang
  onSwitchLang: (lang: Lang) => void
}

export function AppearanceSettings({
  theme,
  onSetTheme,
  accent,
  onSetAccent,
  lang,
  onSwitchLang,
}: AppearanceSettingsProps) {
  const t = STR[lang]

  const themes: { id: Theme; label: string; icon: IconName }[] = [
    { id: 'light', label: t.light, icon: 'sun' },
    { id: 'dark',  label: t.dark,  icon: 'moon' },
    { id: 'auto',  label: t.auto,  icon: 'settings' },
  ]

  return (
    <div style={{ padding: '32px 40px 60px', maxWidth: 720, margin: '0 auto' }}>
      <h1 className="font-bold m-0" style={{ fontSize: 28, letterSpacing: '-0.02em', color: 'var(--text)' }}>
        {t.appearance}
      </h1>
      <p style={{ fontSize: 14, color: 'var(--text-2)', margin: '6px 0 24px' }}>
        {t.personalize}
      </p>

      {/* ── Theme picker ───────────────────────────────────────────────── */}
      <div style={{ marginBottom: 22 }}>
        <div
          className="font-semibold uppercase"
          style={{ fontSize: 12.5, color: 'var(--text-3)', letterSpacing: '0.06em', marginBottom: 8, paddingLeft: 4 }}
        >
          {t.theme}
        </div>
        <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {themes.map((th) => (
            <button
              key={th.id}
              onClick={() => onSetTheme(th.id)}
              className="relative flex flex-col items-center gap-2 border rounded-[14px] font-medium transition-transform duration-150 hover:scale-[1.02]"
              style={{
                padding: '14px 8px',
                fontSize: 13,
                background:
                  th.id === 'light' ? 'linear-gradient(135deg, #ffffff, #f0f0f5)' :
                  th.id === 'dark'  ? 'linear-gradient(135deg, #1c1c1e, #000)' :
                  'linear-gradient(135deg, #ffffff 0%, #ffffff 50%, #1c1c1e 50%, #000 100%)',
                color:
                  th.id === 'light' ? '#1d1d1f' :
                  th.id === 'dark'  ? '#f5f5f7' : '#888',
                borderColor: theme === th.id ? 'var(--accent)' : 'var(--hairline)',
                borderWidth: theme === th.id ? 2 : 1,
              }}
            >
              {/* Mini chat preview */}
              <div className="flex flex-col gap-1 w-full" style={{ padding: '0 14px' }}>
                <div style={{ alignSelf: 'flex-start', height: 8, width: '55%', borderRadius: 4, background: th.id === 'light' ? '#e9e9eb' : th.id === 'dark' ? '#2c2c2e' : 'linear-gradient(90deg, #e9e9eb 50%, #2c2c2e 50%)' }} />
                <div style={{ alignSelf: 'flex-end', height: 8, width: '45%', borderRadius: 4, background: 'var(--accent)' }} />
                <div style={{ alignSelf: 'flex-start', height: 8, width: '65%', borderRadius: 4, background: th.id === 'light' ? '#e9e9eb' : th.id === 'dark' ? '#2c2c2e' : 'linear-gradient(90deg, #e9e9eb 50%, #2c2c2e 50%)' }} />
              </div>

              <div className="flex items-center gap-1.5 mt-1">
                <Icon name={th.icon} size={14} />
                {th.label}
              </div>

              {theme === th.id && (
                <div
                  className="absolute flex items-center justify-center rounded-full text-white"
                  style={{ top: 8, right: 8, width: 18, height: 18, background: 'var(--accent)' }}
                >
                  <Icon name="check" size={11} />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Accent color picker ────────────────────────────────────────── */}
      <div style={{ marginBottom: 22 }}>
        <div
          className="font-semibold uppercase"
          style={{ fontSize: 12.5, color: 'var(--text-3)', letterSpacing: '0.06em', marginBottom: 8, paddingLeft: 4 }}
        >
          {lang === 'ru' ? 'Акцентный цвет' : 'Accent color'}
        </div>
        <div className="flex flex-wrap gap-3">
          {ACCENT_COLORS.map((a) => (
            <button
              key={a.id}
              onClick={() => onSetAccent(a.id)}
              title={a.label}
              className="flex items-center justify-center rounded-full border-none"
              style={{
                width: 40,
                height: 40,
                background: a.id,
                border: accent === a.id ? '3px solid var(--surface-elev)' : 'none',
                boxShadow: accent === a.id
                  ? `0 0 0 2px ${a.id}`
                  : 'inset 0 1px 0 rgba(255,255,255,0.25)',
              }}
            >
              {accent === a.id && <Icon name="check" size={18} style={{ color: 'white' }} />}
            </button>
          ))}
        </div>
      </div>

      {/* ── Language picker ────────────────────────────────────────────── */}
      <div style={{ marginBottom: 22 }}>
        <div
          className="font-semibold uppercase"
          style={{ fontSize: 12.5, color: 'var(--text-3)', letterSpacing: '0.06em', marginBottom: 8, paddingLeft: 4 }}
        >
          {t.language}
        </div>
        <div className="flex gap-2">
          {([['ru', 'Русский'], ['en', 'English']] as const).map(([id, label]) => (
            <button
              key={id}
              onClick={() => onSwitchLang(id)}
              className="flex-1 rounded-[10px] font-medium border-none"
              style={{
                padding: '10px 14px',
                fontSize: 14,
                background: lang === id ? 'var(--accent)' : 'var(--bg-3)',
                color: lang === id ? 'white' : 'var(--text)',
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
