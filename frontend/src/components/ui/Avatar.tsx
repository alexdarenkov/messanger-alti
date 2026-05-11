import type { User } from '../../types'

interface AvatarProps {
  user: User
  size?: number
  online?: boolean
  ring?: boolean
}

export function Avatar({ user, size = 44, online = false, ring = false }: AvatarProps) {
  const background = user.color ?? user.avatar ?? 'linear-gradient(135deg, #0A84FF, #5E5CE6)'
  const fontSize   = Math.round(size * 0.36)
  const dotSize    = Math.max(10, Math.round(size * 0.28))

  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      {/* Initials circle */}
      <div
        className="w-full h-full rounded-full flex items-center justify-center text-white font-semibold relative overflow-hidden"
        style={{
          background,
          fontSize,
          letterSpacing: '-0.02em',
          boxShadow: ring
            ? '0 0 0 2px var(--surface-elev), 0 0 0 3.5px var(--accent)'
            : 'inset 0 1px 0 rgba(255,255,255,0.25)',
        }}
      >
        {/* Glass highlight */}
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.35), transparent 55%)' }}
        />
        <span className="relative">{user.initials}</span>
      </div>

      {/* Online indicator dot */}
      {online && (
        <div
          className="absolute rounded-full"
          style={{
            bottom: -1,
            right: -1,
            width: dotSize,
            height: dotSize,
            background: '#30D158',
            border: '2.5px solid var(--surface-elev)',
          }}
        />
      )}
    </div>
  )
}
