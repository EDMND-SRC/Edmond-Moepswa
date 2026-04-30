'use client'

import { useSyncExternalStore } from 'react'

function subscribe(callback: () => void) {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  mediaQuery.addEventListener('change', callback)
  return () => mediaQuery.removeEventListener('change', callback)
}

function getSnapshot(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function getServerSnapshot(): boolean {
  // Default to no reduced motion on server to avoid hydration mismatch
  // The client will correct this on hydration
  return false
}

/**
 * Returns whether the user has requested reduced motion.
 * Uses useSyncExternalStore to avoid SSR hydration mismatches.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
