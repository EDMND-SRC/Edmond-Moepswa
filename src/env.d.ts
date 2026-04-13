declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Database
      DATABASE_URL: string
      // Payload CMS
      PAYLOAD_SECRET: string
      PAYLOAD_ADMIN_EMAIL?: string
      PAYLOAD_ADMIN_PASSWORD?: string
      // Server
      NEXT_PUBLIC_SERVER_URL?: string
      VERCEL_PROJECT_PRODUCTION_URL?: string
      VERCEL_URL?: string
      // Cal.com
      CAL_WEBHOOK_URL?: string
      CAL_USERNAME?: string
      CAL_NAMESPACE?: string
      // Make.com
      MAKE_API_TOKEN?: string
      // Cron
      CRON_SECRET?: string
    }
  }
}

export {}
