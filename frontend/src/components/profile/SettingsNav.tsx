import type { Lang } from '../../types'
import { STR } from '../../i18n'
import { Icon, type IconName } from '../ui/Icon'

export type SettingsSection = 'profile' | 'settings'
export type SettingsKey = 'account' | 'appearance' | 'privacy' | 'notifications'

interface NavItem {
  id: string
  label: string
  icon: IconName
  color: string
  action: 'profile' | 'settings' | 'logout'
  settingsKey?: SettingsKey
}

interface SettingsNavProps {
  settingsKey: SettingsKey
  onSetSettingsKey: (key: SettingsKey) => void
  onBackToProfile: () => void
  onLogout: () => void
  lang: Lang
}

export function SettingsNav({
  settingsKey,
  onSetSettingsKey,
  onBackToProfile,
  onLogout,
  lang,
}: SettingsNavProps) {
  const t = STR[lang]

  const items: (NavItem | 'divider')[] = [
    { id: 'back',          label: t.back_to_profile, icon: 'user',     color: '#8E8E93', action: 'profile' },
    'divider',
    { id: 'account',       label: t.account,         icon: 'at',       color: '#5E5CE6', action: 'settings', settingsKey: 'account' },
    { id: 'appearance',    label: t.appearance,       icon: 'moon',     color: '#BF5AF2', action: 'settings', settingsKey: 'appearance' },
    { id: 'privacy',       label: t.privacy,          icon: 'lock',     color: '#30D158', action: 'settings', settingsKey: 'privacy' },
    { id: 'notifications', label: t.notifications,    icon: 'bell',     color: '#FF9500', action: 'settings', settingsKey: 'notifications' },
    'divider',
    { id: 'logout',        label: t.log_out,          icon: 'logout',   color: '#FF453A', action: 'logout' },
  ]

  function handleClick(item: NavItem) {
    if (item.action === 'profile')  return onBackToProfile()
    if (item.action === 'logout')   return onLogout()
    if (item.action === 'settings' && item.settingsKey) {
      onSetSettingsKey(item.settingsKey)
    }
  }

  return (
    <nav
      className="flex flex-col flex-shrink-0 gap-0.5"
      style={{
        width: 260,
        borderRight: '0.5px solid var(--hairline)',
        background: 'var(--bg-2)',
        padding: 12,
      }}
    >
      {items.map((item, i) => {
        if (item === 'divider') {
          return <div key={i} style={{ height: 1, background: 'var(--hairline)', margin: '10px 4px' }} />
        }

        const isActive = item.action === 'settings' && item.settingsKey === settingsKey
        const isLogout = item.id === 'logout'

        return (
          <button
            key={item.id}
            onClick={() => handleClick(item)}
            className="flex items-center gap-3 border-none text-left font-medium rounded-[9px] transition-colors duration-150"
            style={{
              padding: '9px 12px',
              fontSize: 14,
              background: isActive ? 'var(--accent)' : 'transparent',
              color: isActive ? 'white' : isLogout ? '#FF453A' : 'var(--text)',
            }}
            onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = 'var(--bg-3)' }}
            onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = 'transparent' }}
          >
            {/* Colored icon badge */}
            <div
              className="flex items-center justify-center rounded-[7px] flex-shrink-0"
              style={{
                width: 26,
                height: 26,
                background: item.color,
                color: 'white',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.25)',
              }}
            >
              <Icon name={item.icon} size={14} />
            </div>
            {item.label}
          </button>
        )
      })}
    </nav>
  )
}
