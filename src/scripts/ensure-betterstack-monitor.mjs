import dotenv from 'dotenv'

dotenv.config({ path: '.env' })
dotenv.config({ override: true, path: '.env.local' })

const apiKey = process.env.BETTER_STACK_API_KEY
const baseUrl = 'https://uptime.betterstack.com/api/v2'
const targets = [
  {
    checkFrequency: 180,
    monitorType: 'status',
    name: 'edmond production homepage',
    url: 'https://edmond.bridgearc.workers.dev',
  },
]

if (!apiKey) {
  throw new Error('BETTER_STACK_API_KEY is required')
}

async function betterStackRequest(method, pathname, body) {
  const response = await fetch(`${baseUrl}${pathname}`, {
    method,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  const text = await response.text()
  const payload = text ? JSON.parse(text) : null

  if (!response.ok) {
    throw new Error(`${method} ${pathname} failed (${response.status}): ${JSON.stringify(payload)}`)
  }

  return payload
}

function normalizeMonitors(payload) {
  if (Array.isArray(payload?.data)) {
    return payload.data
  }

  return []
}

function getAttributes(record) {
  return record?.attributes || record || {}
}

async function listMonitors() {
  return normalizeMonitors(await betterStackRequest('GET', '/monitors'))
}

async function createMonitor(target) {
  return betterStackRequest('POST', '/monitors', {
    check_frequency: target.checkFrequency,
    email: true,
    monitor_type: target.monitorType,
    pronounceable_name: target.name,
    request_timeout: 15,
    url: target.url,
  })
}

async function updateMonitor(monitorId, target) {
  return betterStackRequest('PATCH', `/monitors/${monitorId}`, {
    check_frequency: target.checkFrequency,
    monitor_type: target.monitorType,
    pronounceable_name: target.name,
    request_timeout: 15,
    url: target.url,
  })
}

async function main() {
  const existingMonitors = await listMonitors()

  for (const target of targets) {
    const existing = existingMonitors.find((monitor) => getAttributes(monitor).url === target.url)

    if (existing) {
      const monitorId = existing.id || existing?.attributes?.id
      await updateMonitor(monitorId, target)
      console.log(`Updated Better Stack monitor ${monitorId} for ${target.url}`)
      continue
    }

    const created = await createMonitor(target)
    console.log(`Created Better Stack monitor ${created?.data?.id || 'unknown'} for ${target.url}`)
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
