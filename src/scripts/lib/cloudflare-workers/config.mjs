import path from 'node:path'

const rootDir = process.cwd()
const productionPublicWorkerName = 'edmond-moepswa'
const productionPayloadWorkerName = 'edmond-moepswa-payload'
const workersDevSuffix = 'edmnd-src.workers.dev'

export const payloadAssetPrefix = '/_payload_next'
export const smokeArtifactPrefix = 'cf-smoke-'
export const smokeArtifactFile = path.join(rootDir, 'test-outputs', 'cloudflare-smoke-artifacts.json')
export const smokeFixtureFile = path.join(rootDir, 'public', 'favicon', 'favicon-32x32.png')

export const cloudflarePaths = {
  rootDir,
  buildWranglerConfig: path.join(rootDir, 'wrangler.toml'),
  publicWranglerConfig: path.join(rootDir, 'wrangler.public.toml'),
  payloadWranglerConfig: path.join(rootDir, 'wrangler.payload.toml'),
  outputDir: path.join(rootDir, '.open-next'),
  payloadOutputDir: path.join(rootDir, '.open-next', 'payload'),
  publicOutputDir: path.join(rootDir, '.open-next', 'public'),
  routeManifestFile: path.join(rootDir, 'cloudflare', 'route-manifest.json'),
  scratchDir: path.join(rootDir, 'scratch', 'cloudflare-workers'),
}

export const workerTargets = {
  local: {
    buildPublicURL: 'http://127.0.0.1:8787',
    payloadWorkerName: productionPayloadWorkerName,
    publicWorkerName: productionPublicWorkerName,
    wranglerEnv: null,
  },
  production: {
    buildPublicURL: `https://${productionPublicWorkerName}.${workersDevSuffix}`,
    payloadWorkerName: productionPayloadWorkerName,
    publicWorkerName: productionPublicWorkerName,
    wranglerEnv: null,
  },
  staging: {
    buildPublicURL: `https://${productionPublicWorkerName}-staging.${workersDevSuffix}`,
    payloadWorkerName: `${productionPayloadWorkerName}-staging`,
    publicWorkerName: `${productionPublicWorkerName}-staging`,
    wranglerEnv: 'staging',
  },
}

export const runtimeSecretKeys = [
  'CAL_NAMESPACE',
  'CAL_USERNAME',
  'CAL_WEBHOOK_URL',
  'DATABASE_URL',
  'DODO_PAYMENTS_API_KEY',
  'DODO_PAYMENTS_ENVIRONMENT',
  'DODO_PAYMENTS_WEBHOOK_SECRET',
  'DODO_PRODUCT_5_SIGNS_YOUR_WEBSITE_IS_COSTING_YOU_CLIENTS',
  'DODO_PRODUCT_ARTISAN_CRAFTMAKER_PORTFOLIO',
  'DODO_PRODUCT_AUTOMATED_BOOKING_CRM',
  'DODO_PRODUCT_ECOMMERCE',
  'DODO_PRODUCT_EVENTS_EXPERIENCES',
  'DODO_PRODUCT_FINANCIAL_SERVICES',
  'DODO_PRODUCT_FOOD_HOSPITALITY',
  'DODO_PRODUCT_HEALTH_WELLNESS',
  'DODO_PRODUCT_HOW_TO_BRIEF_A_WEB_DESIGNER',
  'DODO_PRODUCT_LANDING_PAGE',
  'DODO_PRODUCT_NGO_NON_PROFIT',
  'DODO_PRODUCT_PROFESSIONAL_SERVICES_FIRM',
  'DODO_PRODUCT_SAAS_STARTER',
  'DODO_PRODUCT_WEBSITE_LAUNCH_CHECKLIST',
  'DODO_PRODUCT_WHATSAPP_AI_CHATBOT',
  'DODO_PRODUCT_WHATSAPP_APPOINTMENT_REMINDER',
  'MAKE_WEBHOOK_CALCULATOR_QUOTE',
  'MAKE_WEBHOOK_DODO_PAYMENTS',
  'MAKE_WEBHOOK_LEAD_CAPTURE',
  'NEXT_PUBLIC_GA_MEASUREMENT_ID',
  'NEXT_PUBLIC_INSTAGRAM_URL',
  'NEXT_PUBLIC_LINKEDIN_URL',
  'NEXT_PUBLIC_POSTHOG_API_HOST',
  'NEXT_PUBLIC_POSTHOG_API_KEY',
  'NEXT_PUBLIC_SERVER_URL',
  'NEXT_PUBLIC_SUBSTACK_URL',
  'NEXT_PUBLIC_THREADS_URL',
  'NEXT_PUBLIC_X_URL',
  'PAYLOAD_SECRET',
  'PREVIEW_SECRET',
  'R2_ACCESS_KEY_ID',
  'R2_BUCKET',
  'R2_ENDPOINT',
  'R2_PUBLIC_URL',
  'R2_REGION',
  'R2_SECRET_ACCESS_KEY',
  'SMOKE_ADMIN_EMAIL',
  'SMOKE_ADMIN_PASSWORD',
  'SUBSTACK_FEED_URL',
]

export function getTargetConfig(targetName) {
  const target = workerTargets[targetName]

  if (!target) {
    throw new Error(`Unknown Cloudflare worker target: ${targetName}`)
  }

  return target
}

export function getWranglerArgs(configPath, targetName) {
  const target = getTargetConfig(targetName)

  return target.wranglerEnv
    ? ['--config', configPath, '--env', target.wranglerEnv]
    : ['--config', configPath]
}

export function ensureDirectoryPathFor(filePath) {
  return path.dirname(filePath)
}
