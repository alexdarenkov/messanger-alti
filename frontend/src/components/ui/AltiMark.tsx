import { useId } from 'react'

interface AltiMarkProps {
  size?: number
}

/** The Alti logo — a gradient speech-bubble squircle with glass highlights */
export function AltiMark({ size = 56 }: AltiMarkProps) {
  const id = useId()

  return (
    <div
      className="flex items-center justify-center flex-shrink-0"
      style={{
        width: size,
        height: size,
        filter: 'drop-shadow(0 8px 18px rgba(167, 139, 250, 0.45))',
      }}
    >
      <svg width={size} height={size * 0.92} viewBox="0 0 64 60" fill="none">
        <defs>
          <linearGradient id={`${id}-fill`} x1="0.1" y1="0" x2="0.9" y2="1">
            <stop offset="0"    stopColor="#5AC8FA" />
            <stop offset="0.55" stopColor="#A78BFA" />
            <stop offset="1"    stopColor="#FF7AB6" />
          </linearGradient>
          <linearGradient id={`${id}-shine`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0"    stopColor="white" stopOpacity="0.6" />
            <stop offset="0.65" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <radialGradient id={`${id}-spot`} cx="0.32" cy="0.22" r="0.55">
            <stop offset="0" stopColor="white" stopOpacity="0.4" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Oval speech bubble with tail */}
        <path
          d="M32 4 C50 4 60 14 60 26 C60 38 50 46 34 46 L24 46 L14 56 C12.6 57.2 10.8 56 11.4 54.4 L14 47.2 C7 44 4 36 4 26 C4 14 14 4 32 4 Z"
          fill={`url(#${id}-fill)`}
        />
        {/* Radial glass spot */}
        <path
          d="M32 4 C50 4 60 14 60 26 C60 38 50 46 34 46 L24 46 L14 56 C12.6 57.2 10.8 56 11.4 54.4 L14 47.2 C7 44 4 36 4 26 C4 14 14 4 32 4 Z"
          fill={`url(#${id}-spot)`}
        />
        {/* Top shine highlight */}
        <path
          d="M32 5 C49 5 59 14.5 59 26 V28 C45 22 19 22 5 28 V26 C5 14.5 15 5 32 5 Z"
          fill={`url(#${id}-shine)`}
        />
        {/* Hairline rim */}
        <path
          d="M32 4 C50 4 60 14 60 26 C60 38 50 46 34 46 L24 46 L14 56 C12.6 57.2 10.8 56 11.4 54.4 L14 47.2 C7 44 4 36 4 26 C4 14 14 4 32 4 Z"
          fill="none"
          stroke="white"
          strokeOpacity="0.32"
          strokeWidth="0.7"
        />
      </svg>
    </div>
  )
}
