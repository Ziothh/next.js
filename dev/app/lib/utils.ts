import { useRouter as useAppRouter } from 'next/navigation'
import { useRouter as usePagesRouter } from 'next/router'
import { PoC_Routes, Route as NextRoute } from 'next'

/*
  Utility namespaces
*/

export namespace Path {
  export type Type = `/${string}`

  export type Param<T extends string = string> = `[${T}]`

  /** Takes in any string and returns a string that starts with a `"/"` */
  export type fromString<T extends string> = T extends Path.Type ? T : `/${T}`
}

export namespace Route {
  /** Parses the parameters from the given URL path string */
  export type getParams<T extends Path.Type> =
    T extends `${infer A}/[${infer Param}]${infer B}`
      ?
          | (Param extends `...${string}`
              ? // If it's a catch-all it's allowed to be any string
                string & {}
              : Param)
          // Recursively parse the path
          | getParams<Path.fromString<`${A}${B}`>>
      : never

  export type Data<Path extends Path.Type> = {
    query?: Record<string, string>
    hash?: string
  } & (Route.getParams<Path> extends never
    ? {}
    : { params: Record<Route.getParams<Path>, string> })

  /** A namespace containing utilities to filter  */
  export namespace Filters {
    /** Filter the given `Paths` union to only contain static paths (= not containing route parameters) */
    export type getStatic<Paths extends Path.Type> = keyof {
      [P in Paths as Route.getParams<P> extends never ? P : never]: any
    }

    /** Filter the given `Paths` union to only contain dyanic paths (= paths with route parameters) */
    export type getDynamic<Paths extends Path.Type> = Exclude<
      Paths,
      Filters.getStatic<Paths>
    >
  }
}

const createRouterUtils = <Routes extends Path.Type>() =>
  ({
    createUrl<Path extends Routes>(path: Path, data: Route.Data<Path>) {
      let url: string = path

      if ('params' in data)
        Object.entries<string>(data.params).forEach(
          ([key, value]) => (url = url.replaceAll(`[${key}]`, value))
        )

      const queryEntries =
        data.query === undefined ? null : Object.entries(data.query)
      if (queryEntries !== null)
        queryEntries.forEach(
          ([key, value], index) =>
            (url += `${index === 0 ? '?' : '&'}${key}=${encodeURI(value)}`)
        )

      if (data.hash !== undefined) url += `#${data.hash}`

      return url as NextRoute<typeof url>
    },
  } as const)

export const { createUrl } = createRouterUtils<PoC_Routes.AllRoutes>()
