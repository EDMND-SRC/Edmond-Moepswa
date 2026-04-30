const GithubSvg = ({ className, color = 'currentColor' }: { className?: string; color?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M9 19c-4 1.5-4-2.5-6-3m12 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3-.3 6.2-1.5 6.2-6.9A5.4 5.4 0 0 0 19 4.8 5 5 0 0 0 18.9 1S17.7.7 15 2.5a13.4 13.4 0 0 0-6 0C6.3.7 5.1 1 5.1 1A5 5 0 0 0 5 4.8a5.4 5.4 0 0 0-1.3 3.8c0 5.4 3.2 6.6 6.2 6.9a3.4 3.4 0 0 0-.9 2.6V22" />
  </svg>
)

const XSvg = ({ className, color = 'currentColor' }: { className?: string; color?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M4 4l16 16" />
    <path d="M20 4 4 20" />
  </svg>
)

const ThreadsSvg = ({ className, color = 'currentColor' }: { className?: string; color?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M8.5 8.5c.7-1.3 2-2.1 3.8-2.1 2.9 0 4.9 1.7 4.9 4.4 0 2.9-2.1 4.8-5.4 4.8-2.8 0-4.7-1.6-4.7-4 0-2.3 1.8-3.8 4.5-3.8 2.2 0 4.1 1.1 5.2 3.1" />
    <path d="M12 15.6c-1.7 0-2.9-.9-2.9-2.2 0-1.3 1.2-2.2 3-2.2 1.8 0 3 .9 3 2.2 0 1.2-1.3 2.2-3.1 2.2Z" />
  </svg>
)

const LinkedinSvg = ({ className, color = 'currentColor' }: { className?: string; color?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M6.5 9.5V18" />
    <path d="M11 18v-4.4c0-1.7 1.1-2.8 2.7-2.8S16.5 11.9 16.5 14V18" />
    <path d="M16.5 18V14" />
    <circle cx="6.5" cy="6.5" r="1.2" fill={color} stroke="none" />
  </svg>
)

const InstagramSvg = ({ className, color = 'currentColor' }: { className?: string; color?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect x="4.5" y="4.5" width="15" height="15" rx="4" />
    <circle cx="12" cy="12" r="3.2" />
    <circle cx="16.8" cy="7.2" r="1" fill={color} stroke="none" />
  </svg>
)

export const GithubIcon = ({ className, color = '#181717' }: { className?: string; color?: string }) => (
  <GithubSvg className={className} color={color} />
)

export const GithubLight = ({ className }: { className?: string }) => (
  <GithubSvg className={className} color="#FFFFFF" />
)

export const LinkedinIcon = ({ className }: { className?: string }) => (
  <LinkedinSvg className={className} color="#0A66C2" />
)

export const InstagramIcon = ({ className }: { className?: string }) => (
  <InstagramSvg className={className} color="#E4405F" />
)

export const TwitterIcon = ({ className, color = '#000000' }: { className?: string; color?: string }) => (
  <XSvg className={className} color={color} />
)

export const XLight = ({ className }: { className?: string }) => (
  <XSvg className={className} color="#FFFFFF" />
)

export const ThreadsIcon = ({ className, color = '#000000' }: { className?: string; color?: string }) => (
  <ThreadsSvg className={className} color={color} />
)

export const ThreadsLight = ({ className }: { className?: string }) => (
  <ThreadsSvg className={className} color="#FFFFFF" />
)

export const CodepenIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
    <line x1="12" y1="22" x2="12" y2="15.5" />
    <polyline points="22 8.5 12 15.5 2 8.5" />
    <polyline points="2 15.5 12 8.5 22 15.5" />
    <line x1="12" y1="2" x2="12" y2="8.5" />
  </svg>
)
