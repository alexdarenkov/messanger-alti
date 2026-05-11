import type { CSSProperties, SVGProps } from 'react'

export type IconName =
  | 'search' | 'compose' | 'send' | 'paperclip' | 'mic' | 'smile'
  | 'phone' | 'video' | 'more' | 'back' | 'forward'
  | 'check' | 'check-double' | 'pin' | 'reply' | 'chat' | 'user'
  | 'settings' | 'moon' | 'sun' | 'lock' | 'mail' | 'at'
  | 'eye' | 'eye-off' | 'logout' | 'camera' | 'image'
  | 'plus' | 'x' | 'menu' | 'info' | 'globe' | 'bell' | 'trash'

interface IconProps {
  name: IconName
  size?: number
  className?: string
  style?: CSSProperties
}

const STROKE_PROPS: SVGProps<SVGSVGElement> = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export function Icon({ name, size = 20, className = '', style }: IconProps) {
  const svg = (children: React.ReactNode) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      style={style}
      {...STROKE_PROPS}
    >
      {children}
    </svg>
  )

  switch (name) {
    case 'search':
      return svg(<><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></>)
    case 'compose':
      return svg(<><path d="M16 3 21 8 8 21H3v-5z"/><path d="m13.5 5.5 5 5"/></>)
    case 'send':
      return svg(<><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4z"/></>)
    case 'paperclip':
      return svg(<path d="m21 12-9 9a5 5 0 0 1-7-7l9-9a3.5 3.5 0 0 1 5 5l-9 9a2 2 0 0 1-3-3l8-8"/>)
    case 'mic':
      return svg(<><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/><path d="M12 18v3"/></>)
    case 'smile':
      return svg(<><circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><circle cx="9" cy="10" r="0.6" fill="currentColor"/><circle cx="15" cy="10" r="0.6" fill="currentColor"/></>)
    case 'phone':
      return svg(<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1l-1.3 1.3a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6A2 2 0 0 1 22 16.9z"/>)
    case 'video':
      return svg(<><rect x="2" y="6" width="14" height="12" rx="2"/><path d="m22 8-6 4 6 4z"/></>)
    case 'more':
      return svg(<><circle cx="5" cy="12" r="1.4" fill="currentColor"/><circle cx="12" cy="12" r="1.4" fill="currentColor"/><circle cx="19" cy="12" r="1.4" fill="currentColor"/></>)
    case 'back':
      return svg(<path d="m15 18-6-6 6-6"/>)
    case 'forward':
      return svg(<path d="m9 18 6-6-6-6"/>)
    case 'check':
      return svg(<path d="M20 6 9 17l-5-5"/>)
    case 'check-double':
      return svg(<><path d="M2 13l4 4 8-8"/><path d="M10 13l4 4 8-8"/></>)
    case 'pin':
      return svg(<><path d="M12 17v5"/><path d="M9 3h6l-1 6 4 3v2H6v-2l4-3z"/></>)
    case 'reply':
      return svg(<><path d="M9 17 4 12l5-5"/><path d="M4 12h10a6 6 0 0 1 6 6v2"/></>)
    case 'chat':
      return svg(<path d="M21 12a8 8 0 0 1-11.7 7.1L3 21l1.9-6.3A8 8 0 1 1 21 12z"/>)
    case 'user':
      return svg(<><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>)
    case 'settings':
      return svg(<><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></>)
    case 'moon':
      return svg(<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>)
    case 'sun':
      return svg(<><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5"/></>)
    case 'lock':
      return svg(<><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></>)
    case 'mail':
      return svg(<><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 6 10 7 10-7"/></>)
    case 'at':
      return svg(<><circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.9 7.9"/></>)
    case 'eye':
      return svg(<><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></>)
    case 'eye-off':
      return svg(<><path d="M9.9 4.2A10.6 10.6 0 0 1 12 4c6.5 0 10 7 10 7a17 17 0 0 1-3.4 4.3M6.6 6.6A17 17 0 0 0 2 11s3.5 7 10 7a10.6 10.6 0 0 0 4.4-1M3 3l18 18M9.9 9.9a3 3 0 0 0 4.2 4.2"/></>)
    case 'logout':
      return svg(<><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/></>)
    case 'camera':
      return svg(<><path d="M3 7h4l2-3h6l2 3h4v13H3z"/><circle cx="12" cy="13" r="4"/></>)
    case 'image':
      return svg(<><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/></>)
    case 'plus':
      return svg(<path d="M12 5v14M5 12h14"/>)
    case 'x':
      return svg(<path d="M18 6 6 18M6 6l12 12"/>)
    case 'menu':
      return svg(<path d="M3 6h18M3 12h18M3 18h18"/>)
    case 'info':
      return svg(<><circle cx="12" cy="12" r="9"/><path d="M12 16v-5M12 8h.01"/></>)
    case 'globe':
      return svg(<><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></>)
    case 'bell':
      return svg(<><path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9z"/><path d="M10 21a2 2 0 0 0 4 0"/></>)
    case 'trash':
      return svg(<><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></>)
  }
}
