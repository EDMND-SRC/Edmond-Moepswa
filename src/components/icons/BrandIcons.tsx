import React from 'react'
import {
  GitHubDark as Github,
  LinkedIn,
  Instagram,
  XDark as X,
  ThreadsDark as Threads
} from 'developer-icons'

export const GithubIcon = ({ className }: { className?: string }) => (
  <Github className={className} size={24} />
)

export const LinkedinIcon = ({ className }: { className?: string }) => (
  <LinkedIn className={className} size={24} />
)

export const InstagramIcon = ({ className }: { className?: string }) => (
  <Instagram className={className} size={24} />
)

export const TwitterIcon = ({ className }: { className?: string }) => (
  <X className={className} size={24} />
)

export const ThreadsIcon = ({ className }: { className?: string }) => (
  <Threads className={className} size={24} />
)

export const CodepenIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
    <line x1="12" y1="22" x2="12" y2="15.5" />
    <polyline points="22 8.5 12 15.5 2 8.5" />
    <polyline points="2 15.5 12 8.5 22 15.5" />
    <line x1="12" y1="2" x2="12" y2="8.5" />
  </svg>
)
