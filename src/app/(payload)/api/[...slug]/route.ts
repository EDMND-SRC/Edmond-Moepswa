/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import config from '@payload-config'
import '@payloadcms/next/css'
import { toBufferedResponse } from '@/utilities/toBufferedResponse'
import {
  REST_DELETE,
  REST_GET,
  REST_OPTIONS,
  REST_PATCH,
  REST_POST,
  REST_PUT,
} from '@payloadcms/next/routes'

const bufferRoute =
  <TArgs extends { params: Promise<{ slug?: string[] }> }>(
    handler: (request: Request, args: TArgs) => Promise<Response>,
  ) =>
  async (request: Request, args: TArgs) =>
    toBufferedResponse(await handler(request, args))

export const GET = bufferRoute(REST_GET(config))
export const POST = bufferRoute(REST_POST(config))
export const DELETE = bufferRoute(REST_DELETE(config))
export const PATCH = bufferRoute(REST_PATCH(config))
export const PUT = bufferRoute(REST_PUT(config))
export const OPTIONS = bufferRoute(REST_OPTIONS(config))
