import { Middleware } from '@nuxt/types'
import { useMeStore } from '~/store/me-store'

const unauthenticated: Middleware = function (ctx) {
  const meStore = useMeStore(ctx.pinia)

  if (meStore.isLoggedIn) {
    return ctx.redirect('/')
  }
}

export default unauthenticated
