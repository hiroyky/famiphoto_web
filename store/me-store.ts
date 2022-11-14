import { defineStore } from 'pinia'
import { useGqlStore } from '~/store/gql-store'
import { MeQuery } from '~/types/api-gql'

interface State {
  me: MeQuery['me'] | null
}

// 自身の情報を取得する
export const useMeStore = defineStore('me', {
  state: (): State => ({
    me: null,
  }),

  getters: {
    isLoggedIn (): boolean {
      return this.me !== null
    },
  },

  actions: {
    async getMe () {
      const { client } = useGqlStore()
      try {
        const res = await client.me()
        this.me = res.me
      } catch (err) {
        console.error(err)
      }
    },
  },
})
