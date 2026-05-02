import type { Message } from '../data';
import type { Theme } from '../theme';
import { Ic } from './icons';

interface Props { msg: Message; onCancel: () => void; T: Theme; }

export function ReplyBar({ msg, onCancel, T }: Props) {
  return (
    <div className="slide-up" style={{
      display: 'flex', alignItems: 'center', gap: 10, padding: '8px 16px',
      background: T.navBg, backdropFilter: 'blur(20px)',
      borderTop: `0.5px solid ${T.sep}`, flexShrink: 0,
    }}>
      <div style={{ width: 3, alignSelf: 'stretch', borderRadius: 2, background: T.accent, flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, color: T.accent, fontWeight: 600, marginBottom: 1 }}>
          Reply to {msg.from === 'me' ? 'yourself' : msg.from}
        </div>
        <div style={{ fontSize: 13, color: T.text2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {msg.text ?? 'Photo'}
        </div>
      </div>
      <button onClick={onCancel} style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.text3, display: 'flex', padding: 4, borderRadius: 6 }}>
        <Ic.Close />
      </button>
    </div>
  );
}
