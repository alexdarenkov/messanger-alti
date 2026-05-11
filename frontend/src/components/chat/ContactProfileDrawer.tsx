import type { Chat, Lang, User } from '../../types'
import { STR } from '../../i18n'
import { Avatar } from '../ui/Avatar'
import { Icon } from '../ui/Icon'

interface ContactProfileDrawerProps {
  user: User
  chat: Chat
  lang: Lang
  muted: boolean
  blocked: boolean
  onMute: () => void
  onBlock: () => void
  onClearHistory: () => void
  onClose: () => void
}

/** Slide-in drawer showing a contact's profile and quick actions */
export function ContactProfileDrawer({
  user,
  chat,
  lang,
  muted,
  onMute,
  onClearHistory,
  onClose,
}: ContactProfileDrawerProps) {
  const t = STR[lang]

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 animate-fade-in"
        style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}
        onClick={onClose}
      />

      {/* Centered modal */}
      <div
        className="glass fixed z-50 flex flex-col animate-centered-pop-in overflow-y-auto"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(400px, 90vw)',
          maxHeight: '80vh',
          borderRadius: 24,
          boxShadow: 'var(--shadow-1)',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between"
          style={{ padding: '16px 20px', borderBottom: '0.5px solid var(--hairline)' }}
        >
          <h2 className="font-semibold m-0" style={{ fontSize: 17, color: 'var(--text)' }}>
            {t.open_profile}
          </h2>
          <button
            onClick={onClose}
            className="flex items-center justify-center rounded-[9px] border-none bg-transparent"
            style={{ width: 32, height: 32, color: 'var(--text-2)' }}
          >
            <Icon name="x" size={18} />
          </button>
        </div>

        {/* Avatar + name */}
        <div className="flex flex-col items-center gap-3 py-8 px-6">
          <Avatar user={user} size={88} online={!!user.online} />
          <div className="text-center">
            <div className="font-bold" style={{ fontSize: 22, letterSpacing: '-0.02em', color: 'var(--text)' }}>
              {user.name}
            </div>
            <div style={{ fontSize: 14, color: 'var(--text-2)', marginTop: 2 }}>
              @{user.login}
            </div>
          </div>
        </div>

        {/* Bio */}
        {user.bio && (
          <div style={{ padding: '0 20px 20px' }}>
            <p style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--text)', margin: 0 }}>
              {user.bio}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-1" style={{ padding: '0 12px' }}>
          <DrawerAction
            icon={muted ? 'bell' : 'bell'}
            label={muted ? t.unmute : t.mute}
            onClick={onMute}
          />
          <DrawerAction
            icon="pin"
            label={chat.pinned ? t.unpin_chat : t.pin_chat}
            onClick={() => {}}
          />
          <div style={{ height: 1, background: 'var(--hairline)', margin: '6px 4px' }} />
          <DrawerAction
            icon="trash"
            label={t.delete_chat}
            onClick={onClearHistory}
            destructive
          />
        </div>
      </div>
    </>
  )
}

function DrawerAction({
  icon,
  label,
  onClick,
  destructive = false,
}: {
  icon: Parameters<typeof Icon>[0]['name']
  label: string
  onClick: () => void
  destructive?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2.5 w-full border-none rounded-[9px] font-medium text-left transition-colors duration-150"
      style={{
        padding: '9px 10px',
        background: 'transparent',
        color: destructive ? '#FF453A' : 'var(--text)',
        fontSize: 14,
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-3)' }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
    >
      <Icon name={icon} size={16} style={{ color: destructive ? '#FF453A' : 'var(--text-2)' }} />
      {label}
    </button>
  )
}
