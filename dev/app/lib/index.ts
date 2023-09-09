import * as routers from './routers'

const pagesRouter = routers.PagesDir.useRouter()

pagesRouter.push({
  path: '/todos/[id]',
  params: { id: 'hi' },
})

pagesRouter.push({
  path: '/todos',
})

const appRouter = routers.AppDir.useRouter()

appRouter.push('/todos', {
  query: { hello: 'world' },
  hash: 'foo',
})
