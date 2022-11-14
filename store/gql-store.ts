import { defineStore } from 'pinia'
import { GraphQLClient } from 'graphql-request'
import { getSdk } from '~/types/api-gql'

export const useGqlStore = defineStore('gql', {
  state: () => {
    return {
      client: getSdk(new GraphQLClient('/api/graphql')),
    }
  },
})
