import { defineStore } from 'pinia'
import { GraphQLClient } from 'graphql-request'
import { getSdk } from '~/types/api-gql'

export const useGqlStore = defineStore('gql', {
  state: () => {
    return {
      client: getSdk(new GraphQLClient('/api/graphql')),
      typeNames: {
        user: 'User',
        group: 'Group',
      },
      genNodeId (typeName: string, val: any) {
        return btoa(`${typeName}:${val}`)
      },
    }
  },
})
