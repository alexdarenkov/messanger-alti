export interface Theme {
  bg: string;
  bg2: string;
  bg3: string;
  bg4: string;
  surface: string;
  surfaceHi: string;
  blur: string;
  border: string;
  border2: string;
  text: string;
  text2: string;
  text3: string;
  accent: string;
  accA: (o: number) => string;
  sentBg: string;
  sentText: string;
  recvBg: string;
  recvText: string;
  online: string;
  sep: string;
  inputBg: string;
  navBg: string;
  isDark: boolean;
  shadow: string;
}

export function makeTheme(dark: boolean): Theme {
  const accent = '#007AFF';
  const accA = (o: number) => `rgba(0,122,255,${o})`;
  if (dark) return {
    bg: '#000000', bg2: '#1C1C1E', bg3: '#2C2C2E', bg4: '#3A3A3C',
    surface: 'rgba(28,28,30,0.96)', surfaceHi: 'rgba(44,44,46,0.98)',
    blur: 'rgba(28,28,30,0.86)', border: 'rgba(255,255,255,0.06)',
    border2: 'rgba(255,255,255,0.1)', text: '#FFFFFF',
    text2: 'rgba(235,235,245,0.6)', text3: 'rgba(235,235,245,0.3)',
    accent, accA, sentBg: accent, sentText: '#FFFFFF',
    recvBg: '#3A3A3C', recvText: '#FFFFFF', online: '#34C759',
    sep: 'rgba(84,84,88,0.65)', inputBg: '#1C1C1E',
    navBg: 'rgba(28,28,30,0.88)', isDark: true, shadow: 'rgba(0,0,0,0.55)',
  };
  return {
    bg: '#F2F2F7', bg2: '#FFFFFF', bg3: '#F2F2F7', bg4: '#E5E5EA',
    surface: 'rgba(255,255,255,0.96)', surfaceHi: 'rgba(242,242,247,0.98)',
    blur: 'rgba(242,242,247,0.88)', border: 'rgba(60,60,67,0.08)',
    border2: 'rgba(60,60,67,0.14)', text: '#000000',
    text2: 'rgba(60,60,67,0.6)', text3: 'rgba(60,60,67,0.3)',
    accent, accA, sentBg: accent, sentText: '#FFFFFF',
    recvBg: '#E9E9EB', recvText: '#000000', online: '#34C759',
    sep: 'rgba(60,60,67,0.29)', inputBg: '#FFFFFF',
    navBg: 'rgba(242,242,247,0.88)', isDark: false, shadow: 'rgba(0,0,0,0.08)',
  };
}
