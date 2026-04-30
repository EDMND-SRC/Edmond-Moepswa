const { Agent, setGlobalDispatcher } = require('undici')

const connectTimeoutMs = Number.parseInt(process.env.WRANGLER_CONNECT_TIMEOUT_MS ?? '60000', 10)
const headersTimeoutMs = Number.parseInt(process.env.WRANGLER_HEADERS_TIMEOUT_MS ?? '900000', 10)
const bodyTimeoutMs = Number.parseInt(process.env.WRANGLER_BODY_TIMEOUT_MS ?? `${headersTimeoutMs}`, 10)

if (Number.isFinite(headersTimeoutMs) && headersTimeoutMs > 0) {
  setGlobalDispatcher(
    new Agent({
      connect: {
        timeout: connectTimeoutMs,
      },
      bodyTimeout: bodyTimeoutMs,
      headersTimeout: headersTimeoutMs,
    }),
  )
}
