import { Middleware } from '@nuxt/types'
import { useMeStore } from '~/store/me-store'

const authenticated: Middleware = function (ctx) {
  const me = useMeStore(ctx.pinia)
  if (!me.isLoggedIn) {
    return ctx.redirect('/auth/login')
  }
}

export default authenticated
