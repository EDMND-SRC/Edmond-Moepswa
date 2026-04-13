'use client'

import { useState, useEffect } from 'react'

/**
 * Skip-to-content link for screen reader and keyboard users.
 * Appears on first Tab press, hidden otherwise.
 */
export default function SkipToContent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setIsVisible(true)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const handleSkip = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const mainContent = document.getElementById('main-content')
    if (mainContent) {
      mainContent.focus({ preventScroll: true })
      mainContent.tabIndex = -1
      setIsVisible(false)
    }
  }

  return (
    <a
      href="#main-content"
      onClick={handleSkip}
      className={`fixed top-4 left-4 z-[var(--z-overlay)] px-6 py-3 bg-[#FF4D2E] text-white rounded-lg font-medium shadow-xl transition-all duration-200 ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
      } focus:translate-y-0 focus:opacity-100 focus:pointer-events-auto`}
    >
      Skip to main content
    </a>
  )
}
