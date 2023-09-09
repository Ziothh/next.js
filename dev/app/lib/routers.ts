import { useRouter as useAppRouter } from 'next/navigation'
import { useRouter as usePagesRouter } from 'next/router'

import type { PoC_Routes } from 'next'
import type { Route } from './utils'

export namespace AppDir {
  export function useRouter() {
    const { push, replace, prefetch, ...router } = useAppRouter()

    return {
      ...router,
      push: <Path extends PoC_Routes.AllRoutes>(
        hrefTemplate: Path,
        options: Route.Data<Path> & Parameters<typeof push>[1]
      ) => push(createUrl(hrefTemplate, options), options),

      replace: <Path extends PoC_Routes.AllRoutes>(
        hrefTemplate: Path,
        options: Route.Data<Path> & Parameters<typeof replace>[1]
      ) => replace(createUrl(hrefTemplate, options), options),

      prefetch: <Path extends PoC_Routes.AllRoutes>(
        hrefTemplate: Path,
        options: Route.Data<Path>
      ) => prefetch(createUrl(hrefTemplate, options)),
    } as const
  }
}
export namespace PagesDir {
  type RouteData<Path extends PoC_Routes.AllRoutes> = Route.Data<Path> & {
    path: Path
  }

  export function useRouter() {
    const { push, replace, prefetch, ...router } = usePagesRouter()

    return {
      ...router,
      push: <
        Path extends PoC_Routes.AllRoutes,
        As extends PoC_Routes.AllRoutes
      >(
        url: RouteData<Path> /* | Parameters<typeof push>[0] */,
        as?: RouteData<As> /* | Parameters<typeof push>[1] */,
        options?: Parameters<typeof push>[2]
      ) =>
        push(
          // 'path' in url ? createUrl(url.path, url) : url,
          createUrl(url.path, url),
          as === undefined ? undefined : createUrl(as.path, as),
          options
        ),

      replace: <
        Path extends PoC_Routes.AllRoutes,
        As extends PoC_Routes.AllRoutes
      >(
        url: RouteData<Path> /* | Parameters<typeof replace>[0] */,
        as?: RouteData<As> /* | Parameters<typeof replace>[1] */,
        options?: Parameters<typeof replace>[2]
      ) =>
        replace(
          // 'path' in url ? createUrl(url.path, url) : url,
          createUrl(url.path, url),
          as === undefined ? undefined : createUrl(as.path, as),
          options
        ),

      prefetch: <Path extends PoC_Routes.AllRoutes>(
        hrefTemplate: Path,
        options: Route.Data<Path>
      ) => prefetch(createUrl(hrefTemplate, options)),
    } as const
  }
}
