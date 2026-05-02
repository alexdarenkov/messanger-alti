import React from 'react';
import type { Theme } from '../theme';
import type { Strings } from '../i18n';
import { Avatar } from './Avatar';
import { Toggle } from './Toggle';
import { Ic } from './icons';

interface Props {
  userName: string; userEmail: string;
  dark: boolean; onToggleDark: (v: boolean) => void;
  lang: string; onToggleLang: () => void;
  onLogout: () => void;
  onBack?: () => void;
  T: Theme; s: Strings;
}

export function SettingsPanel({ userName, userEmail, dark, onToggleDark, lang, onToggleLang, onLogout, onBack, T, s }: Props) {
  const [notif, setNotif] = React.useState(true);
  const [sounds, setSounds] = React.useState(true);
  const [readR, setReadR] = React.useState(true);
  const [online, setOnline] = React.useState(true);

  const Icon = ({ color, children }: { color: string; children: React.ReactNode }) => (
    <div style={{
      width: 30, height: 30, borderRadius: 7, background: color,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0, color: '#fff',
    }}>
      {children}
    </div>
  );

  const Section = ({ children }: { children: React.ReactNode }) => (
    <div style={{ background: T.bg2, borderRadius: 12, overflow: 'hidden', border: `0.5px solid ${T.sep}` }}>
      {React.Children.map(children, (child, i) => {
        const arr = React.Children.toArray(children).filter(Boolean);
        return child ? React.cloneElement(child as React.ReactElement<{ isLast?: boolean }>, { isLast: i === arr.length - 1 }) : null;
      })}
    </div>
  );

  const Row = ({ label, icon, right, isLast, danger, onClick, sub }: {
    label: string; icon?: { color: string; i: React.ReactNode };
    right?: React.ReactNode; isLast?: boolean; danger?: boolean;
    onClick?: () => void; sub?: string;
  }) => (
    <div onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px',
      borderBottom: isLast ? 'none' : `0.5px solid ${T.sep}`,
      cursor: onClick ? 'pointer' : 'default', transition: 'background 0.1s',
    }}
      onMouseEnter={e => { if (onClick) (e.currentTarget as HTMLDivElement).style.background = T.isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'; }}
      onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.background = 'transparent')}>
      {icon && <Icon color={icon.color}>{icon.i}</Icon>}
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 16, color: danger ? '#FF3B30' : T.text, fontWeight: 400 }}>{label}</div>
        {sub && <div style={{ fontSize: 12, color: T.text3, marginTop: 1 }}>{sub}</div>}
      </div>
      {right !== undefined ? right : <span style={{ color: T.text3, display: 'flex' }}><Ic.ChevR /></span>}
    </div>
  );

  const SectionTitle = ({ title }: { title: string }) => (
    <div style={{ fontSize: 13, color: T.text3, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 6, marginTop: 22, paddingLeft: 4 }}>
      {title}
    </div>
  );

  const mkSvg = (d: string, type: 'stroke' | 'fill' = 'stroke') => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill={type === 'fill' ? 'white' : 'none'} stroke={type === 'stroke' ? 'white' : 'none'} strokeWidth="2.5" strokeLinecap="round">
      <path d={d} />
    </svg>
  );

  return (
    <div style={{ flex: 1, background: T.bg, overflowY: 'auto', minWidth: 0 }}>
      <div style={{ maxWidth: 540, margin: '0 auto', padding: '20px 18px 60px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 20 }}>
          {onBack && (
            <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.accent, padding: '4px 2px', display: 'flex', borderRadius: 8, marginLeft: -4, flexShrink: 0 }}>
              <Ic.Back />
            </button>
          )}
          <div style={{ fontSize: 28, fontWeight: 700, color: T.text, letterSpacing: '-0.4px' }}>{s.settingsTitle}</div>
        </div>

        {/* Profile card */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 14, padding: '12px 14px',
          background: T.bg2, borderRadius: 12, marginBottom: 6,
          border: `0.5px solid ${T.sep}`, cursor: 'pointer', transition: 'background 0.1s',
        }}
          onMouseEnter={e => (e.currentTarget.style.background = T.isDark ? '#2C2C2E' : '#F2F2F7')}
          onMouseLeave={e => (e.currentTarget.style.background = T.bg2)}>
          <Avatar initials={userName.substring(0, 2).toUpperCase()} size={56} T={T} />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 17, color: T.text }}>{userName}</div>
            <div style={{ fontSize: 13, color: T.text2, marginTop: 2 }}>{userEmail}</div>
          </div>
          <span style={{ color: T.text3 }}><Ic.ChevR /></span>
        </div>

        <SectionTitle title={s.account} />
        <Section>
          <Row label={s.displayName} sub={userName}
            icon={{ color: '#007AFF', i: mkSvg('M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2') }}
            right={<span style={{ display: 'flex', alignItems: 'center', gap: 4, color: T.text3 }}><span style={{ fontSize: 14 }}>{userName}</span><Ic.ChevR /></span>}
            onClick={() => {}} />
          <Row label={s.emailSetting} sub={userEmail}
            icon={{ color: '#FF9500', i: mkSvg('M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z') }}
            onClick={() => {}} />
          <Row label={s.changePassword}
            icon={{ color: '#34C759', i: mkSvg('M7 11V7a5 5 0 0 1 10 0v4') }}
            onClick={() => {}} />
        </Section>

        <SectionTitle title={s.appearance} />
        <Section>
          <Row label={s.darkMode}
            icon={{ color: '#3A3A3C', i: <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg> }}
            right={<Toggle value={dark} onChange={onToggleDark} T={T} />} />
          <Row label={s.language}
            icon={{ color: '#32ADE6', i: mkSvg('M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z') }}
            right={<button onClick={onToggleLang} style={{ background: T.accA(0.12), border: 'none', borderRadius: 20, padding: '5px 12px', color: T.accent, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
              {lang === 'en' ? '🇷🇺 RU' : '🇺🇸 EN'}
            </button>} />
        </Section>

        <SectionTitle title={s.notifications} />
        <Section>
          <Row label={s.msgNotif}
            icon={{ color: '#FF3B30', i: <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg> }}
            right={<Toggle value={notif} onChange={setNotif} T={T} />} />
          <Row label={s.sounds}
            icon={{ color: '#AF52DE', i: mkSvg('M11 5L6 9H2v6h4l5 4V5z') }}
            right={<Toggle value={sounds} onChange={setSounds} T={T} />} />
        </Section>

        <SectionTitle title={s.privacy} />
        <Section>
          <Row label={s.onlineStatus}
            icon={{ color: '#34C759', i: mkSvg('M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z') }}
            right={<Toggle value={online} onChange={setOnline} T={T} />} />
          <Row label={s.readReceipts}
            icon={{ color: '#5856D6', i: mkSvg('M2 7l5 5 9-9') }}
            right={<Toggle value={readR} onChange={setReadR} T={T} />} />
          <Row label={s.blockedUsers}
            icon={{ color: '#FF3B30', i: mkSvg('M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z') }}
            onClick={() => {}} />
        </Section>

        <div style={{ height: 20 }} />
        <div style={{ background: T.bg2, borderRadius: 12, overflow: 'hidden', border: `0.5px solid ${T.sep}` }}>
          <div onClick={onLogout} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '14px 16px', cursor: 'pointer', transition: 'background 0.1s',
          }}
            onMouseEnter={e => (e.currentTarget.style.background = T.isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
            <span style={{ fontSize: 16, color: '#FF3B30', fontWeight: 500 }}>{s.signOut}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
