import { useMemo, useState } from 'react'
import type { Chat, Lang, Tab, User } from '../../types'
import { STR } from '../../i18n'
import { findUser } from '../../data'
import { AltiMark } from '../ui/AltiMark'
import { Avatar } from '../ui/Avatar'
import { Icon } from '../ui/Icon'
import { IconButton } from '../ui/IconButton'
import { ChatRow } from './ChatRow'

interface ChatListProps {
  chats: Chat[]
  selectedId: string
  onSelect: (id: string) => void
  lang: Lang
  tab: Tab
  onSetTab: (tab: Tab) => void
  collapsed: boolean
  onToggleCollapse: () => void
  currentUser: User
}

export function ChatList({
  chats,
  selectedId,
  onSelect,
  lang,
  tab,
  onSetTab,
  collapsed,
  onToggleCollapse,
  currentUser,
}: ChatListProps) {
  const t = STR[lang]
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    if (!query.trim()) return chats
    const needle = query.toLowerCase()
    return chats.filter((c) => {
      const user = findUser(c.userId)
      return (
        user?.name.toLowerCase().includes(needle) ||
        user?.login.toLowerCase().includes(needle) ||
        c.messages.some((m) => (m.text ?? '').toLowerCase().includes(needle))
      )
    })
  }, [chats, query])

  const pinned  = filtered.filter((c) => c.pinned)
  const regular = filtered.filter((c) => !c.pinned)

  // ─── Collapsed rail (icon-only sidebar) ───────────────────────────────

  if (collapsed) {
    return (
      <aside
        className="flex flex-col items-center flex-shrink-0 py-4 gap-3"
        style={{
          width: 76,
          borderRight: '0.5px solid var(--hairline)',
          background: 'var(--bg-2)',
          padding: '16px 8px',
        }}
      >
        <button
          onClick={onToggleCollapse}
          title="Развернуть"
          className="flex items-center justify-center rounded-[10px] border-none"
          style={{ width: 40, height: 40, background: 'var(--bg-3)', color: 'var(--text)' }}
        >
          <Icon name="menu" size={18} />
        </button>

        <div style={{ height: 12 }} />

        {([['chats', 'chat'], ['profile', 'user']] as const).map(([id, icon]) => (
          <button
            key={id}
            onClick={() => onSetTab(id)}
            className="flex items-center justify-center rounded-xl border-none"
            style={{
              width: 44,
              height: 44,
              background: tab === id ? 'var(--accent)' : 'transparent',
              color: tab === id ? 'white' : 'var(--text-2)',
            }}
          >
            <Icon name={icon} size={20} />
          </button>
        ))}

        <div className="flex-1" />

        <button
          onClick={() => onSetTab('profile')}
          className="border-none bg-transparent p-0"
        >
          <Avatar user={currentUser} size={36} />
        </button>
      </aside>
    )
  }

  // ─── Full sidebar ──────────────────────────────────────────────────────

  return (
    <aside
      className="flex flex-col flex-shrink-0 h-full"
      style={{
        width: 'var(--sidebar-w)',
        borderRight: '0.5px solid var(--hairline)',
        background: 'var(--bg-2)',
        minWidth: 0,
      }}
    >
      {/* Header */}
      <div className="flex flex-col gap-3" style={{ padding: '16px 16px 10px' }}>
        {/* Logo row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <AltiMark size={28} />
            <span className="font-bold" style={{ fontSize: 19, letterSpacing: '-0.02em' }}>Alti</span>
          </div>
          <IconButton icon="menu" onClick={onToggleCollapse} title="Свернуть" />
        </div>

        {/* Tab switcher */}
        <div
          className="flex rounded-[10px] gap-0.5"
          style={{ background: 'var(--bg-3)', padding: 3 }}
        >
          {([
            { id: 'chats' as Tab, label: t.tab_chats, icon: 'chat' },
            { id: 'profile' as Tab, label: t.tab_profile, icon: 'user' },
          ] as const).map((item) => (
            <button
              key={item.id}
              onClick={() => onSetTab(item.id)}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg font-semibold border-none transition-all duration-150"
              style={{
                padding: '7px 10px',
                fontSize: 13,
                color: tab === item.id ? 'var(--text)' : 'var(--text-2)',
                background: tab === item.id ? 'var(--surface-elev)' : 'transparent',
                boxShadow: tab === item.id
                  ? '0 1px 2px rgba(0,0,0,0.08), 0 0 0 0.5px var(--hairline)'
                  : 'none',
              }}
            >
              <Icon name={item.icon} size={14} />
              {item.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div
          className="ring flex items-center gap-2 rounded-[10px] border border-transparent"
          style={{ background: 'var(--bg-3)', padding: '8px 12px' }}
        >
          <Icon name="search" size={16} style={{ color: 'var(--text-3)' }} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.search_placeholder}
            className="flex-1 bg-transparent border-none outline-none"
            style={{ fontSize: 14, color: 'var(--text)' }}
          />
        </div>
      </div>

      {/* Chat list */}
      <div className="no-scrollbar flex-1 overflow-y-auto" style={{ padding: '4px 8px 16px' }}>
        {pinned.map((c) => (
          <ChatRow
            key={c.id}
            chat={c}
            selected={selectedId === c.id}
            onClick={() => onSelect(c.id)}
            lang={lang}
          />
        ))}

        {pinned.length > 0 && regular.length > 0 && <div style={{ height: 8 }} />}

        {regular.map((c) => (
          <ChatRow
            key={c.id}
            chat={c}
            selected={selectedId === c.id}
            onClick={() => onSelect(c.id)}
            lang={lang}
          />
        ))}
      </div>
    </aside>
  )
}
