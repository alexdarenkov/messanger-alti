import { useState } from 'react'
import type { Message, Density, BubbleStyle } from '../../types'
import { findUser, formatTime } from '../../data'
import { Avatar } from '../ui/Avatar'
import { Icon } from '../ui/Icon'

// ─── Photo placeholder bubble ─────────────────────────────────────────────

function PhotoBubble({ isMe, radius }: { isMe: boolean; radius: number | string }) {
  return (
    <div
      className="relative overflow-hidden flex items-center justify-center"
      style={{
        width: 240,
        height: 180,
        borderRadius: typeof radius === 'number' ? radius : 18,
        background: 'linear-gradient(135deg, #FF9500 0%, #FF375F 50%, #5E5CE6 100%)',
        color: 'rgba(255,255,255,0.85)',
      }}
    >
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.25), transparent 60%)' }}
      />
      <Icon name="image" size={40} style={{ opacity: 0.6 }} />
      <div
        className="absolute"
        style={{ bottom: 10, right: 12, fontSize: 11, color: 'white', textShadow: '0 1px 2px rgba(0,0,0,0.4)' }}
      >
        figma-export.png
      </div>
    </div>
  )
}

// ─── Voice message bubble ─────────────────────────────────────────────────

function VoiceBubble({
  msg,
  isMe,
  radius,
  padX,
  padY,
}: {
  msg: Message
  isMe: boolean
  radius: number | string
  padX: number
  padY: number
}) {
  const bars = Array.from({ length: 28 }, (_, i) => 0.3 + Math.abs(Math.sin(i * 1.7)) * 0.7)

  return (
    <div
      className="flex items-center gap-2.5"
      style={{
        background: isMe ? 'var(--accent)' : 'var(--bubble-in)',
        color: isMe ? 'white' : 'var(--bubble-in-text)',
        padding: `${padY + 2}px ${padX}px`,
        borderRadius: typeof radius === 'number' ? radius : 'var(--bubble-radius)',
        minWidth: 220,
      }}
    >
      <button
        className="flex items-center justify-center rounded-full border-none flex-shrink-0"
        style={{
          width: 32,
          height: 32,
          background: isMe ? 'rgba(255,255,255,0.25)' : 'var(--accent)',
          color: 'white',
        }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z"/>
        </svg>
      </button>

      <div className="flex items-center gap-0.5 flex-1" style={{ height: 24 }}>
        {bars.map((h, i) => (
          <div
            key={i}
            style={{
              width: 2,
              height: `${h * 100}%`,
              background: isMe ? 'rgba(255,255,255,0.7)' : 'var(--text-3)',
              borderRadius: 1,
            }}
          />
        ))}
      </div>

      <span className="flex-shrink-0" style={{ fontSize: 11, opacity: 0.8, fontVariantNumeric: 'tabular-nums' }}>
        0:{String(msg.duration ?? 12).padStart(2, '0')}
      </span>
    </div>
  )
}

// ─── Typing indicator ─────────────────────────────────────────────────────

export function TypingBubble({ user }: { user: ReturnType<typeof findUser> }) {
  if (!user) return null
  return (
    <div className="flex gap-2 mt-1">
      <Avatar user={user} size={28} />
      <div
        className="flex gap-1"
        style={{ background: 'var(--bubble-in)', padding: '10px 14px', borderRadius: 'var(--bubble-radius)' }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="rounded-full"
            style={{
              width: 6,
              height: 6,
              background: 'var(--text-3)',
              animation: `typing-dot 1.2s ${i * 0.15}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Day divider ──────────────────────────────────────────────────────────

export function DayDivider({ date, lang }: { date: Date; lang: string }) {
  const now  = new Date()
  const d    = new Date(date)
  let label  = ''

  if (d.toDateString() === now.toDateString()) {
    label = lang === 'ru' ? 'Сегодня' : 'Today'
  } else {
    const yesterday = new Date(now)
    yesterday.setDate(now.getDate() - 1)
    if (d.toDateString() === yesterday.toDateString()) {
      label = lang === 'ru' ? 'Вчера' : 'Yesterday'
    } else {
      label = d.toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'en-US', { day: 'numeric', month: 'long' })
    }
  }

  return (
    <div className="flex justify-center my-2">
      <div
        className="glass rounded-full font-medium"
        style={{ padding: '4px 12px', fontSize: 11.5, color: 'var(--text-2)' }}
      >
        {label}
      </div>
    </div>
  )
}

// ─── Message bubble ───────────────────────────────────────────────────────

interface BubbleProps {
  msg: Message
  /** The other participant in the chat (for avatar) */
  chatUser: ReturnType<typeof findUser>
  /** True when same sender as previous message within 5 min */
  grouped: boolean
  bubbleStyle: BubbleStyle
  density: Density
  onReply: () => void
  replyTarget: Message | undefined
  onReact: (emoji: string) => void
}

export function Bubble({
  msg,
  chatUser,
  grouped,
  bubbleStyle,
  density,
  onReply,
  replyTarget,
  onReact,
}: BubbleProps) {
  const [hovered, setHovered] = useState(false)

  const isMe = msg.from === 'me'

  const radius: number | string = bubbleStyle === 'square' ? 6 : 'var(--bubble-radius)' as unknown as number
  const tailRadius = 6

  const padX = density === 'compact' ? 11 : density === 'spacious' ? 16 : 13
  const padY = density === 'compact' ? 7  : density === 'spacious' ? 11 : 8

  return (
    <div
      className="flex gap-2"
      style={{
        flexDirection: isMe ? 'row-reverse' : 'row',
        marginTop: grouped ? 2 : 6,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Avatar column (incoming only) */}
      {!isMe && (
        <div style={{ width: 28, flexShrink: 0 }}>
          {!grouped && chatUser && <Avatar user={chatUser} size={28} />}
        </div>
      )}

      <div
        className="flex flex-col"
        style={{ maxWidth: 'min(560px, 70%)', alignItems: isMe ? 'flex-end' : 'flex-start' }}
      >
        {/* Quoted reply snippet */}
        {replyTarget && (
          <div
            style={{
              padding: '4px 10px',
              fontSize: 12.5,
              color: 'var(--text-2)',
              borderLeft: '2px solid var(--accent)',
              background: 'var(--bg-2)',
              borderRadius: '8px 8px 0 0',
              marginBottom: -4,
              maxWidth: '100%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              alignSelf: isMe ? 'flex-end' : 'flex-start',
            }}
          >
            <div style={{ color: 'var(--accent)', fontWeight: 600, fontSize: 11 }}>
              {replyTarget.from === 'me' ? 'Вы' : findUser(replyTarget.from)?.name}
            </div>
            {replyTarget.text ?? '📷 Photo'}
          </div>
        )}

        {/* Bubble content */}
        <div className="relative">
          {msg.kind === 'photo' ? (
            <PhotoBubble isMe={isMe} radius={radius} />
          ) : msg.kind === 'voice' ? (
            <VoiceBubble msg={msg} isMe={isMe} radius={radius} padX={padX} padY={padY} />
          ) : (
            <div
              style={{
                background: isMe ? 'var(--accent)' : 'var(--bubble-in)',
                color: isMe ? 'white' : 'var(--bubble-in-text)',
                padding: `${padY}px ${padX}px`,
                borderRadius: typeof radius === 'number' ? radius : 'var(--bubble-radius)',
                borderBottomRightRadius: isMe && !grouped ? tailRadius : typeof radius === 'number' ? radius : undefined,
                borderBottomLeftRadius: !isMe && !grouped ? tailRadius : typeof radius === 'number' ? radius : undefined,
                fontSize: 14.5,
                lineHeight: 1.4,
                wordBreak: 'break-word',
                whiteSpace: 'pre-wrap',
                boxShadow: isMe
                  ? '0 2px 8px -2px color-mix(in oklab, var(--accent) 50%, transparent)'
                  : 'none',
              }}
            >
              {msg.text}
              {/* Timestamp + status */}
              <span
                style={{
                  fontSize: 10.5,
                  color: isMe ? 'rgba(255,255,255,0.75)' : 'var(--text-3)',
                  marginLeft: 8,
                  fontWeight: 500,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 2,
                  verticalAlign: 'baseline',
                  float: 'right',
                  marginTop: 4,
                  marginRight: -2,
                }}
              >
                {formatTime(msg.at)}
                {isMe && (
                  msg.status === 'read'
                    ? <Icon name="check-double" size={13} style={{ marginLeft: 2 }} />
                    : <Icon name="check" size={13} style={{ marginLeft: 2 }} />
                )}
              </span>
            </div>
          )}

          {/* Hover action bar */}
          {hovered && (
            <div
              className="absolute flex gap-0.5 rounded-full animate-pop-in"
              style={{
                top: -10,
                [isMe ? 'left' : 'right']: -8,
                transform: isMe ? 'translateX(-100%)' : 'translateX(100%)',
                background: 'var(--surface-elev)',
                borderRadius: 100,
                padding: 3,
                boxShadow: 'var(--shadow-1)',
                border: '0.5px solid var(--hairline)',
                zIndex: 5,
              }}
            >
              {['❤️', '😂', '👍'].map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => onReact(emoji)}
                  className="border-none bg-transparent rounded-full flex items-center justify-center"
                  style={{ padding: 4, fontSize: 14, width: 26, height: 26 }}
                >
                  {emoji}
                </button>
              ))}
              <button
                onClick={onReply}
                className="border-none bg-transparent rounded-full flex items-center justify-center"
                style={{ padding: 4, width: 26, height: 26, color: 'var(--text-2)' }}
              >
                <Icon name="reply" size={14} />
              </button>
            </div>
          )}
        </div>

        {/* Reaction chips */}
        {msg.reactions && msg.reactions.length > 0 && (
          <div
            className="flex gap-1 relative"
            style={{
              marginTop: -8,
              alignSelf: isMe ? 'flex-end' : 'flex-start',
              background: 'var(--surface-elev)',
              borderRadius: 100,
              padding: '2px 8px',
              boxShadow: '0 0 0 0.5px var(--hairline)',
              fontSize: 13,
              zIndex: 1,
            }}
          >
            {msg.reactions.join(' ')}
          </div>
        )}
      </div>
    </div>
  )
}
