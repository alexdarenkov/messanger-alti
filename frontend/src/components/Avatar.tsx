import type { Theme } from '../theme';

const AV_COLORS = [
  '#007AFF', // Blue
  '#34C759', // Green
  '#FF9500', // Orange
  '#AF52DE', // Purple
  '#FF2D55', // Pink
  '#5856D6', // Indigo
  '#FF3B30', // Red
  '#32ADE6', // Cyan
];

interface Props {
  initials: string;
  size?: number;
  online?: boolean;
  borderColor?: string;
  T: Theme;
}

export function Avatar({ initials, size = 40, online = false, borderColor, T }: Props) {
  const bg = AV_COLORS[initials.charCodeAt(0) % AV_COLORS.length];
  return (
    <div style={{ position: 'relative', flexShrink: 0 }}>
      <div style={{
        width: size, height: size, borderRadius: '50%', background: bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: size * 0.36, fontWeight: 600, color: '#fff',
        userSelect: 'none', letterSpacing: '0.3px',
        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
      }}>
        {initials}
      </div>
      {online && (
        <div style={{
          position: 'absolute', bottom: size > 32 ? 1 : 0, right: size > 32 ? 1 : 0,
          width: size * 0.27, height: size * 0.27, borderRadius: '50%',
          background: T.online, border: `2px solid ${borderColor ?? T.bg}`,
        }} />
      )}
    </div>
  );
}
