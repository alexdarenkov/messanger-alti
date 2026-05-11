import { useState } from 'react'
import { Icon, type IconName } from './Icon'

interface IconButtonProps {
  icon: IconName
  onClick?: () => void
  title?: string
  active?: boolean
}

/** Small square icon button with hover effect */
export function IconButton({ icon, onClick, title, active = false }: IconButtonProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <button
      onClick={onClick}
      title={title}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center justify-center rounded-[9px] border-none transition-colors duration-150"
      style={{
        width: 32,
        height: 32,
        background: active || hovered ? 'var(--bg-3)' : 'transparent',
        color: hovered || active ? 'var(--text)' : 'var(--text-2)',
      }}
    >
      <Icon name={icon} size={17} />
    </button>
  )
}
