import { useState } from 'react'
import type { Chat, Lang } from '../../types'
import { STR } from '../../i18n'
import { findUser, lastMessage, formatTime } from '../../data'
import { Avatar } from '../ui/Avatar'
import { Icon } from '../ui/Icon'

interface ChatRowProps {
  chat: Chat
  selected: boolean
  onClick: () => void
  lang: Lang
}

export function ChatRow({ chat, selected, onClick, lang }: ChatRowProps) {
  const [hovered, setHovered] = useState(false)
  const t    = STR[lang]
  const user = findUser(chat.userId)
  const last = lastMessage(chat)

  if (!user || !last) return null

  const isFromMe = last.from === 'me'
  const lastText = last.kind === 'voice'
    ? `🎤 ${t.voice_msg} · 0:${String(last.duration ?? 12).padStart(2, '0')}`
    : last.kind === 'photo'
    ? `📷 ${t.photo}`
    : last.text ?? ''

  const bg = selected
    ? 'var(--accent)'
    : hovered
    ? 'var(--bg-3)'
    : 'transparent'

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex gap-3 rounded-xl mb-0.5 cursor-pointer transition-colors duration-150"
      style={{ padding: '10px 12px', background: bg, color: selected ? 'white' : 'var(--text)' }}
    >
      <Avatar user={user} size={44} online={!!user.online} />

      <div className="flex-1 min-w-0 flex flex-col gap-0.5">
        {/* Name + timestamp */}
        <div className="flex items-baseline justify-between gap-2">
          <span className="font-semibold truncate" style={{ fontSize: 14.5 }}>
            {user.name}
          </span>
          <span className="flex-shrink-0" style={{ fontSize: 11.5, color: selected ? 'rgba(255,255,255,0.85)' : 'var(--text-3)' }}>
            {formatTime(last.at)}
          </span>
        </div>

        {/* Preview + badges */}
        <div className="flex items-center gap-1.5 min-w-0">
          <span
            className="flex-1 truncate"
            style={{
              fontSize: 13.5,
              color: selected ? 'rgba(255,255,255,0.85)' : 'var(--text-2)',
              fontStyle: chat.typing ? 'italic' : 'normal',
            }}
          >
            {chat.typing
              ? t.typing
              : isFromMe
              ? `Вы: ${lastText}`
              : lastText
            }
          </span>

          {chat.pinned && !selected && (
            <Icon name="pin" size={12} style={{ color: 'var(--text-3)', flexShrink: 0 }} />
          )}

          {chat.unread > 0 && (
            <div
              className="flex items-center justify-center font-bold flex-shrink-0"
              style={{
                fontSize: 11,
                minWidth: 20,
                height: 20,
                borderRadius: 10,
                padding: '0 6px',
                background: selected ? 'white' : 'var(--accent)',
                color: selected ? 'var(--accent)' : 'white',
              }}
            >
              {chat.unread}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
