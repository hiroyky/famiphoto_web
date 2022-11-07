import { defineStore } from 'pinia'
import { useGqlStore } from '~/store/gql-store'
import { PhotoList } from '~/types/api-gql-alias'
import { PaginationInfo } from '~/types/api-gql'

interface State {
  photos: PhotoList
  paginationInfo: PaginationInfo
}

interface PhotosGetQuery {
  limit?: number
  offset?: number
}

export const usePhotoStore = defineStore('photo', {
  state: (): State => ({
    photos: [],
    paginationInfo: {
      page: 0,
      paginationLength: 0,
      count: 0,
      totalCount: 0,
      hasNextPage: false,
      hasPreviousPage: false,
    },
  }),
  actions: {
    async getPhotos (q?: PhotosGetQuery) {
      const { client } = useGqlStore()
      try {
        const res = await client.photos({
          limit: q?.limit ? q.limit : 50,
          offset: q?.offset ? q.offset : 0,
        })

        this.photos = res.photos.nodes
          .map(item => item.thumbnailUrl === '' ? { ...item, thumbnailUrl: '/no_thumbnail.png' } : item)
          .map(item => item.previewUrl === '' ? { ...item, previewUrl: '/no_thumbnail.ong' } : item)
        this.paginationInfo = res.photos.pageInfo
      } catch (err) {
        console.error(err)
      }
    },
  },
})
