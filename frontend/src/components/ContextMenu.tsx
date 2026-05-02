import React from 'react';
import type { Message } from '../data';
import type { Theme } from '../theme';
import type { Strings } from '../i18n';
import { Ic } from './icons';

interface Props {
  x: number; y: number;
  msg: Message;
  onClose: () => void;
  onReact: (id: number, emoji: string) => void;
  onReply: (msg: Message) => void;
  onForward: (msg: Message) => void;
  T: Theme; s: Strings;
}

const EMOJIS = ['❤️', '👍', '😂', '😮', '😢', '🔥'];

export function ContextMenu({ x, y, msg, onClose, onReact, onReply, onForward, T, s }: Props) {
  const menuRef = React.useRef<HTMLDivElement>(null);
  const [pos, setPos] = React.useState({ x, y });

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  React.useEffect(() => {
    if (!menuRef.current) return;
    const r = menuRef.current.getBoundingClientRect();
    const vw = window.innerWidth, vh = window.innerHeight;
    let nx = x, ny = y;
    if (nx + r.width > vw - 10) nx = vw - r.width - 10;
    if (ny + r.height > vh - 10) ny = y - r.height - 10;
    if (nx < 10) nx = 10;
    if (ny < 10) ny = 10;
    setPos({ x: nx, y: ny });
  }, [x, y]);

  const menuBg = T.isDark ? 'rgba(44,44,46,0.98)' : 'rgba(255,255,255,0.98)';

  const actions = [
    { label: s.reply,   icon: <Ic.Reply />,   action: () => { onReply(msg); onClose(); } },
    { label: s.forward, icon: <Ic.Forward />, action: () => { onForward(msg); onClose(); } },
    { label: s.copy,    icon: <Ic.Copy />,    action: () => { navigator.clipboard?.writeText(msg.text ?? ''); onClose(); } },
    { label: s.delete,  icon: <Ic.Trash />,   action: () => onClose(), danger: true },
  ];

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999 }} onContextMenu={e => e.preventDefault()}>
      <div style={{ position: 'absolute', inset: 0 }} onClick={onClose} />
      <div ref={menuRef} className="ctx-enter" style={{
        position: 'absolute', left: pos.x, top: pos.y,
        background: menuBg, borderRadius: 14, overflow: 'hidden', minWidth: 210,
        boxShadow: `0 8px 40px rgba(0,0,0,0.3), 0 0 0 0.5px ${T.sep}`,
        backdropFilter: 'blur(40px) saturate(1.8)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-around', padding: '12px 8px 10px', borderBottom: `0.5px solid ${T.sep}` }}>
          {EMOJIS.map(e => (
            <span key={e} style={{ fontSize: 26, cursor: 'pointer', transition: 'transform 0.12s', display: 'inline-block', padding: '2px 6px', borderRadius: 8 }}
              onMouseEnter={ev => (ev.currentTarget.style.transform = 'scale(1.28)')}
              onMouseLeave={ev => (ev.currentTarget.style.transform = 'scale(1)')}
              onClick={() => { onReact(msg.id, e); onClose(); }}>
              {e}
            </span>
          ))}
        </div>
        {actions.map((a, i) => (
          <div key={a.label} onClick={a.action} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '12px 16px',
            borderBottom: i < actions.length - 1 ? `0.5px solid ${T.sep}` : 'none',
            cursor: 'pointer', transition: 'background 0.1s',
            color: a.danger ? '#FF3B30' : T.text,
          }}
            onMouseEnter={e => (e.currentTarget.style.background = T.isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.04)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
            <span style={{ fontSize: 16, fontWeight: 400 }}>{a.label}</span>
            <span style={{ opacity: 0.6 }}>{a.icon}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
