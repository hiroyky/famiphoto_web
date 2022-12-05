import { Middleware } from '@nuxt/types'
import { useMeStore } from '~/store/me-store'
import { useGroupStore } from '~/store/group-store'

const meMiddleware: Middleware = async (ctx) => {
  const meStore = useMeStore(ctx.pinia)
  await meStore.getMe()
}

export default meMiddleware
