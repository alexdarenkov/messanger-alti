import { useEffect, useRef, useState } from 'react'
import type { Chat, Lang, BubbleStyle, Density, Message } from '../../types'
import { STR } from '../../i18n'
import { findUser } from '../../data'
import { Avatar } from '../ui/Avatar'
import { Icon } from '../ui/Icon'
import { IconButton } from '../ui/IconButton'
import { Bubble, DayDivider, TypingBubble } from './Bubble'
import { ContactProfileDrawer } from './ContactProfileDrawer'

interface MessageGroup {
  day: Date
  items: Message[]
}

function groupByDay(messages: Message[]): MessageGroup[] {
  const groups: MessageGroup[] = []
  let lastDay = ''

  for (const msg of messages) {
    const day = new Date(msg.at).toDateString()
    if (day !== lastDay) {
      groups.push({ day: msg.at, items: [] })
      lastDay = day
    }
    groups[groups.length - 1]!.items.push(msg)
  }

  return groups
}

// ─── Context menu item ────────────────────────────────────────────────────

function MenuItem({
  icon,
  label,
  trailing,
  destructive = false,
  onClick,
}: {
  icon: Parameters<typeof Icon>[0]['name']
  label: string
  trailing?: React.ReactNode
  destructive?: boolean
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2.5 w-full border-none rounded-[9px] font-medium text-left"
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
      <span className="flex-1">{label}</span>
      {trailing}
    </button>
  )
}

// ─── Empty state (no chat selected) ──────────────────────────────────────

function EmptyState({ lang }: { lang: Lang }) {
  const t = STR[lang]
  return (
    <main className="flex-1 flex items-center justify-center p-8" style={{ background: 'var(--bg)' }}>
      <div className="flex flex-col items-center text-center" style={{ maxWidth: 320 }}>
        <div
          className="flex items-center justify-center rounded-3xl mb-4"
          style={{ width: 88, height: 88, background: 'var(--bg-3)', color: 'var(--text-3)' }}
        >
          <Icon name="chat" size={36} />
        </div>
        <h2 className="font-semibold m-0" style={{ fontSize: 18, color: 'var(--text)' }}>
          {t.select_chat}
        </h2>
        <p className="mt-1.5 m-0" style={{ fontSize: 14, color: 'var(--text-2)' }}>
          {t.select_chat_sub}
        </p>
      </div>
    </main>
  )
}

// ─── Conversation component ───────────────────────────────────────────────

interface ConversationProps {
  chat: Chat | undefined
  lang: Lang
  bubbleStyle: BubbleStyle
  density: Density
  onBack?: () => void
  onUpdateChat: (chat: Chat) => void
}

export function Conversation({
  chat,
  lang,
  bubbleStyle,
  density,
  onBack,
  onUpdateChat,
}: ConversationProps) {
  const t = STR[lang]

  const [draft, setDraft]           = useState('')
  const [replyToId, setReplyToId]   = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [menuOpen, setMenuOpen]     = useState(false)
  const [muted, setMuted]           = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [blocked, setBlocked]       = useState(false)

  const scrollRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [chat?.id, chat?.messages.length])

  if (!chat) return <EmptyState lang={lang} />

  const chatUser  = findUser(chat.userId)
  const pinnedMsg = chat.pinnedMessageId
    ? chat.messages.find((m) => m.id === chat.pinnedMessageId)
    : null
  const replyMsg = replyToId
    ? chat.messages.find((m) => m.id === replyToId)
    : null

  const groups = groupByDay(chat.messages)

  function sendMessage() {
    if (!draft.trim()) return
    const newMsg: Message = {
      id: `m${Date.now()}`,
      from: 'me',
      text: draft.trim(),
      at: new Date(),
      status: 'delivered',
      ...(replyToId ? { reply: replyToId } : {}),
    }
    onUpdateChat({ ...chat, messages: [...chat.messages, newMsg] })
    setDraft('')
    setReplyToId(null)
  }

  function toggleReaction(msgId: string, emoji: string) {
    const messages = chat.messages.map((m) => {
      if (m.id !== msgId) return m
      const reactions = m.reactions ?? []
      return {
        ...m,
        reactions: reactions.includes(emoji)
          ? reactions.filter((e) => e !== emoji)
          : [...reactions, emoji],
      }
    })
    onUpdateChat({ ...chat, messages })
  }

  const searchResultCount = searchQuery
    ? chat.messages.filter((m) => (m.text ?? '').toLowerCase().includes(searchQuery.toLowerCase())).length
    : 0

  if (!chatUser) return null

  return (
    <main
      className="flex-1 flex flex-col min-w-0"
      style={{ background: 'var(--bg)' }}
    >
      {/* ── Chat header ───────────────────────────────────────────────── */}
      <header
        className="flex items-center gap-3 relative z-30"
        style={{
          padding: '12px 18px',
          borderBottom: '0.5px solid var(--hairline)',
          background: 'var(--surface)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          minHeight: 64,
        }}
      >
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center border-none bg-transparent p-0"
            style={{ color: 'var(--accent)' }}
          >
            <Icon name="back" size={22} />
          </button>
        )}

        <div
          onClick={() => setProfileOpen(true)}
          className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer"
        >
          <Avatar user={chatUser} size={40} online={!!chatUser.online} />
          <div className="flex flex-col min-w-0">
            <span className="font-semibold truncate" style={{ fontSize: 15, color: 'var(--text)' }}>
              {chatUser.name}
            </span>
            <span
              style={{
                fontSize: 12.5,
                color: chat.typing ? 'var(--accent)' : 'var(--text-2)',
              }}
            >
              {chat.typing
                ? t.typing
                : chatUser.group
                ? `${chatUser.members} ${t.members}`
                : chatUser.online
                ? t.online
                : t.last_seen
              }
            </span>
          </div>
        </div>

        <IconButton
          icon="search"
          active={searchOpen}
          onClick={() => setSearchOpen((v) => !v)}
        />

        {/* More menu */}
        <div className="relative">
          <IconButton
            icon="more"
            active={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          />

          {menuOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setMenuOpen(false)}
              />
              <div
                className="glass absolute right-0 z-50 animate-pop-in"
                style={{
                  top: 'calc(100% + 8px)',
                  minWidth: 240,
                  borderRadius: 14,
                  padding: 6,
                  boxShadow: 'var(--shadow-1)',
                  border: '0.5px solid var(--hairline)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                }}
              >
                <MenuItem
                  icon="bell"
                  label={muted ? t.unmute : t.mute}
                  trailing={
                    <span style={{ fontSize: 12, color: 'var(--text-3)' }}>
                      {muted ? t.off : t.on}
                    </span>
                  }
                  onClick={() => { setMuted((v) => !v); setMenuOpen(false) }}
                />
                <MenuItem
                  icon="pin"
                  label={chat.pinned ? t.unpin_chat : t.pin_chat}
                  onClick={() => { onUpdateChat({ ...chat, pinned: !chat.pinned }); setMenuOpen(false) }}
                />
                <MenuItem
                  icon="user"
                  label={t.open_profile}
                  onClick={() => { setMenuOpen(false); setProfileOpen(true) }}
                />
                <div style={{ height: 1, background: 'var(--hairline)', margin: '4px 6px' }} />
                <MenuItem
                  icon="trash"
                  label={t.delete_chat}
                  destructive
                  onClick={() => setMenuOpen(false)}
                />
              </div>
            </>
          )}
        </div>
      </header>

      {/* ── Search bar ────────────────────────────────────────────────── */}
      {searchOpen && (
        <div
          className="flex items-center gap-2.5 animate-slide-up"
          style={{
            padding: '10px 18px',
            borderBottom: '0.5px solid var(--hairline)',
            background: 'var(--surface-2)',
          }}
        >
          <div
            className="ring flex-1 flex items-center gap-2 rounded-[10px] border border-transparent"
            style={{ background: 'var(--bg-3)', padding: '8px 12px' }}
          >
            <Icon name="search" size={16} style={{ color: 'var(--text-3)' }} />
            <input
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.search_messages}
              className="flex-1 bg-transparent border-none outline-none"
              style={{ fontSize: 14, color: 'var(--text)' }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="flex border-none bg-transparent p-0"
                style={{ color: 'var(--text-3)' }}
              >
                <Icon name="x" size={14} />
              </button>
            )}
          </div>
          <span style={{ fontSize: 12.5, color: 'var(--text-3)', minWidth: 60, textAlign: 'right' }}>
            {searchQuery ? `${searchResultCount} ${t.found}` : ''}
          </span>
          <button
            onClick={() => { setSearchOpen(false); setSearchQuery('') }}
            className="border-none bg-transparent font-medium"
            style={{ fontSize: 14, color: 'var(--accent)', padding: '0 4px' }}
          >
            {t.done}
          </button>
        </div>
      )}

      {/* ── Pinned message bar ────────────────────────────────────────── */}
      {pinnedMsg && (
        <div
          className="flex items-center gap-2.5"
          style={{
            padding: '8px 18px',
            borderBottom: '0.5px solid var(--hairline)',
            background: 'var(--surface-2)',
            fontSize: 13,
          }}
        >
          <div
            className="rounded-sm flex-shrink-0"
            style={{ width: 3, height: 28, background: 'var(--accent)' }}
          />
          <div className="flex-1 min-w-0">
            <div className="font-semibold" style={{ color: 'var(--accent)', fontSize: 12 }}>
              {t.pinned_message}
            </div>
            <div className="truncate" style={{ color: 'var(--text-2)' }}>
              {pinnedMsg.kind === 'photo' ? `📷 ${t.photo}` : pinnedMsg.text}
            </div>
          </div>
          <Icon name="pin" size={15} style={{ color: 'var(--text-3)' }} />
        </div>
      )}

      {/* ── Messages ──────────────────────────────────────────────────── */}
      <div
        ref={scrollRef}
        className="no-scrollbar flex-1 overflow-y-auto flex flex-col"
        style={{ padding: '16px 18px 8px', gap: density === 'compact' ? 6 : density === 'spacious' ? 14 : 10 }}
      >
        {groups.map((group, groupIndex) => (
          <div key={groupIndex}>
            <DayDivider date={group.day} lang={lang} />
            {group.items.map((msg, idx) => {
              const prev    = group.items[idx - 1]
              const grouped = !!prev
                && prev.from === msg.from
                && new Date(msg.at).getTime() - new Date(prev.at).getTime() < 5 * 60 * 1000

              return (
                <Bubble
                  key={msg.id}
                  msg={msg}
                  chatUser={chatUser}
                  grouped={grouped}
                  bubbleStyle={bubbleStyle}
                  density={density}
                  onReply={() => setReplyToId(msg.id)}
                  replyTarget={msg.reply ? chat.messages.find((x) => x.id === msg.reply) : undefined}
                  onReact={(emoji) => toggleReaction(msg.id, emoji)}
                />
              )
            })}
          </div>
        ))}

        {chat.typing && <TypingBubble user={chatUser} />}
      </div>

      {/* ── Reply preview ─────────────────────────────────────────────── */}
      {replyMsg && (
        <div
          className="flex items-center gap-2.5"
          style={{
            padding: '8px 18px',
            borderTop: '0.5px solid var(--hairline)',
            background: 'var(--bg-2)',
          }}
        >
          <Icon name="reply" size={16} style={{ color: 'var(--accent)' }} />
          <div className="flex-1 min-w-0">
            <div className="font-semibold" style={{ fontSize: 12, color: 'var(--accent)' }}>
              {t.reply_to} {replyMsg.from === 'me' ? t.reply_to_me : findUser(replyMsg.from)?.name}
            </div>
            <div className="truncate" style={{ fontSize: 13, color: 'var(--text-2)' }}>
              {replyMsg.text ?? `📷 ${t.photo}`}
            </div>
          </div>
          <button
            onClick={() => setReplyToId(null)}
            className="flex border-none bg-transparent"
            style={{ color: 'var(--text-3)' }}
          >
            <Icon name="x" size={16} />
          </button>
        </div>
      )}

      {/* ── Composer ──────────────────────────────────────────────────── */}
      <div
        className="flex items-center gap-2"
        style={{
          padding: '12px 18px 16px',
          borderTop: '0.5px solid var(--hairline)',
          background: 'var(--bg-2)',
        }}
      >
        <IconButton icon="paperclip" />

        {/* Text input */}
        <div
          className="ring flex-1 flex items-end gap-2"
          style={{
            background: 'var(--surface-elev)',
            border: '1px solid var(--hairline)',
            borderRadius: 22,
            padding: '8px 14px',
            minHeight: 40,
          }}
        >
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                sendMessage()
              }
            }}
            placeholder={t.message_placeholder}
            rows={1}
            className="flex-1 bg-transparent border-none outline-none resize-none no-scrollbar"
            style={{
              fontSize: 14.5,
              color: 'var(--text)',
              lineHeight: 1.4,
              padding: '4px 0',
              maxHeight: 140,
              overflowY: 'auto',
              fontFamily: 'inherit',
            }}
          />
          <button
            className="flex border-none bg-transparent p-1"
            style={{ color: 'var(--text-3)' }}
          >
            <Icon name="smile" size={18} />
          </button>
        </div>

        {/* Send / mic button */}
        {draft.trim() ? (
          <button
            onClick={sendMessage}
            className="flex items-center justify-center flex-shrink-0 border-none animate-pop-in"
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              background: 'var(--accent)',
              color: 'white',
            }}
          >
            <Icon name="send" size={18} />
          </button>
        ) : (
          <button
            className="flex items-center justify-center flex-shrink-0 border-none"
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              background: 'var(--bg-3)',
              color: 'var(--text-2)',
            }}
          >
            <Icon name="mic" size={18} />
          </button>
        )}
      </div>

      {/* ── Contact profile drawer ────────────────────────────────────── */}
      {profileOpen && (
        <ContactProfileDrawer
          user={chatUser}
          chat={chat}
          lang={lang}
          muted={muted}
          blocked={blocked}
          onMute={() => setMuted((v) => !v)}
          onBlock={() => setBlocked((v) => !v)}
          onClearHistory={() => { onUpdateChat({ ...chat, messages: [] }); setProfileOpen(false) }}
          onClose={() => setProfileOpen(false)}
        />
      )}
    </main>
  )
}
