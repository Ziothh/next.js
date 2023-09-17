import NextLink, { type LinkProps } from 'next/link'
import type { Route, Path } from './utils'
import type { PoC_Routes } from 'next'

type Props<R extends PoC_Routes.AllRoutes, RouteInferTypes> = Omit<
  LinkProps<RouteInferTypes>,
  'href'
> &
  (
    | Pick<LinkProps<RouteInferTypes>, 'href'>
    | {
        href: { route: R } & Route.Data<Extract<R, Path.Type>>
      }
  )
const Link = <Route extends PoC_Routes.AllRoutes, RouteInferTypes>(
  props: Props<Route, RouteInferTypes>
): JSX.Element => NextLink(props)

export default Link
