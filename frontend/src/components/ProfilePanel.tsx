import type { Theme } from '../theme';
import type { Strings } from '../i18n';
import { Avatar } from './Avatar';
import { Ic } from './icons';

interface Props { userName: string; userEmail: string; T: Theme; s: Strings; onBack?: () => void; }

export function ProfilePanel({ userName, userEmail, T, s, onBack }: Props) {
  return (
    <div style={{ flex: 1, background: T.bg, overflowY: 'auto', minWidth: 0 }}>
      <div style={{ maxWidth: 540, margin: '0 auto', padding: '20px 18px 60px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 24 }}>
          {onBack && (
            <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.accent, padding: '4px 2px', display: 'flex', borderRadius: 8, marginLeft: -4, flexShrink: 0 }}>
              <Ic.Back />
            </button>
          )}
          <div style={{ fontSize: 28, fontWeight: 700, color: T.text, letterSpacing: '-0.4px' }}>{s.profileTitle}</div>
        </div>

        {/* Avatar card */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
          padding: '28px 24px', background: T.bg2, borderRadius: 16,
          marginBottom: 20, border: `0.5px solid ${T.sep}`,
        }}>
          <Avatar initials={userName.substring(0, 2).toUpperCase()} size={84} T={T} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: T.text, letterSpacing: '-0.3px' }}>{userName}</div>
            <div style={{ fontSize: 14, color: T.text2, marginTop: 3 }}>{userEmail}</div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {[s.editPhoto, s.editName].map(l => (
              <button key={l} style={{
                background: T.isDark ? '#2C2C2E' : '#F2F2F7',
                border: 'none', borderRadius: 20, padding: '8px 18px',
                color: T.text, fontSize: 14, fontWeight: 600, cursor: 'pointer',
                transition: 'background 0.15s',
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
              }}
                onMouseEnter={e => (e.currentTarget.style.background = T.bg4)}
                onMouseLeave={e => (e.currentTarget.style.background = T.isDark ? '#2C2C2E' : '#F2F2F7')}>
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Info rows */}
        <div style={{ background: T.bg2, borderRadius: 12, overflow: 'hidden', border: `0.5px solid ${T.sep}` }}>
          {([
            [s.displayName, userName],
            [s.emailSetting, userEmail],
            [s.username, '@' + userName.toLowerCase().replace(/\s/g, '')],
          ] as [string, string][]).map(([label, value], i, arr) => (
            <div key={label} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '13px 16px',
              borderBottom: i < arr.length - 1 ? `0.5px solid ${T.sep}` : 'none',
            }}>
              <span style={{ color: T.text2, fontSize: 15 }}>{label}</span>
              <span style={{ color: T.text, fontSize: 15, fontWeight: 500 }}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
