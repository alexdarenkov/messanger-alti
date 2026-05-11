// ─── User & Chat entities ─────────────────────────────────────────────────

export interface User {
  id: string
  name: string
  login: string
  email: string
  /** CSS gradient string used as avatar background */
  avatar?: string
  /** CSS gradient string used as initials circle background */
  color?: string
  /** Two-letter initials shown inside the avatar circle */
  initials: string
  bio: string
  /** Array of CSS gradient strings used as album photos */
  album: string[]
  online?: boolean
  group?: boolean
  members?: number
}

export type MessageKind = 'text' | 'photo' | 'voice'
export type MessageStatus = 'sent' | 'delivered' | 'read'

export interface Message {
  id: string
  from: string // 'me' | userId
  text?: string
  kind?: MessageKind
  at: Date
  status?: MessageStatus
  reactions?: string[]
  /** ID of the message being replied to */
  reply?: string
  /** Duration in seconds (voice messages only) */
  duration?: number
}

export interface Chat {
  id: string
  userId: string
  pinned?: boolean
  unread: number
  typing?: boolean
  messages: Message[]
  pinnedMessageId?: string
}

// ─── App settings ─────────────────────────────────────────────────────────

export type Lang = 'ru' | 'en'
export type Theme = 'light' | 'dark' | 'auto'
export type Density = 'compact' | 'normal' | 'spacious'
export type BubbleStyle = 'rounded' | 'square'

export interface AppSettings {
  theme: Theme
  accent: string
  lang: Lang
  radius: number
  fontSize: number
  density: Density
  bubbleStyle: BubbleStyle
  sidebarCollapsed: boolean
}

// ─── Navigation ────────────────────────────────────────────────────────────

/** Top-level tab in the sidebar */
export type Tab = 'chats' | 'profile'

/** Which view is shown on mobile */
export type MobileView = 'list' | 'chat' | 'profile'
