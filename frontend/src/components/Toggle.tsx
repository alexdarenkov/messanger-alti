import type { Theme } from '../theme';

interface Props { value: boolean; onChange: (v: boolean) => void; T: Theme; }

export function Toggle({ value, onChange, T }: Props) {
  return (
    <div onClick={() => onChange(!value)} style={{
      width: 51, height: 31, borderRadius: 16,
      background: value ? T.accent : 'rgba(120,120,128,0.32)',
      cursor: 'pointer', position: 'relative', transition: 'background 0.25s', flexShrink: 0,
    }}>
      <div style={{
        position: 'absolute', top: 2, left: value ? 22 : 2,
        width: 27, height: 27, borderRadius: '50%', background: '#fff',
        transition: 'left 0.25s cubic-bezier(0.34,1.56,0.64,1)',
        boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
      }} />
    </div>
  );
}
