import * as React from 'react'

const widthClasses: Record<string, string> = {
  '25': 'max-w-xs',
  '33': 'max-w-sm',
  '50': 'max-w-md',
  '66': 'max-w-lg',
  '75': 'max-w-xl',
  '100': 'max-w-full',
}

export const Width: React.FC<{
  children: React.ReactNode
  className?: string
  width?: number | string
}> = ({ children, className, width }) => {
  const widthClass = width ? widthClasses[String(width)] || 'max-w-full' : undefined
  return <div className={[className, widthClass].filter(Boolean).join(' ')}>{children}</div>
}
