import { FRIENDS } from '../data';
import type { Theme } from '../theme';
import type { Strings } from '../i18n';
import { Avatar } from './Avatar';
import { Ic } from './icons';

interface Props { T: Theme; s: Strings; onBack?: () => void; }

export function FriendsPanel({ T, s, onBack }: Props) {
  const online = FRIENDS.filter(f => f.online);
  const offline = FRIENDS.filter(f => !f.online);

  const Row = ({ f }: { f: (typeof FRIENDS)[0] }) => (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12, padding: '10px 18px',
      transition: 'background 0.1s', cursor: 'pointer',
    }}
      onMouseEnter={e => (e.currentTarget.style.background = T.isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)')}
      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
      <Avatar initials={f.av} size={44} online={f.online} T={T} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 590, fontSize: 15, color: T.text, marginBottom: 1 }}>{f.name}</div>
        <div style={{ fontSize: 12, color: T.text3 }}>{f.mutuals} {f.mutuals === 1 ? s.mutual : s.mutuals}</div>
      </div>
      <button style={{
        background: T.accA(0.12), border: 'none', borderRadius: 20,
        padding: '6px 14px', color: T.accent, fontSize: 14, fontWeight: 600,
        cursor: 'pointer', transition: 'all 0.15s',
        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
      }}
        onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = '#007AFF'; b.style.color = '#fff'; }}
        onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = T.accA(0.12); b.style.color = T.accent; }}>
        {s.addFriend}
      </button>
    </div>
  );

  return (
    <div style={{ flex: 1, background: T.bg, overflowY: 'auto', minWidth: 0 }}>
      <div style={{
        padding: '14px 18px 10px',
        background: T.navBg, backdropFilter: 'blur(20px) saturate(1.8)',
        borderBottom: `0.5px solid ${T.sep}`,
        position: 'sticky', top: 0, zIndex: 1,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {onBack && (
            <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.accent, padding: '4px 2px', display: 'flex', borderRadius: 8, marginLeft: -4, flexShrink: 0 }}>
              <Ic.Back />
            </button>
          )}
          <div style={{ fontSize: 22, fontWeight: 700, color: T.text, letterSpacing: '-0.3px' }}>{s.friendsTitle}</div>
        </div>
        <div style={{ fontSize: 13, color: T.text2, marginTop: 2 }}>{s.friendsSubtitle}</div>
      </div>

      <div style={{ padding: '8px 0' }}>
        {online.length > 0 && <>
          <div style={{ padding: '6px 18px 4px', fontSize: 11, color: T.text3, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            {s.online2} — {online.length}
          </div>
          {online.map(f => <Row key={f.id} f={f} />)}
          <div style={{ height: 0.5, background: T.sep, margin: '6px 0' }} />
        </>}
        {offline.map(f => <Row key={f.id} f={f} />)}
      </div>
    </div>
  );
}
