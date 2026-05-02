import React from 'react';
import { CHATS } from '../data';
import type { Theme } from '../theme';
import type { Strings } from '../i18n';
import { ChatItem } from './ChatItem';
import { Ic } from './icons';

interface Props {
  activeId: number | null;
  onSelect: (id: number) => void;
  view: string;
  onView: (v: string) => void;
  width?: number;
  T: Theme; s: Strings;
}

export function Sidebar({ activeId, onSelect, view, onView, width, T, s }: Props) {
  const [q, setQ] = React.useState('');
  const fl = q.toLowerCase();
  const filtered = CHATS.filter(c => c.name.toLowerCase().includes(fl) || c.last.toLowerCase().includes(fl));
  const pinned = filtered.filter(c => c.pinned);
  const rest = filtered.filter(c => !c.pinned);

  const navItems = [
    { id: 'chats',    label: s.messages, I: Ic.Chats },
    { id: 'friends',  label: s.friends,  I: Ic.Friends },
    { id: 'settings', label: s.settings, I: Ic.Settings },
    { id: 'profile',  label: s.profile,  I: Ic.Profile },
  ];

  return (
    <div style={{
      width: width ?? '100%', flexShrink: 0,
      background: T.isDark ? '#1C1C1E' : T.bg2,
      borderRight: `0.5px solid ${T.sep}`,
      display: 'flex', flexDirection: 'column', height: '100%',
    }}>
      {/* Header */}
      <div style={{
        padding: '14px 16px 0',
        background: T.isDark ? 'rgba(28,28,30,0.9)' : 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(20px) saturate(1.8)',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ flex: 1, fontSize: 22, fontWeight: 700, color: T.text, letterSpacing: '-0.3px' }}>
            {s.messages}
          </div>
          <button style={{
            width: 28, height: 28, borderRadius: '50%',
            background: T.isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)',
            border: 'none', cursor: 'pointer', color: T.accent,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.15s',
          }}
            onMouseEnter={e => (e.currentTarget.style.background = T.isDark ? 'rgba(255,255,255,0.16)' : 'rgba(0,0,0,0.1)')}
            onMouseLeave={e => (e.currentTarget.style.background = T.isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)')}>
            <Ic.Compose />
          </button>
        </div>

        {/* Search */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 7,
          background: T.isDark ? 'rgba(118,118,128,0.24)' : 'rgba(118,118,128,0.18)',
          borderRadius: 10, padding: '6px 10px', marginBottom: 10,
        }}>
          <span style={{ color: T.text3, display: 'flex', flexShrink: 0 }}><Ic.Search /></span>
          <input
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder={s.search}
            style={{
              flex: 1, background: 'none', border: 'none', outline: 'none',
              color: T.text, fontSize: 14,
              fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
            }}
          />
          {q && (
            <span style={{ color: T.text3, cursor: 'pointer', display: 'flex' }} onClick={() => setQ('')}>
              <Ic.Close />
            </span>
          )}
        </div>
      </div>

      {/* Chat list */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {view === 'chats' && <>
          {pinned.length > 0 && <>
            <div style={{ padding: '8px 16px 3px', fontSize: 11, color: T.text3, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              {s.pinned}
            </div>
            {pinned.map(c => (
              <ChatItem key={c.id} chat={c} active={activeId === c.id} onClick={() => onSelect(c.id)} T={T} s={s} bg={T.isDark ? '#1C1C1E' : T.bg2} />
            ))}
            <div style={{ height: 0.5, background: T.sep, margin: '4px 0' }} />
          </>}
          {rest.map(c => (
            <ChatItem key={c.id} chat={c} active={activeId === c.id} onClick={() => onSelect(c.id)} T={T} s={s} bg={T.isDark ? '#1C1C1E' : T.bg2} />
          ))}
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', color: T.text3, padding: '40px 20px', fontSize: 14 }}>
              {s.noChats}
            </div>
          )}
        </>}
      </div>

      {/* Tab bar — iOS style */}
      <div style={{
        borderTop: `0.5px solid ${T.sep}`,
        display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start',
        padding: '8px 4px 4px',
        background: T.isDark ? 'rgba(28,28,30,0.92)' : 'rgba(248,248,248,0.92)',
        backdropFilter: 'blur(20px) saturate(1.8)',
        flexShrink: 0, height: 52,
      }}>
        {navItems.map(({ id, label, I }) => {
          const active = view === id;
          return (
            <button key={id} onClick={() => onView(id)} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '2px 10px',
              color: active ? T.accent : T.text3,
              transition: 'color 0.15s',
              borderRadius: 10,
              fontSize: 10, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
              fontWeight: 600, letterSpacing: '0.01em',
            }}>
              <I />{label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
