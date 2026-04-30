/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import config from '@payload-config'
import { toBufferedResponse } from '@/utilities/toBufferedResponse'
import { GRAPHQL_POST, REST_OPTIONS } from '@payloadcms/next/routes'

export const POST = async (request: Request) => toBufferedResponse(await GRAPHQL_POST(config)(request))

export const OPTIONS = async (request: Request, args: { params: Promise<{ slug?: string[] }> }) =>
  toBufferedResponse(await REST_OPTIONS(config)(request, args))
