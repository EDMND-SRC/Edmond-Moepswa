// Centralized contact constants
// If these change, update them here only.
// Runtime env vars take precedence, then env.d.ts defaults.
// Empty strings = feature disabled. Set to valid URL to enable.
export const PHONE_DISPLAY = '+267 78 692 888'
export const PHONE_E164 = '26778692888'
export const EMAIL = 'edmond.moepswa@gmail.com'
export const WHATSAPP_URL = `https://wa.me/${PHONE_E164}`
export const LINKEDIN_URL = '#'
export const X_URL = '#'
export const INSTAGRAM_URL = '#'
export const THREADS_URL = '#'
export const SUBSTACK_URL = process.env.SUBSTACK_URL || 'https://substack.com/@edmnd'
export const GITHUB_URL = '#'
export const LOCATION = 'Gaborone, Botswana'

// Cal.com — read from env if available, fall back to defaults
export const CAL_USERNAME = process.env.CAL_USERNAME || 'edmond-moepswa'
export const CAL_NAMESPACE = process.env.CAL_NAMESPACE || '30min'
