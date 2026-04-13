import { getPayload } from 'payload'
import config from '@payload-config'

let payloadInstance: Awaited<ReturnType<typeof getPayload>> | null = null

export async function getPayloadSingleton() {
  if (!payloadInstance) {
    payloadInstance = await getPayload({ config })
  }
  return payloadInstance
}
