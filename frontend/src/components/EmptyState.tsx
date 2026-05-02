import type { Theme } from '../theme';
import type { Strings } from '../i18n';

export function EmptyState({ T, s }: { T: Theme; s: Strings }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, background: T.bg }}>
      <div style={{
        width: 72, height: 72, borderRadius: 22, background: '#007AFF',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 8px 24px rgba(0,122,255,0.3)',
      }}>
        <svg width="36" height="36" viewBox="0 0 24 24" fill="white">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 17, fontWeight: 600, color: T.text, marginBottom: 5 }}>{s.emptyTitle}</div>
        <div style={{ fontSize: 14, color: T.text2, maxWidth: 260, lineHeight: 1.5 }}>{s.emptySubtitle}</div>
      </div>
    </div>
  );
}
