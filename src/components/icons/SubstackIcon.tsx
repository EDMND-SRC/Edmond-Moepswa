/**
 * Substack icon as a reusable React component.
 * Uses official brand color and logo path.
 */
export default function SubstackIcon({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="#FF6719" 
      className={className} 
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M22.539 8.242H1.46V5.405h21.078v2.837zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.838h21.078V0z" />
    </svg>
  )
}

