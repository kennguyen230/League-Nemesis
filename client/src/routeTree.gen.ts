/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as SummonerIndexImport } from './routes/summoner/index'
import { Route as SummonerIdImport } from './routes/summoner/$id'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const SummonerIndexRoute = SummonerIndexImport.update({
  path: '/summoner/',
  getParentRoute: () => rootRoute,
} as any)

const SummonerIdRoute = SummonerIdImport.update({
  path: '/summoner/$id',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/summoner/$id': {
      id: '/summoner/$id'
      path: '/summoner/$id'
      fullPath: '/summoner/$id'
      preLoaderRoute: typeof SummonerIdImport
      parentRoute: typeof rootRoute
    }
    '/summoner/': {
      id: '/summoner/'
      path: '/summoner'
      fullPath: '/summoner'
      preLoaderRoute: typeof SummonerIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  SummonerIdRoute,
  SummonerIndexRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/summoner/$id",
        "/summoner/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/summoner/$id": {
      "filePath": "summoner/$id.tsx"
    },
    "/summoner/": {
      "filePath": "summoner/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
