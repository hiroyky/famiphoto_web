import { defineStore } from 'pinia'
import { BelongingGroupsQuery } from '~/types/api-gql'
import { useGqlStore } from '~/store/gql-store'
interface State {
  belongingGroups: BelongingGroupsQuery['belongingGroups']
}

export const useGroupStore = defineStore('group', {
  state: (): State => ({
    belongingGroups: [],
  }),
  actions: {
    async loadBelongingGroups () {
      const { client } = useGqlStore()
      const { belongingGroups } = await client.belongingGroups()
      this.belongingGroups = belongingGroups
    },
    async creteGroup (groupId: string, groupName: string) {
      const { client } = useGqlStore()
      const res = await client.createGroup({ groupId, name: groupName })
      return res.createGroup
    },
    async isBelongingGroup (id: string): Promise<boolean> {
      const { client } = useGqlStore()
      const res = await client.isBelongingGroup({ id })
      return res.isBelongingGroup
    },
    async getGroup (id: string) {
      const { client } = useGqlStore()
      const { group } = await client.group({ id })
      return group
    },
    async getGroupMembers (id: string, limit: number, offset: number) {
      const { client } = useGqlStore()
      const { group } = await client.groupMembers({ id, limit, offset })
      return group.userPagination
    },
    async appendGroupMember (groupId: string, userId: string) {
      const { client, typeNames, genNodeId } = useGqlStore()

      await client.alterGroupMembers({
        groupId,
        appendUserIds: genNodeId(typeNames.user, userId),
      })
    },
  },
})
