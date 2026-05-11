import type { Lang } from './types'

export interface Strings {
  // Auth
  sign_in: string
  sign_up: string
  welcome_back: string
  welcome_alti: string
  auth_subtitle_in: string
  auth_subtitle_up: string
  email_or_login: string
  email: string
  password: string
  repeat_password: string
  no_account: string
  have_account: string
  register: string
  login: string
  suggested_login: string
  regenerate: string
  name: string
  pwd_weak: string
  invalid_email: string
  pwd_mismatch: string
  available: string
  checking: string
  // Tabs
  tab_chats: string
  tab_profile: string
  tab_profile_inner: string
  // Chats
  search_placeholder: string
  typing: string
  online: string
  last_seen: string
  message_placeholder: string
  reply_to: string
  edited: string
  today: string
  yesterday: string
  pinned_message: string
  voice_msg: string
  photo: string
  // Profile
  bio: string
  album: string
  photos: string
  settings: string
  edit: string
  save: string
  cancel: string
  // Settings
  account: string
  appearance: string
  privacy: string
  notifications: string
  change_email: string
  change_password: string
  change_login: string
  change_name: string
  change_photo: string
  change_bio: string
  theme: string
  language: string
  light: string
  dark: string
  auto: string
  log_out: string
  delete_account: string
  // Misc
  members: string
  select_chat: string
  select_chat_sub: string
  found: string
  done: string
  search_messages: string
  mute: string
  unmute: string
  off: string
  on: string
  unpin_chat: string
  pin_chat: string
  open_profile: string
  delete_chat: string
  reply_to_me: string
  username_hint: string
  username_placeholder: string
  manage_account: string
  personalize: string
  coming_soon: string
  under_construction: string
  back_to_profile: string
}

const RU: Strings = {
  sign_in: 'Войти',
  sign_up: 'Создать аккаунт',
  welcome_back: 'С возвращением',
  welcome_alti: 'Добро пожаловать в Alti',
  auth_subtitle_in: 'Войдите, чтобы продолжить переписку',
  auth_subtitle_up: 'Зарегистрируйтесь по почте — логин подберём за вас',
  email_or_login: 'Почта или логин',
  email: 'Эл. почта',
  password: 'Пароль',
  repeat_password: 'Повторите пароль',
  no_account: 'Нет аккаунта?',
  have_account: 'Уже есть аккаунт?',
  register: 'Регистрация',
  login: 'Вход',
  suggested_login: 'Подобранный логин',
  regenerate: 'Подобрать другой',
  name: 'Имя',
  pwd_weak: 'Слишком короткий пароль',
  invalid_email: 'Введите корректный email',
  pwd_mismatch: 'Пароли не совпадают',
  available: 'свободен',
  checking: 'проверяем…',
  tab_chats: 'Чаты',
  tab_profile: 'Настройки',
  tab_profile_inner: 'Профиль',
  search_placeholder: 'Поиск',
  typing: 'печатает…',
  online: 'в сети',
  last_seen: 'был(а) недавно',
  message_placeholder: 'Сообщение',
  reply_to: 'Ответ',
  edited: 'изменено',
  today: 'Сегодня',
  yesterday: 'Вчера',
  pinned_message: 'Закреплённое сообщение',
  voice_msg: 'Голосовое сообщение',
  photo: 'Фото',
  bio: 'О себе',
  album: 'Альбом',
  photos: 'фото',
  settings: 'Настройки',
  edit: 'Изменить',
  save: 'Сохранить',
  cancel: 'Отмена',
  account: 'Аккаунт',
  appearance: 'Внешний вид',
  privacy: 'Конфиденциальность',
  notifications: 'Уведомления',
  change_email: 'Эл. почта',
  change_password: 'Пароль',
  change_login: 'Логин',
  change_name: 'Имя',
  change_photo: 'Фото профиля',
  change_bio: 'О себе',
  theme: 'Тема',
  language: 'Язык',
  light: 'Светлая',
  dark: 'Тёмная',
  auto: 'Авто',
  log_out: 'Выйти',
  delete_account: 'Удалить аккаунт',
  members: 'участников',
  select_chat: 'Выберите чат',
  select_chat_sub: 'Сообщения сквозного шифрования. Только вы и собеседник',
  found: 'найдено',
  done: 'Готово',
  search_messages: 'Поиск по сообщениям…',
  mute: 'Выкл. уведомления',
  unmute: 'Вкл. уведомления',
  off: 'Выкл.',
  on: 'Вкл.',
  unpin_chat: 'Открепить чат',
  pin_chat: 'Закрепить чат',
  open_profile: 'Открыть профиль',
  delete_chat: 'Удалить чат',
  reply_to_me: 'себе',
  username_hint: '4–24 символа: латиница, цифры, точка, подчёркивание',
  username_placeholder: 'Логин (можно придумать свой)',
  manage_account: 'Управляйте основными данными аккаунта.',
  personalize: 'Настройте внешний вид мессенджера.',
  coming_soon: 'Скоро появится в этом разделе.',
  under_construction: 'В разработке',
  back_to_profile: '← К профилю',
}

const EN: Strings = {
  sign_in: 'Sign In',
  sign_up: 'Create Account',
  welcome_back: 'Welcome back',
  welcome_alti: 'Welcome to Alti',
  auth_subtitle_in: 'Sign in to continue your conversations',
  auth_subtitle_up: "Sign up with email — we'll suggest a username",
  email_or_login: 'Email or username',
  email: 'Email',
  password: 'Password',
  repeat_password: 'Repeat password',
  no_account: 'No account?',
  have_account: 'Have an account?',
  register: 'Register',
  login: 'Sign in',
  suggested_login: 'Suggested username',
  regenerate: 'Generate another',
  name: 'Name',
  pwd_weak: 'Password too short',
  invalid_email: 'Enter a valid email',
  pwd_mismatch: "Passwords don't match",
  available: 'available',
  checking: 'checking…',
  tab_chats: 'Chats',
  tab_profile: 'Settings',
  tab_profile_inner: 'Profile',
  search_placeholder: 'Search',
  typing: 'typing…',
  online: 'online',
  last_seen: 'last seen recently',
  message_placeholder: 'Message',
  reply_to: 'Reply',
  edited: 'edited',
  today: 'Today',
  yesterday: 'Yesterday',
  pinned_message: 'Pinned message',
  voice_msg: 'Voice message',
  photo: 'Photo',
  bio: 'About',
  album: 'Album',
  photos: 'photos',
  settings: 'Settings',
  edit: 'Edit',
  save: 'Save',
  cancel: 'Cancel',
  account: 'Account',
  appearance: 'Appearance',
  privacy: 'Privacy',
  notifications: 'Notifications',
  change_email: 'Email',
  change_password: 'Password',
  change_login: 'Username',
  change_name: 'Name',
  change_photo: 'Profile photo',
  change_bio: 'About',
  theme: 'Theme',
  language: 'Language',
  light: 'Light',
  dark: 'Dark',
  auto: 'Auto',
  log_out: 'Log out',
  delete_account: 'Delete account',
  members: 'members',
  select_chat: 'Select a chat',
  select_chat_sub: 'End-to-end encrypted. Only you and the recipient',
  found: 'found',
  done: 'Done',
  search_messages: 'Search messages…',
  mute: 'Mute notifications',
  unmute: 'Unmute notifications',
  off: 'Off',
  on: 'On',
  unpin_chat: 'Unpin chat',
  pin_chat: 'Pin chat',
  open_profile: 'Open profile',
  delete_chat: 'Delete chat',
  reply_to_me: 'yourself',
  username_hint: '4–24 chars: a–z, 0–9, dot, underscore',
  username_placeholder: 'Username (or pick your own)',
  manage_account: 'Manage your account essentials.',
  personalize: 'Personalize how Alti looks.',
  coming_soon: 'Coming soon to this section.',
  under_construction: 'Under construction',
  back_to_profile: '← Back to profile',
}

export const STR: Record<Lang, Strings> = { ru: RU, en: EN }
