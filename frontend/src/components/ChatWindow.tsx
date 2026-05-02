import React from 'react';
import { CHATS, CHAT_MESSAGES, type Message } from '../data';
import type { Theme } from '../theme';
import type { Strings } from '../i18n';
import { Avatar } from './Avatar';
import { Bubble } from './Bubble';
import { DateDiv } from './DateDiv';
import { ReplyBar } from './ReplyBar';
import { Ic } from './icons';

interface Props { chatId: number; T: Theme; s: Strings; onBack?: () => void; }

export function ChatWindow({ chatId, T, s, onBack }: Props) {
  const chat = CHATS.find(c => c.id === chatId);
  const [input, setInput] = React.useState('');
  const [msgs, setMsgs] = React.useState<Message[]>(CHAT_MESSAGES[chatId] ?? []);
  const [newIds, setNewIds] = React.useState(new Set<number>());
  const [replyTo, setReplyTo] = React.useState<Message | null>(null);
  const listRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => { setMsgs(CHAT_MESSAGES[chatId] ?? []); setNewIds(new Set()); setReplyTo(null); }, [chatId]);
  React.useEffect(() => { if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight; }, [msgs]);

  const send = () => {
    if (!input.trim()) return;
    const id = Date.now();
    const msg: Message = { id, from: 'me', text: input.trim(), time: new Date().toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' }), reactions: [], read: false };
    if (replyTo) msg.quote = { from: replyTo.from === 'me' ? 'You' : (chat?.name ?? ''), text: replyTo.text ?? 'Photo' };
    setMsgs(prev => [...prev, msg]);
    setNewIds(prev => new Set([...prev, id]));
    setInput(''); setReplyTo(null);
    setTimeout(() => setNewIds(prev => { const s = new Set(prev); s.delete(id); return s; }), 600);
  };

  const react = (id: number, emoji: string) => {
    setMsgs(prev => prev.map(m => {
      if (m.id !== id) return m;
      const ex = m.reactions.findIndex(r => r.emoji === emoji);
      const reactions = ex >= 0 ? m.reactions.map((r, i) => i === ex ? { ...r, count: r.count + 1 } : r) : [...m.reactions, { emoji, count: 1 }];
      return { ...m, reactions };
    }));
  };

  if (!chat) return null;

  const hasText = input.trim().length > 0;

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', background: T.bg, minWidth: 0 }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '0 16px', height: 56,
        borderBottom: `0.5px solid ${T.sep}`,
        background: T.navBg, backdropFilter: 'blur(20px) saturate(1.8)',
        flexShrink: 0, zIndex: 10,
      }}>
        {onBack && (
          <button onClick={onBack} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: T.accent, padding: '4px 2px', display: 'flex', borderRadius: 8,
            marginLeft: -4, flexShrink: 0,
          }}>
            <Ic.Back />
          </button>
        )}
        <Avatar initials={chat.av} size={34} online={chat.online} borderColor={T.navBg} T={T} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 600, fontSize: 15, color: T.text, lineHeight: 1.2 }}>{chat.name}</div>
          <div style={{ fontSize: 12, color: chat.online ? T.online : T.text3, lineHeight: 1 }}>
            {chat.online ? s.online : s.lastSeen}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 2 }}>
          {([Ic.Phone, Ic.Video, Ic.Info] as Array<() => React.ReactElement>).map((Ico, i) => (
            <button key={i} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: T.accent, padding: 8, borderRadius: 10, display: 'flex',
              transition: 'background 0.12s',
            }}
              onMouseEnter={e => (e.currentTarget.style.background = T.isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'none')}>
              <Ico />
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div ref={listRef} style={{ flex: 1, overflowY: 'auto', padding: '4px 16px 8px' }}>
        <DateDiv label={s.today} T={T} />
        {msgs.map(m => (
          <Bubble key={m.id} msg={m} onReact={react} onReply={setReplyTo} onForward={() => {}} isNew={newIds.has(m.id)} chatAv={chat.av} T={T} s={s} />
        ))}
        {chat.typing && (
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, marginTop: 2, marginBottom: 4 }}>
            <Avatar initials={chat.av} size={26} borderColor={T.bg} T={T} />
            <div style={{ background: T.recvBg, borderRadius: '20px 20px 20px 4px', padding: '10px 14px', display: 'flex', gap: 5, alignItems: 'center', boxShadow: `0 1px 1px ${T.shadow}` }}>
              {[0, 1, 2].map(i => <div key={i} className={`dot dot-${i}`} style={{ width: 6, height: 6, borderRadius: '50%', background: T.text3 }} />)}
            </div>
          </div>
        )}
      </div>

      {/* Reply bar */}
      {replyTo && <ReplyBar msg={replyTo} onCancel={() => setReplyTo(null)} T={T} />}

      {/* Input bar — iMessage style */}
      <div style={{
        borderTop: `0.5px solid ${T.sep}`,
        padding: '10px 12px 14px',
        background: T.navBg, backdropFilter: 'blur(20px) saturate(1.8)',
        display: 'flex', alignItems: 'flex-end', gap: 8, flexShrink: 0,
      }}>
        <button style={{
          width: 32, height: 32, borderRadius: '50%', border: 'none', flexShrink: 0,
          background: T.accent, color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', transition: 'opacity 0.15s',
        }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 5v14M5 12l7-7 7 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none"/></svg>
        </button>

        <div style={{
          flex: 1, background: T.isDark ? T.bg3 : T.bg2,
          borderRadius: 22, padding: '8px 12px',
          display: 'flex', alignItems: 'center', gap: 6,
          border: `0.5px solid ${T.sep}`,
          minHeight: 36,
        }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) send(); }}
            placeholder="iMessage"
            style={{
              flex: 1, background: 'none', border: 'none', outline: 'none',
              color: T.text, fontSize: 16,
              fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
            }}
          />
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.text3, display: 'flex', transition: 'color 0.15s', padding: 0 }}
            onMouseEnter={e => (e.currentTarget.style.color = T.accent)}
            onMouseLeave={e => (e.currentTarget.style.color = T.text3)}>
            <Ic.Emoji />
          </button>
        </div>

        <button onClick={send} style={{
          width: 32, height: 32, borderRadius: '50%', border: 'none', flexShrink: 0,
          background: hasText ? T.accent : (T.isDark ? '#3A3A3C' : '#E5E5EA'),
          color: hasText ? '#fff' : T.text3,
          cursor: hasText ? 'pointer' : 'default',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background 0.2s, color 0.2s',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 4l8 16-8-4-8 4 8-16z" transform="rotate(-90 12 12)" />
          </svg>
        </button>
      </div>
    </div>
  );
}
