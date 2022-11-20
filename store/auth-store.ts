import { defineStore } from 'pinia'
import { useGqlStore } from '~/store/gql-store'
import * as api from '~/repositories/api'

// ログインページにリダイレクトとか？
export const useAuthStore = defineStore('auth', {
  actions: {
    async existUserId (userId: string): Promise<boolean> {
      const { client } = useGqlStore()
      const { existUserId, existGroupId } = await client.existUserId({ id: userId })
      return existUserId || existGroupId
    },

    async login (userId: string, password: string) {
      await api.Login({ userId, password })
    },

    async createUser (userId: string, name: string, password: string) {
      const { client } = useGqlStore()
      await client.createUser({ userId, password, name })
      await this.login(userId, password)
    },
  },
})
