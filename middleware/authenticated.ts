import { Middleware } from '@nuxt/types'
import { useMeStore } from '~/store/me-store'
import { useGroupStore } from '~/store/group-store'

const authenticated: Middleware = async function (ctx) {
  const meStore = useMeStore(ctx.pinia)
  const groupStore = useGroupStore(ctx.pinia)

  if (!meStore.isLoggedIn) {
    return ctx.redirect('/auth/login')
  }

  if (ctx.route.name !== 'groups-select_group') {
    if (meStore.group.id === '' || !await groupStore.isBelongingGroup(meStore.group.id)) {
      ctx.redirect('/groups/select_group', { to: ctx.route.fullPath })
    }
  }
}

export default authenticated
