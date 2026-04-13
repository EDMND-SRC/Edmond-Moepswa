/**
 * Substack icon as a reusable React component.
 */
export default function SubstackIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M22 6H2l10.5 12L22 6zm0-2H2v2l10.5 12L22 6V4z" />
    </svg>
  )
}
