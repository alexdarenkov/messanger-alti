import { useEffect, useState } from 'react'
import type { AppSettings, Chat, Lang, MobileView, Tab, Theme, User } from './types'
import { ME, INITIAL_CHATS } from './data'
import { AuthScreen } from './components/auth/AuthScreen'
import { ChatList } from './components/chat/ChatList'
import { Conversation } from './components/chat/Conversation'
import { ProfileScreen } from './components/profile/ProfileScreen'

// ─── Default app settings ────────────────────────────────────────────────

const DEFAULT_SETTINGS: AppSettings = {
  theme: 'auto',
  accent: '#0A84FF',
  lang: 'ru',
  radius: 14,
  fontSize: 15,
  density: 'normal',
  bubbleStyle: 'rounded',
  sidebarCollapsed: false,
}

// ─── Mobile profile wrapper with back button ──────────────────────────────

function MobileProfileWrap({
  user,
  lang,
  onUpdateUser,
  onLogout,
  onBack,
  settings,
  onSetTheme,
  onSetAccent,
  onSwitchLang,
}: {
  user: User
  lang: Lang
  onUpdateUser: (u: User) => void
  onLogout: () => void
  onBack: () => void
  settings: AppSettings
  onSetTheme: (t: Theme) => void
  onSetAccent: (a: string) => void
  onSwitchLang: (l: Lang) => void
}) {
  return (
    <div className="flex-1 flex flex-col min-h-0" style={{ background: 'var(--bg)' }}>
      {/* Mobile back header */}
      <header
        className="flex items-center gap-2.5"
        style={{
          padding: '12px 16px',
          borderBottom: '0.5px solid var(--hairline)',
          background: 'var(--surface)',
          minHeight: 56,
        }}
      >
        <button
          onClick={onBack}
          className="flex items-center gap-1 border-none bg-transparent font-medium"
          style={{ color: 'var(--accent)', fontSize: 15, padding: 0 }}
        >
          ‹ Назад
        </button>
      </header>

      <div className="flex-1 overflow-y-auto flex">
        <ProfileScreen
          user={user}
          lang={lang}
          onUpdateUser={onUpdateUser}
          onLogout={onLogout}
          theme={settings.theme}
          onSetTheme={onSetTheme}
          accent={settings.accent}
          onSetAccent={onSetAccent}
          onSwitchLang={onSwitchLang}
        />
      </div>
    </div>
  )
}

// ─── Root App component ───────────────────────────────────────────────────

export function App() {
  const [authed, setAuthed]       = useState(false)
  const [user, setUser]           = useState<User>(ME)
  const [chats, setChats]         = useState<Chat[]>(INITIAL_CHATS)
  const [selectedChatId, setSelectedChatId] = useState<string>('c1')
  const [tab, setTab]             = useState<Tab>('chats')
  const [isMobile, setIsMobile]   = useState(window.innerWidth < 760)
  const [mobileView, setMobileView] = useState<MobileView>('list')
  const [settings, setSettings]   = useState<AppSettings>(DEFAULT_SETTINGS)

  // ── Responsive layout detection ─────────────────────────────────────
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 760)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  // ── Theme application ────────────────────────────────────────────────
  useEffect(() => {
    const root = document.documentElement
    let resolved = settings.theme
    if (settings.theme === 'auto') {
      resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    root.setAttribute('data-theme', resolved)
  }, [settings.theme])

  // ── CSS variable updates when settings change ────────────────────────
  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--accent', settings.accent)
    root.style.setProperty('--accent-soft', `color-mix(in oklab, ${settings.accent} 18%, transparent)`)
    root.style.setProperty('--radius', `${settings.radius}px`)
    root.style.setProperty('--radius-lg', `${settings.radius + 8}px`)
    root.style.setProperty('--radius-sm', `${Math.max(settings.radius - 4, 4)}px`)
    root.style.setProperty('--font-base', `${settings.fontSize}px`)
    root.style.setProperty('--bubble-radius', settings.bubbleStyle === 'square' ? '8px' : `${settings.radius + 6}px`)
    root.style.setProperty('--sidebar-w', isMobile ? '100vw' : '320px')
  }, [settings.accent, settings.radius, settings.fontSize, settings.bubbleStyle, isMobile])

  // ── Mobile: sync tab changes to mobileView ───────────────────────────
  useEffect(() => {
    if (!isMobile) return
    if (tab === 'profile') setMobileView('profile')
    else setMobileView('list')
  }, [tab, isMobile])

  function updateSetting<K extends keyof AppSettings>(key: K, value: AppSettings[K]) {
    setSettings((s) => ({ ...s, [key]: value }))
  }

  function selectChat(id: string) {
    setSelectedChatId(id)
    if (isMobile) setMobileView('chat')
    setTab('chats')
    setChats((cs) => cs.map((c) => c.id === id ? { ...c, unread: 0 } : c))
  }

  function updateChat(updated: Chat) {
    setChats((cs) => cs.map((c) => c.id === updated.id ? updated : c))
  }

  const selectedChat = chats.find((c) => c.id === selectedChatId)

  // ── Auth screen ──────────────────────────────────────────────────────
  if (!authed) {
    return (
      <AuthScreen
        lang={settings.lang}
        onAuth={(u) => { setUser(u); setAuthed(true) }}
        onSwitchLang={(l) => updateSetting('lang', l)}
      />
    )
  }

  // ── Shared sidebar + content wrappers ────────────────────────────────

  const sidebar = (
    <ChatList
      chats={chats}
      selectedId={selectedChatId}
      onSelect={selectChat}
      lang={settings.lang}
      tab={tab}
      onSetTab={setTab}
      collapsed={!isMobile && settings.sidebarCollapsed}
      onToggleCollapse={() => updateSetting('sidebarCollapsed', !settings.sidebarCollapsed)}
      currentUser={user}
    />
  )

  const profilePanel = (
    <ProfileScreen
      user={user}
      lang={settings.lang}
      onUpdateUser={setUser}
      onLogout={() => setAuthed(false)}
      theme={settings.theme}
      onSetTheme={(t) => updateSetting('theme', t)}
      accent={settings.accent}
      onSetAccent={(a) => updateSetting('accent', a)}
      onSwitchLang={(l) => updateSetting('lang', l)}
    />
  )

  // ── Mobile layout ────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <div className="relative z-10 flex flex-col h-screen">
        {mobileView === 'list' && sidebar}
        {mobileView === 'chat' && (
          <Conversation
            chat={selectedChat}
            lang={settings.lang}
            bubbleStyle={settings.bubbleStyle}
            density={settings.density}
            onBack={() => setMobileView('list')}
            onUpdateChat={updateChat}
          />
        )}
        {mobileView === 'profile' && (
          <MobileProfileWrap
            user={user}
            lang={settings.lang}
            onUpdateUser={setUser}
            onLogout={() => setAuthed(false)}
            onBack={() => { setTab('chats'); setMobileView('list') }}
            settings={settings}
            onSetTheme={(t) => updateSetting('theme', t)}
            onSetAccent={(a) => updateSetting('accent', a)}
            onSwitchLang={(l) => updateSetting('lang', l)}
          />
        )}
      </div>
    )
  }

  // ── Desktop layout ───────────────────────────────────────────────────
  return (
    <div
      className="relative z-10 flex h-screen"
      style={{ maxWidth: 1440, margin: '0 auto' }}
    >
      {sidebar}

      {tab === 'chats' ? (
        <Conversation
          chat={selectedChat}
          lang={settings.lang}
          bubbleStyle={settings.bubbleStyle}
          density={settings.density}
          onUpdateChat={updateChat}
        />
      ) : (
        profilePanel
      )}
    </div>
  )
}
