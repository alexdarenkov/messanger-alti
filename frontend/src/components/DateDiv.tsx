import type { Theme } from '../theme';

export function DateDiv({ label, T }: { label: string; T: Theme }) {
  return (
    <div style={{ textAlign: 'center', margin: '18px 0 10px' }}>
      <span style={{
        fontSize: 12, color: T.text3, fontWeight: 600,
        letterSpacing: '0.02em',
      }}>
        {label}
      </span>
    </div>
  );
}
