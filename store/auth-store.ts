import { defineStore } from 'pinia'
import { useGqlStore } from '~/store/gql-store'
import * as api from '~/repositories/api'

// ログインページにリダイレクトとか？
export const useAuthStore = defineStore('auth', {
  actions: {
    async existUserId (userId: string): Promise<boolean> {
      const { client } = useGqlStore()
      const { existUserId } = await client.existUserId({ id: userId })
      return existUserId
    },

    async login (userId: string, password: string) {
      await api.Login({ userId, password })
    },
  },
})
