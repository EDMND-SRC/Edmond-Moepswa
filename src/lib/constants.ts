// Centralized contact constants
// If these change, update them here only.
// Runtime env vars take precedence, then env.d.ts defaults.
// Empty strings = feature disabled. Set to valid URL to enable.
export const PHONE_DISPLAY = '+267 78 692 888'
export const PHONE_E164 = '26778692888'
export const EMAIL = 'edmond.moepswa@gmail.com'
export const WHATSAPP_URL = `https://wa.me/${PHONE_E164}`
export const LINKEDIN_URL = process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://www.linkedin.com/in/edmondmoepswa/'
export const X_URL = process.env.NEXT_PUBLIC_X_URL || 'https://x.com/edmnd_src'
export const INSTAGRAM_URL = process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://www.instagram.com/edmnd.src'
export const THREADS_URL = process.env.NEXT_PUBLIC_THREADS_URL || 'https://www.threads.com/@edmnd.src'
export const SUBSTACK_URL = process.env.NEXT_PUBLIC_SUBSTACK_URL || 'https://substack.com/@edmnd'
export const LOCATION = 'Gaborone, Botswana'

// Cal.com — read from env if available, fall back to defaults
export const CAL_USERNAME = process.env.CAL_USERNAME || 'edmond-moepswa'
export const CAL_NAMESPACE = process.env.CAL_NAMESPACE || '30min'
