import React from 'react';
import type { Lang } from './i18n';
import { makeTheme } from './theme';
import { STRINGS } from './i18n';
import { LoginScreen } from './components/LoginScreen';
import { DesktopApp } from './components/DesktopApp';

export default function App() {
  const [dark, setDark] = React.useState(true);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userName, setUserName] = React.useState('');
  const [userEmail, setUserEmail] = React.useState('');
  const [lang, setLang] = React.useState<Lang>('en');

  const T = makeTheme(dark);
  const s = STRINGS[lang];

  const handleLogin = (name: string, email: string) => {
    setUserName(name);
    setUserEmail(email || name + '@example.com');
    setLoggedIn(true);
  };

  const sharedProps = {
    userName, userEmail,
    dark, onToggleDark: setDark,
    lang, onToggleLang: () => setLang(l => l === 'en' ? 'ru' : 'en'),
    onLogout: () => setLoggedIn(false),
    T, s,
  };

  return (
    <div style={{ width: '100vw', height: '100vh', background: T.isDark ? '#000' : '#D1D1D6', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 1440, height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {loggedIn
          ? <DesktopApp {...sharedProps} />
          : <LoginScreen onLogin={handleLogin} T={T} s={s} />
        }
      </div>
    </div>
  );
}
