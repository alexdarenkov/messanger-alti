import type { User, Chat, Message } from './types'

// ─── Login suggestion helpers ─────────────────────────────────────────────

const TAKEN_LOGINS = new Set([
  'alex', 'alexey', 'anna', 'ann', 'andrey', 'andy', 'admin', 'test',
  'darenkov', 'ivan', 'ivanov', 'maria', 'mary', 'kate', 'katya',
  'messenger', 'alti', 'support', 'official', 'root',
])

const ADJ  = ['swift','calm','bright','wild','lucky','neon','silver','amber','violet','cosmic','lunar','solar','quiet','bold','vivid','azure']
const NOUN = ['fox','wave','echo','river','spark','pixel','comet','drift','haze','ember','frost','loop','ridge','moss','dune','tide']

export function suggestLogin(email: string = ''): string {
  const base = (email.split('@')[0] ?? 'user').toLowerCase().replace(/[^a-z0-9]/g, '')

  for (let i = 0; i < 8; i++) {
    const adj  = ADJ[Math.floor(Math.random() * ADJ.length)]!
    const noun = NOUN[Math.floor(Math.random() * NOUN.length)]!
    const num  = Math.floor(Math.random() * 90 + 10)

    const candidates = [
      `${base}.${noun}`,
      `${adj}.${noun}`,
      `${base}_${num}`,
      `${adj}${noun}${num}`,
      `${base}${num}`,
    ]

    const pick = candidates[Math.floor(Math.random() * candidates.length)]!
    if (pick.length >= 4 && pick.length <= 24 && !TAKEN_LOGINS.has(pick)) return pick
  }

  return `user${Math.floor(Math.random() * 9000 + 1000)}`
}

// ─── Time formatting ──────────────────────────────────────────────────────

export function formatTime(date: Date): string {
  const now = new Date()
  const d   = new Date(date)

  if (d.toDateString() === now.toDateString()) {
    return d.toTimeString().slice(0, 5)
  }

  const yesterday = new Date(now)
  yesterday.setDate(now.getDate() - 1)
  if (d.toDateString() === yesterday.toDateString()) return 'Вчера'

  return d.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' })
}

export function formatDayLabel(date: Date, lang: 'ru' | 'en', today: string, yesterday: string): string {
  const now = new Date()
  const d   = new Date(date)

  if (d.toDateString() === now.toDateString()) return today

  const prev = new Date(now)
  prev.setDate(now.getDate() - 1)
  if (d.toDateString() === prev.toDateString()) return yesterday

  return d.toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'en-US', { day: 'numeric', month: 'long' })
}

// ─── Date helper ─────────────────────────────────────────────────────────

function minsAgo(n: number): Date {
  const d = new Date()
  d.setMinutes(d.getMinutes() - n)
  return d
}

// ─── Mock data ────────────────────────────────────────────────────────────

export const ME: User = {
  id: 'me',
  name: 'Александр',
  login: 'alex.ridge',
  email: 'alex@alti.app',
  avatar: 'linear-gradient(135deg, #0A84FF 0%, #5E5CE6 100%)',
  initials: 'АД',
  bio: 'Дизайнер интерфейсов. Люблю горы, кофе и медленные утра. Делаю продукт о людях.',
  album: [
    'linear-gradient(135deg, #FF9500 0%, #FF375F 100%)',
    'linear-gradient(135deg, #30D158 0%, #0A84FF 100%)',
    'linear-gradient(135deg, #5E5CE6 0%, #FF2D55 100%)',
    'linear-gradient(135deg, #FFD60A 0%, #FF9500 100%)',
    'linear-gradient(135deg, #BF5AF2 0%, #5E5CE6 100%)',
    'linear-gradient(135deg, #64D2FF 0%, #30D158 100%)',
  ],
}

export const PEOPLE: User[] = [
  {
    id: 'u1', name: 'Мария Соколова', login: 'maria.tide', initials: 'МС',
    color: 'linear-gradient(135deg, #FF375F, #FF9500)', online: true,
    bio: 'Product designer. Кофе, бег, буквы.',
    album: [
      'linear-gradient(135deg, #FF9500 0%, #FF375F 100%)',
      'linear-gradient(135deg, #30D158 0%, #0A84FF 100%)',
      'linear-gradient(135deg, #BF5AF2 0%, #5E5CE6 100%)',
      'linear-gradient(135deg, #64D2FF 0%, #30D158 100%)',
    ],
  },
  {
    id: 'u2', name: 'Игорь Петров', login: 'igor.frost', initials: 'ИП',
    color: 'linear-gradient(135deg, #0A84FF, #64D2FF)', online: true,
    bio: 'Photographer. Mountains ⛰️',
    album: [
      'linear-gradient(135deg, #0A84FF 0%, #64D2FF 100%)',
      'linear-gradient(135deg, #30D158 0%, #FFD60A 100%)',
      'linear-gradient(135deg, #5E5CE6 0%, #BF5AF2 100%)',
    ],
  },
  {
    id: 'u3', name: 'Anna Lindberg', login: 'anna.lumen', initials: 'AL',
    color: 'linear-gradient(135deg, #BF5AF2, #FF2D55)', online: false,
    bio: 'Illustrator @ Lumen Studio.',
    album: [
      'linear-gradient(135deg, #BF5AF2 0%, #FF2D55 100%)',
      'linear-gradient(135deg, #FFD60A 0%, #FF9500 100%)',
    ],
  },
  {
    id: 'u4', name: 'Daniel Kim', login: 'dan.echo', initials: 'DK',
    color: 'linear-gradient(135deg, #30D158, #0A84FF)', online: false,
    bio: 'iOS engineer. Building tiny apps.',
    album: [
      'linear-gradient(135deg, #30D158 0%, #0A84FF 100%)',
      'linear-gradient(135deg, #64D2FF 0%, #5E5CE6 100%)',
    ],
  },
  {
    id: 'u5', name: 'Lab', login: 'lab.alti', initials: 'L',
    color: 'linear-gradient(135deg, #FFD60A, #FF9500)', online: true,
    group: true, members: 8,
    bio: 'Исследовательская группа Alti.',
    album: ['linear-gradient(135deg, #FFD60A 0%, #FF9500 100%)'],
  },
  {
    id: 'u6', name: 'Дизайн-команда', login: 'design', initials: 'Д',
    color: 'linear-gradient(135deg, #5E5CE6, #BF5AF2)', online: false,
    group: true, members: 12,
    bio: 'Всё про продуктовый дизайн.',
    album: ['linear-gradient(135deg, #5E5CE6 0%, #BF5AF2 100%)'],
  },
  {
    id: 'u7', name: 'Sofia Rivera', login: 'sofia.sun', initials: 'SR',
    color: 'linear-gradient(135deg, #FF9F0A, #FF375F)', online: false,
    bio: 'Travel & food.',
    album: [
      'linear-gradient(135deg, #FF9F0A 0%, #FF375F 100%)',
      'linear-gradient(135deg, #FF9500 0%, #FFD60A 100%)',
    ],
  },
  {
    id: 'u8', name: 'Александра', login: 'sasha.moss', initials: 'А',
    color: 'linear-gradient(135deg, #64D2FF, #5E5CE6)', online: true,
    bio: 'Менеджер проектов.',
    album: ['linear-gradient(135deg, #64D2FF 0%, #5E5CE6 100%)'],
  },
]

export function findUser(id: string): User | undefined {
  if (id === 'me') return ME
  return PEOPLE.find((p) => p.id === id)
}

export function lastMessage(chat: Chat): Message | undefined {
  return chat.messages[chat.messages.length - 1]
}

export const INITIAL_CHATS: Chat[] = [
  {
    id: 'c1', userId: 'u1', pinned: true, unread: 2, typing: true,
    pinnedMessageId: 'm4',
    messages: [
      { id: 'm1', from: 'u1', text: 'Привет! Видел макеты — это огонь 🔥', at: minsAgo(120) },
      { id: 'm2', from: 'me', text: 'Спасибо! Доделаю до пятницы.', at: minsAgo(118), status: 'read' },
      { id: 'm3', from: 'u1', text: 'Можешь скинуть исходники в Figma? Хочу глянуть слои у hero-блока.', at: minsAgo(20), reply: 'm2' },
      { id: 'm4', from: 'u1', kind: 'photo', at: minsAgo(15) },
      { id: 'm5', from: 'me', text: 'Лови, открыл доступ. Posted внутри файла.', at: minsAgo(14), status: 'read', reactions: ['❤️'] },
      { id: 'm6', from: 'u1', text: 'Спасибо!! 😍', at: minsAgo(13) },
      { id: 'm7', from: 'me', text: 'Кстати, во вторник можем созвониться?', at: minsAgo(5), status: 'delivered' },
    ],
  },
  {
    id: 'c2', userId: 'u2', pinned: true, unread: 0,
    messages: [
      { id: 'm1', from: 'u2', text: 'Бронь подтвердили, выезжаем в 7 утра.', at: minsAgo(360) },
      { id: 'm2', from: 'me', text: 'Принято 👍', at: minsAgo(355), status: 'read' },
    ],
  },
  {
    id: 'c3', userId: 'u5', unread: 5,
    messages: [
      { id: 'm1', from: 'u3', text: 'Кто берёт слово на демо?', at: minsAgo(45) },
      { id: 'm2', from: 'u4', text: 'Я могу про разработку, минут на 5.', at: minsAgo(44) },
      { id: 'm3', from: 'u3', text: 'А по дизайну?', at: minsAgo(43) },
      { id: 'm4', from: 'u1', kind: 'voice', duration: 18, at: minsAgo(40) },
      { id: 'm5', from: 'u1', text: 'Скинула голосовое — там подробно.', at: minsAgo(39) },
    ],
  },
  {
    id: 'c4', userId: 'u3', unread: 0,
    messages: [
      { id: 'm1', from: 'u3', text: 'Loved the new icon set 💙', at: minsAgo(720) },
      { id: 'm2', from: 'me', text: 'Thanks Anna!', at: minsAgo(700), status: 'read' },
    ],
  },
  {
    id: 'c5', userId: 'u4', unread: 0,
    messages: [
      { id: 'm1', from: 'u4', text: 'Pushed the API changes. Ready for review.', at: minsAgo(1500) },
    ],
  },
  {
    id: 'c6', userId: 'u6', unread: 0,
    messages: [
      { id: 'm1', from: 'u7', text: 'Закинула обновлённый style guide в Drive', at: minsAgo(2880) },
    ],
  },
  {
    id: 'c7', userId: 'u7', unread: 0,
    messages: [
      { id: 'm1', from: 'me', text: 'Hey! Are you free Friday?', at: minsAgo(4000), status: 'read' },
      { id: 'm2', from: 'u7', text: 'Sure, lunch at 1?', at: minsAgo(3990) },
    ],
  },
  {
    id: 'c8', userId: 'u8', unread: 0,
    messages: [
      { id: 'm1', from: 'u8', text: 'Спасибо за созвон!', at: minsAgo(7200) },
    ],
  },
]
