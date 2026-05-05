declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CAL_NAMESPACE?: string
      CAL_USERNAME?: string
      CAL_WEBHOOK_URL?: string
      CLOUDFLARE_ACCOUNT_ID?: string
      CLOUDFLARE_API_TOKEN?: string
      CRON_SECRET?: string
      DATABASE_URL: string
      DODO_PAYMENTS_API_KEY?: string
      DODO_PAYMENTS_ENVIRONMENT?: string
      DODO_PAYMENTS_WEBHOOK_SECRET?: string
      MAKE_WEBHOOK_CALCULATOR_QUOTE?: string
      MAKE_WEBHOOK_DODO_PAYMENTS?: string
      MAKE_WEBHOOK_LEAD_CAPTURE?: string
      MAKE_WEBHOOK_RESOURCE_DOWNLOAD?: string
      NEXT_PUBLIC_GA_MEASUREMENT_ID?: string
      NEXT_PUBLIC_INSTAGRAM_URL?: string
      NEXT_PUBLIC_LINKEDIN_URL?: string
      NEXT_PUBLIC_POSTHOG_API_HOST?: string
      NEXT_PUBLIC_POSTHOG_API_KEY?: string
      NEXT_PUBLIC_SERVER_URL?: string
      NEXT_PUBLIC_SUBSTACK_URL?: string
      NEXT_PUBLIC_THREADS_URL?: string
      NEXT_PUBLIC_X_URL?: string
      PREVIEW_SECRET?: string
      R2_ACCESS_KEY_ID?: string
      R2_BUCKET?: string
      R2_ENDPOINT?: string
      R2_PUBLIC_URL?: string
      R2_REGION?: string
      R2_SECRET_ACCESS_KEY?: string
      SUBSTACK_FEED_URL?: string
    }
  }
}

export {}
