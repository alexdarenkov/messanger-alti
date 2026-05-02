import React from 'react';
import type { Chat } from '../data';
import type { Theme } from '../theme';
import type { Strings } from '../i18n';
import { Avatar } from './Avatar';
import { Ic } from './icons';

interface Props { chat: Chat; active: boolean; onClick: () => void; T: Theme; s: Strings; bg?: string; }

export function ChatItem({ chat, active, onClick, T, s, bg }: Props) {
  const [h, setH] = React.useState(false);
  return (
    <div onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{
      display: 'flex', alignItems: 'center', gap: 12, padding: '8px 16px', cursor: 'pointer',
      transition: 'background 0.12s',
      background: active
        ? (T.isDark ? 'rgba(0,122,255,0.22)' : 'rgba(0,122,255,0.12)')
        : h ? (T.isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)') : 'transparent',
    }}>
      <Avatar initials={chat.av} size={46} online={chat.online} borderColor={bg ?? T.bg2} T={T} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 2 }}>
          <span style={{ flex: 1, fontWeight: 590, fontSize: 15, color: active ? T.accent : T.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {chat.pinned && <span style={{ color: T.text3, marginRight: 4, fontSize: 10 }}><Ic.Pin /></span>}
            {chat.name}
          </span>
          <span style={{ fontSize: 12, color: active ? T.accA(0.7) : T.text3, flexShrink: 0, fontWeight: 400 }}>{chat.time}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{
            flex: 1, fontSize: 13, color: chat.typing ? T.accent : T.text2,
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            fontStyle: chat.typing ? 'italic' : 'normal', fontWeight: 400,
          }}>
            {chat.typing ? s.typing : chat.last}
          </span>
          <div style={{ display: 'flex', gap: 4, alignItems: 'center', flexShrink: 0 }}>
            {chat.muted && <span style={{ color: T.text3, opacity: 0.6 }}><Ic.Mute /></span>}
            {chat.unread > 0 && (
              <div style={{
                background: chat.muted ? T.bg4 : '#FF3B30',
                borderRadius: 10, minWidth: 18, height: 18,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 700, color: '#fff', padding: '0 5px',
              }}>
                {chat.unread > 99 ? '99+' : chat.unread}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
