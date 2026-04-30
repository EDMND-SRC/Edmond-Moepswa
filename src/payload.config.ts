import { postgresAdapter, type PostgresAdapterArgs } from '@payloadcms/db-postgres'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Users } from './collections/Users'
import { Services } from './collections/Services'
import { Projects } from './collections/Projects'
import { Testimonials } from './collections/Testimonials'
import { FAQs } from './collections/FAQs'
import { Leads } from './collections/Leads'
import { Orders } from './collections/Orders'
import { Products } from './collections/Products'
import { SiteSettings } from './globals/SiteSettings'
import { Header } from './Header/config'
import { Footer } from './Footer/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { workerSafePg } from '@/lib/cloudflare/workerSafePg'
import { getServerSideURL } from './utilities/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const payloadDbPoolMax = Number.parseInt(process.env.PAYLOAD_DB_POOL_MAX || '', 10)
const useWorkerSafePg = process.env.PAYLOAD_DB_POOL_MAX === '1'
const useCloudflarePayloadAdminBuild = process.env.CLOUDFLARE_WORKER_VARIANT === 'payload'
const runtimePg = useWorkerSafePg ? (workerSafePg as unknown as PostgresAdapterArgs['pg']) : undefined

export default buildConfig({
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeLogin: ['@/components/BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeDashboard: ['@/components/BeforeDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    ...(useCloudflarePayloadAdminBuild
      ? {}
      : {
          livePreview: {
            breakpoints: [
              {
                label: 'Mobile',
                name: 'mobile',
                width: 375,
                height: 667,
              },
              {
                label: 'Tablet',
                name: 'tablet',
                width: 768,
                height: 1024,
              },
              {
                label: 'Desktop',
                name: 'desktop',
                width: 1440,
                height: 900,
              },
            ],
          },
        }),
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: postgresAdapter({
    ...(runtimePg ? { pg: runtimePg } : {}),
    pool: {
      connectionString: process.env.DATABASE_URL || '',
      ...(Number.isFinite(payloadDbPoolMax) ? { max: payloadDbPoolMax } : {}),
    },
    push: false,
  }),
  collections: [Pages, Services, Projects, Testimonials, FAQs, Media, Leads, Users, Orders, Products],
  cors: [getServerSideURL()],
  globals: [Header, Footer, SiteSettings],
  plugins,
  secret: process.env.PAYLOAD_SECRET,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        const secret = process.env.CRON_SECRET
        if (!secret) return false

        // If there is no logged in user, then check
        // for the scheduled job secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${secret}`
      },
    },
    tasks: [],
  },
})
