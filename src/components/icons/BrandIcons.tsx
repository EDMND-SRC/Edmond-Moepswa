import React from 'react'
import {
  GitHubDark as Github,
  GitHubLight as GithubLightIcon,
  LinkedIn,
  Instagram,
  XDark as X,
  XLight as XLightIcon,
  ThreadsDark as Threads,
  ThreadsLight as ThreadsLightIcon
} from 'developer-icons'


export const GithubIcon = ({ className, color = '#181717' }: { className?: string, color?: string }) => (
  <Github className={className} size={24} color={color} />
)

export const GithubLight = ({ className }: { className?: string }) => (
  <GithubLightIcon className={className} size={24} />
)


export const LinkedinIcon = ({ className }: { className?: string }) => (
  <LinkedIn className={className} size={24} color="#0A66C2" />
)


export const InstagramIcon = ({ className }: { className?: string }) => (
  <Instagram className={className} size={24} color="#E4405F" />
)


export const TwitterIcon = ({ className, color = '#000000' }: { className?: string, color?: string }) => (
  <X className={className} size={24} color={color} />
)

export const XLight = ({ className }: { className?: string }) => (
  <XLightIcon className={className} size={24} />
)


export const ThreadsIcon = ({ className, color = '#000000' }: { className?: string, color?: string }) => (
  <Threads className={className} size={24} color={color} />
)

export const ThreadsLight = ({ className }: { className?: string }) => (
  <ThreadsLightIcon className={className} size={24} />
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
