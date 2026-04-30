import { defineCloudflareConfig } from '@opennextjs/cloudflare'

const baseConfig = defineCloudflareConfig()

export default {
  ...baseConfig,
  default: {
    ...baseConfig.default,
    placement: 'regional',
    runtime: 'node',
  },
  middleware: {
    ...baseConfig.middleware,
    originResolver: 'pattern-env',
  },
}
