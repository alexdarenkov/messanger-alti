import React from 'react';
import type { Theme } from '../theme';
import type { Strings } from '../i18n';
import { Sidebar } from './Sidebar';
import { ChatWindow } from './ChatWindow';
import { FriendsPanel } from './FriendsPanel';
import { SettingsPanel } from './SettingsPanel';
import { ProfilePanel } from './ProfilePanel';
import { EmptyState } from './EmptyState';

interface Props {
  userName: string; userEmail: string;
  dark: boolean; onToggleDark: (v: boolean) => void;
  lang: string; onToggleLang: () => void;
  onLogout: () => void;
  T: Theme; s: Strings;
}

function useResponsive() {
  const [w, setW] = React.useState(window.innerWidth);
  React.useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  return {
    isMobile: w < 600,
    sidebarWidth: w < 960 ? 260 : 300,
  };
}

export function DesktopApp({ userName, userEmail, dark, onToggleDark, lang, onToggleLang, onLogout, T, s }: Props) {
  const { isMobile, sidebarWidth } = useResponsive();
  const [active, setActive] = React.useState<number | null>(null);
  const [view, setView] = React.useState('chats');
  const [showPanel, setShowPanel] = React.useState(false);

  const handleView = (v: string) => {
    setView(v);
    if (v !== 'chats') setActive(null);
    if (isMobile) setShowPanel(v !== 'chats');
  };

  const handleSelect = (id: number) => {
    setActive(id);
    setView('chats');
    if (isMobile) setShowPanel(true);
  };

  const handleBack = () => setShowPanel(false);

  const right = () => {
    const backProp = isMobile ? { onBack: handleBack } : {};
    if (view === 'friends')  return <FriendsPanel T={T} s={s} {...backProp} />;
    if (view === 'settings') return <SettingsPanel userName={userName} userEmail={userEmail} dark={dark} onToggleDark={onToggleDark} lang={lang} onToggleLang={onToggleLang} onLogout={onLogout} T={T} s={s} {...backProp} />;
    if (view === 'profile')  return <ProfilePanel userName={userName} userEmail={userEmail} T={T} s={s} {...backProp} />;
    if (active !== null)     return <ChatWindow chatId={active} T={T} s={s} {...backProp} />;
    return isMobile ? null : <EmptyState T={T} s={s} />;
  };

  const sidebarVisible = !isMobile || !showPanel;
  const panelVisible = !isMobile || showPanel;

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', background: T.bg }}>
      {sidebarVisible && (
        <Sidebar
          activeId={active}
          onSelect={handleSelect}
          view={view}
          onView={handleView}
          width={isMobile ? undefined : sidebarWidth}
          T={T}
          s={s}
        />
      )}
      {panelVisible && right()}
    </div>
  );
}
