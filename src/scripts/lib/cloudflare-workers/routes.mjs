import fs from 'node:fs'
import path from 'node:path'

import { cloudflarePaths } from './config.mjs'

const appDir = path.join(cloudflarePaths.rootDir, 'src', 'app')
const publicFrontendDir = path.join(appDir, '(frontend)')
const publicRootApiDir = path.join(appDir, 'api')
const httpMethodExportPattern =
  /\bexport\s+(?:async\s+)?function\s+(GET|POST|PUT|PATCH|DELETE|HEAD|OPTIONS)\b|\bexport\s+const\s+(GET|POST|PUT|PATCH|DELETE|HEAD|OPTIONS)\b/g

const routeManifestSchemaVersion = 1

function isRouteGroup(segment) {
  return segment.startsWith('(') && segment.endsWith(')')
}

function shouldIgnoreStaticPath(segment) {
  return segment === 'route.ts' || segment === 'route.tsx'
}

function toUrlPathFromRouteFile(routeFilePath, baseDir) {
  const relativePath = path.relative(baseDir, routeFilePath)
  const segments = relativePath.split(path.sep).filter(Boolean)
  const routeSegments = segments
    .filter((segment) => !shouldIgnoreStaticPath(segment))
    .filter((segment) => !isRouteGroup(segment))

  const pathname = `/${routeSegments.join('/')}`

  return pathname === '/' ? pathname : pathname.replace(/\/+/g, '/')
}

function collectRouteFiles(dirPath) {
  const routeFiles = []

  if (!fs.existsSync(dirPath)) {
    return routeFiles
  }

  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    const entryPath = path.join(dirPath, entry.name)

    if (entry.isDirectory()) {
      routeFiles.push(...collectRouteFiles(entryPath))
      continue
    }

    if (entry.name === 'route.ts' || entry.name === 'route.tsx') {
      routeFiles.push(entryPath)
    }
  }

  return routeFiles
}

function getRouteMethods(routeFilePath) {
  const source = fs.readFileSync(routeFilePath, 'utf8')
  const methods = new Set()

  for (const match of source.matchAll(httpMethodExportPattern)) {
    methods.add(match[1] || match[2])
  }

  if (methods.has('GET')) {
    methods.add('HEAD')
  }

  return [...methods].sort()
}

export function createRouteManifest() {
  const frontendRouteFiles = collectRouteFiles(publicFrontendDir)
  const publicRootApiRouteFiles = collectRouteFiles(publicRootApiDir)

  const publicFrontendRoutes = frontendRouteFiles.map((routeFile) =>
    toUrlPathFromRouteFile(routeFile, publicFrontendDir),
  )
  const publicRootApiRoutes = publicRootApiRouteFiles.map((routeFile) =>
    toUrlPathFromRouteFile(routeFile, appDir),
  )
  const publicRouteMethods = Object.fromEntries(
    [...frontendRouteFiles, ...publicRootApiRouteFiles].map((routeFile) => [
      toUrlPathFromRouteFile(routeFile, routeFile.startsWith(publicFrontendDir) ? publicFrontendDir : appDir),
      getRouteMethods(routeFile),
    ]),
  )

  return {
    publicExactRoutes: [...new Set([...publicFrontendRoutes, ...publicRootApiRoutes])].sort(),
    publicRootApiRoutes: [...new Set(publicRootApiRoutes)].sort(),
    publicRouteMethods,
    schemaVersion: routeManifestSchemaVersion,
  }
}

export function writeRouteManifest() {
  const routeManifest = createRouteManifest()

  fs.writeFileSync(
    cloudflarePaths.routeManifestFile,
    `${JSON.stringify(routeManifest, null, 2)}\n`,
  )

  return routeManifest
}
