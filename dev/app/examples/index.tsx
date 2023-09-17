import type { FC } from 'react'
import { PagesDir, AppDir, Link } from '../lib'

const PagesComponent: FC = () => {
  const pagesRouter = PagesDir.useRouter()

  /// Example with static path
  pagesRouter.push({
    path: '/todos',
  })

  /// Example with dynamic path
  // TypeScript warns about the missing 'id' parameter
  // @ts-expect-error
  pagesRouter.push({
    path: '/todos/[id]',
  })

  pagesRouter.push({
    path: '/todos/[id]',
    params: { id: 'hi' },
  })

  return null
}

const AppComponent: FC = () => {
  const appRouter = AppDir.useRouter()

  appRouter.push('/todos', {
    query: { hello: 'world' },
    hash: 'foo',
  })

  return null
}

const TodoLink: FC<{ id: string }> = ({ id }) => (
  <Link
    href={{
      route: '/todos/[id]',
      params: { id },
    }}
  >
    Goto todo({id})
  </Link>
)
