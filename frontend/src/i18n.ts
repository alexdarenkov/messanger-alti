export type Lang = 'en' | 'ru';

export interface Strings {
  appName: string; appTagline: string;
  signIn: string; signUp: string; email: string; password: string;
  yourName: string; forgotPwd: string;
  signingIn: string; creatingAccount: string;
  noAccount: string; hasAccount: string;
  register: string; errEmail: string; errPwd: string; errName: string;
  messages: string; search: string; friends: string; settings: string; profile: string;
  pinned: string; noChats: string; online: string; lastSeen: string;
  typing: string; inputPlaceholder: string; today: string;
  online2: string; friendsTitle: string; friendsSubtitle: string;
  mutual: string; mutuals: string;
  settingsTitle: string; account: string; appearance: string;
  notifications: string; privacy: string;
  displayName: string; emailSetting: string; username: string;
  changePassword: string; darkMode: string; language: string;
  msgNotif: string; sounds: string; readReceipts: string;
  onlineStatus: string; blockedUsers: string;
  signOut: string; profileTitle: string; editPhoto: string; editName: string;
  emptyTitle: string; emptySubtitle: string;
  back: string; reply: string; forward: string; copy: string; delete: string;
  addFriend: string;
}

export const STRINGS: Record<Lang, Strings> = {
  en: {
    appName: 'Messenger', appTagline: 'Simple. Fast. Secure.',
    signIn: 'Sign In', signUp: 'Sign Up', email: 'Email address', password: 'Password',
    yourName: 'Your name', forgotPwd: 'Forgot password?',
    signingIn: 'Signing in…', creatingAccount: 'Creating account…',
    noAccount: "Don't have an account?", hasAccount: 'Already have an account?',
    register: 'Create account', errEmail: 'Enter a valid email address',
    errPwd: 'Password must be at least 6 characters', errName: 'Enter your name',
    messages: 'Messages', search: 'Search', friends: 'Friends', settings: 'Settings', profile: 'Profile',
    pinned: 'Pinned', noChats: 'No chats found', online: 'online', lastSeen: 'last seen recently',
    typing: 'typing…', inputPlaceholder: 'Message', today: 'Today',
    online2: 'Online', friendsTitle: 'Friends', friendsSubtitle: 'People you know',
    mutual: 'mutual friend', mutuals: 'mutual friends',
    settingsTitle: 'Settings', account: 'Account', appearance: 'Appearance',
    notifications: 'Notifications', privacy: 'Privacy & Security',
    displayName: 'Display Name', emailSetting: 'Email', username: 'Username',
    changePassword: 'Change Password', darkMode: 'Dark Mode', language: 'Language',
    msgNotif: 'Message Notifications', sounds: 'Sounds', readReceipts: 'Read Receipts',
    onlineStatus: 'Show Online Status', blockedUsers: 'Blocked Users',
    signOut: 'Sign Out', profileTitle: 'Profile', editPhoto: 'Edit Photo', editName: 'Edit Name',
    emptyTitle: 'No chat selected', emptySubtitle: 'Choose a conversation from the list',
    back: 'Back', reply: 'Reply', forward: 'Forward', copy: 'Copy', delete: 'Delete',
    addFriend: 'Add',
  },
  ru: {
    appName: 'Мессенджер', appTagline: 'Просто. Быстро. Безопасно.',
    signIn: 'Войти', signUp: 'Регистрация', email: 'Email', password: 'Пароль',
    yourName: 'Ваше имя', forgotPwd: 'Забыли пароль?',
    signingIn: 'Входим…', creatingAccount: 'Создаём аккаунт…',
    noAccount: 'Нет аккаунта?', hasAccount: 'Уже есть аккаунт?',
    register: 'Создать аккаунт', errEmail: 'Введите корректный email',
    errPwd: 'Пароль — минимум 6 символов', errName: 'Введите имя',
    messages: 'Сообщения', search: 'Поиск', friends: 'Друзья', settings: 'Настройки', profile: 'Профиль',
    pinned: 'Закреплённые', noChats: 'Ничего не найдено', online: 'в сети', lastSeen: 'был(а) недавно',
    typing: 'печатает…', inputPlaceholder: 'Сообщение', today: 'Сегодня',
    online2: 'Онлайн', friendsTitle: 'Друзья', friendsSubtitle: 'Люди, которых вы знаете',
    mutual: 'общий друг', mutuals: 'общих друга',
    settingsTitle: 'Настройки', account: 'Аккаунт', appearance: 'Внешний вид',
    notifications: 'Уведомления', privacy: 'Конфиденциальность',
    displayName: 'Имя', emailSetting: 'Email', username: 'Username',
    changePassword: 'Изменить пароль', darkMode: 'Тёмная тема', language: 'Язык',
    msgNotif: 'Уведомления', sounds: 'Звуки', readReceipts: 'Прочтения',
    onlineStatus: 'Показывать онлайн', blockedUsers: 'Заблокированные',
    signOut: 'Выйти', profileTitle: 'Профиль', editPhoto: 'Изменить фото', editName: 'Изменить имя',
    emptyTitle: 'Чат не выбран', emptySubtitle: 'Выберите переписку из списка',
    back: 'Назад', reply: 'Ответить', forward: 'Переслать', copy: 'Скопировать', delete: 'Удалить',
    addFriend: 'Добавить',
  },
};
