import { useState } from 'react'
import type { User, Lang, Theme } from '../../types'
import { STR } from '../../i18n'
import { Icon } from '../ui/Icon'
import { ProfileView } from './ProfileView'
import { SettingsNav, type SettingsKey } from './SettingsNav'
import { AccountSettings } from './AccountSettings'
import { AppearanceSettings } from './AppearanceSettings'

type Section = 'profile' | 'settings'

// ─── Placeholder for unimplemented settings sections ──────────────────────

function PlaceholderSettings({
  title,
  icon,
  lang,
}: {
  title: string
  icon: Parameters<typeof Icon>[0]['name']
  lang: Lang
}) {
  const t = STR[lang]
  return (
    <div style={{ padding: '32px 40px 60px', maxWidth: 720, margin: '0 auto' }}>
      <h1 className="font-bold m-0" style={{ fontSize: 28, letterSpacing: '-0.02em', color: 'var(--text)' }}>
        {title}
      </h1>
      <p style={{ fontSize: 14, color: 'var(--text-2)', margin: '6px 0 24px' }}>{t.coming_soon}</p>
      <div
        className="flex flex-col items-center gap-3"
        style={{
          background: 'var(--surface-elev)',
          border: '0.5px solid var(--hairline)',
          borderRadius: 16,
          padding: 40,
          color: 'var(--text-3)',
        }}
      >
        <div
          className="flex items-center justify-center rounded-[14px]"
          style={{ width: 56, height: 56, background: 'var(--bg-3)' }}
        >
          <Icon name={icon} size={26} />
        </div>
        <div style={{ fontSize: 14 }}>{t.under_construction}</div>
      </div>
    </div>
  )
}

// ─── Profile screen (profile view + settings nav + settings panels) ────────

interface ProfileScreenProps {
  user: User
  lang: Lang
  onUpdateUser: (user: User) => void
  onLogout: () => void
  theme: Theme
  onSetTheme: (theme: Theme) => void
  accent: string
  onSetAccent: (accent: string) => void
  onSwitchLang: (lang: Lang) => void
}

export function ProfileScreen({
  user,
  lang,
  onUpdateUser,
  onLogout,
  theme,
  onSetTheme,
  accent,
  onSetAccent,
  onSwitchLang,
}: ProfileScreenProps) {
  const t = STR[lang]

  const [section, setSection]         = useState<Section>('profile')
  const [settingsKey, setSettingsKey] = useState<SettingsKey>('account')

  function openSettings() {
    setSection('settings')
    setSettingsKey('account')
  }

  function backToProfile() {
    setSection('profile')
  }

  return (
    <main className="flex-1 flex min-w-0" style={{ background: 'var(--bg)' }}>
      {/* Settings navigation sidebar (only visible in settings section) */}
      {section === 'settings' && (
        <SettingsNav
          settingsKey={settingsKey}
          onSetSettingsKey={setSettingsKey}
          onBackToProfile={backToProfile}
          onLogout={onLogout}
          lang={lang}
        />
      )}

      {/* Main content area */}
      <div className="flex-1 overflow-y-auto min-w-0">
        {section === 'profile' ? (
          <ProfileView
            user={user}
            lang={lang}
            onOpenSettings={openSettings}
          />
        ) : (
          <>
            {settingsKey === 'account' && (
              <AccountSettings user={user} onUpdateUser={onUpdateUser} lang={lang} />
            )}
            {settingsKey === 'appearance' && (
              <AppearanceSettings
                theme={theme}
                onSetTheme={onSetTheme}
                accent={accent}
                onSetAccent={onSetAccent}
                lang={lang}
                onSwitchLang={onSwitchLang}
              />
            )}
            {settingsKey === 'privacy' && (
              <PlaceholderSettings title={t.privacy} icon="lock" lang={lang} />
            )}
            {settingsKey === 'notifications' && (
              <PlaceholderSettings title={t.notifications} icon="bell" lang={lang} />
            )}
          </>
        )}
      </div>
    </main>
  )
}
