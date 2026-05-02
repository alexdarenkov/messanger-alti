import React from 'react';
import type { Message } from '../data';
import type { Theme } from '../theme';
import type { Strings } from '../i18n';
import { Ic } from './icons';
import { Avatar } from './Avatar';
import { ContextMenu } from './ContextMenu';

interface Props {
  msg: Message;
  onReact: (id: number, emoji: string) => void;
  onReply: (msg: Message) => void;
  onForward: (msg: Message) => void;
  isNew: boolean;
  chatAv: string;
  T: Theme; s: Strings;
}

export function Bubble({ msg, onReact, onReply, onForward, isNew, chatAv, T, s }: Props) {
  const isMe = msg.from === 'me';
  const [ctx, setCtx] = React.useState<{ x: number; y: number } | null>(null);

  const handleCtx = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCtx({ x: e.clientX, y: e.clientY });
  };

  const bubbleRadius = isMe
    ? (msg.quote ? '18px 18px 4px 18px' : '20px 20px 4px 20px')
    : (msg.quote ? '18px 18px 18px 4px' : '20px 20px 20px 4px');

  const quoteRadius = '10px 10px 0 0';

  return (
    <>
      <div className={isNew ? 'msg-enter' : ''} style={{
        display: 'flex', flexDirection: isMe ? 'row-reverse' : 'row',
        alignItems: 'flex-end', gap: 6, marginBottom: 2,
      }}>
        {!isMe && (
          <Avatar initials={chatAv} size={26} borderColor={T.bg} T={T} />
        )}
        <div style={{ maxWidth: '75%' }} onContextMenu={handleCtx}>
          {msg.quote && (
            <div style={{
              background: isMe ? 'rgba(255,255,255,0.18)' : (T.isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)'),
              borderLeft: `3px solid ${isMe ? 'rgba(255,255,255,0.6)' : T.accent}`,
              borderRadius: quoteRadius, padding: '6px 10px', marginBottom: -2,
            }}>
              <div style={{ fontSize: 11, color: isMe ? 'rgba(255,255,255,0.8)' : T.accent, fontWeight: 600, marginBottom: 1 }}>{msg.quote.from}</div>
              <div style={{ fontSize: 12, color: isMe ? 'rgba(255,255,255,0.65)' : T.text2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{msg.quote.text}</div>
            </div>
          )}
          {msg.photo ? (
            <div style={{
              width: 220, height: 156, borderRadius: 18,
              background: T.isDark ? 'linear-gradient(135deg,#2C2C2E,#3A3A3C)' : 'linear-gradient(135deg,#E5E5EA,#D1D1D6)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: 6, color: T.text2, position: 'relative', cursor: 'default',
            }}>
              <span style={{ fontSize: 32 }}>🖼</span>
              <span style={{ fontSize: 11, color: T.text3, fontFamily: 'monospace' }}>photo preview</span>
              <div style={{ position: 'absolute', bottom: 8, right: 10, fontSize: 11, color: T.isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.3)' }}>{msg.time}</div>
            </div>
          ) : (
            <div style={{
              background: isMe ? T.sentBg : T.recvBg,
              borderRadius: bubbleRadius,
              padding: '9px 13px',
              color: isMe ? T.sentText : T.recvText,
              fontSize: 16, lineHeight: 1.5, wordBreak: 'break-word',
              boxShadow: isMe ? 'none' : `0 1px 1px ${T.shadow}`,
              cursor: 'default', userSelect: 'text',
            }}>
              {msg.text}
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 3,
                marginLeft: 5, verticalAlign: 'bottom',
                fontSize: 11,
                color: isMe ? 'rgba(255,255,255,0.65)' : T.text3,
                whiteSpace: 'nowrap', lineHeight: 1,
              }}>
                {msg.time}
                {isMe && (
                  <span style={{ color: msg.read ? (T.isDark ? 'rgba(255,255,255,0.9)' : '#34C759') : 'rgba(255,255,255,0.45)' }}>
                    <Ic.Check2 />
                  </span>
                )}
              </span>
            </div>
          )}
          {msg.reactions.length > 0 && (
            <div style={{ display: 'flex', gap: 4, marginTop: 4, justifyContent: isMe ? 'flex-end' : 'flex-start' }}>
              {msg.reactions.map((r, i) => (
                <div key={i} onClick={() => onReact(msg.id, r.emoji)} style={{
                  background: T.bg2, borderRadius: 12, padding: '3px 7px', fontSize: 13,
                  display: 'flex', gap: 3, alignItems: 'center', color: T.text2,
                  cursor: 'pointer', transition: 'transform 0.12s',
                  border: `0.5px solid ${T.sep}`,
                  boxShadow: `0 1px 3px ${T.shadow}`,
                }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}>
                  {r.emoji}<span style={{ fontWeight: 600, fontSize: 11 }}>{r.count}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {ctx && (
        <ContextMenu x={ctx.x} y={ctx.y} msg={msg} onClose={() => setCtx(null)}
          onReact={onReact} onReply={onReply} onForward={onForward} T={T} s={s} />
      )}
    </>
  );
}
