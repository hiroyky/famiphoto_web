import { defineStore } from 'pinia'
import { useGqlStore } from '~/store/gql-store'
import { PhotoList } from '~/types/api-gql-alias'
import { PaginationInfo, PhotoQuery, UploadPhotoMutation } from '~/types/api-gql'
import * as api from '~/repositories/api'
import { useMeStore } from '~/store/me-store'

interface State {
  photo: PhotoQuery['photo'] | null
  photos: PhotoList
  paginationInfo: PaginationInfo
}

interface PhotosGetQuery {
  limit?: number
  offset?: number
}

export const usePhotoStore = defineStore('photo', {
  state: (): State => ({
    photo: null,
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
    async getPhoto (photoId: string) {
      const { client } = useGqlStore()
      try {
        const res = await client.photo({ id: photoId })
        this.photo = res.photo
      } catch (err) {
        console.error(err)
      }
    },
    async getPhotos (q?: PhotosGetQuery) {
      const meStore = useMeStore()
      const { client } = useGqlStore()
      const res = await client.photos({
        groupId: meStore.group.id,
        limit: q?.limit ? q.limit : 50,
        offset: q?.offset ? q.offset : 0,
      })

      this.photos = res.photos.nodes
        .map(item => item.thumbnailUrl === '' ? { ...item, thumbnailUrl: '/no_thumbnail.png' } : item)
        .map(item => item.previewUrl === '' ? { ...item, previewUrl: '/no_thumbnail.ong' } : item)
      this.paginationInfo = res.photos.pageInfo
    },
    async beginIndexing (groupId: string, fast: boolean) {
      const { client } = useGqlStore()
      const { indexingPhotos } = await client.indexingPhotos({ groupId, fast })
      return indexingPhotos
    },
    async uploadPhoto (file: File, groupGqlId: string) {
        const { client } = useGqlStore()
        const { uploadPhoto } = await client.uploadPhoto({ groupId: groupGqlId })
        await api.uploadPhoto(uploadPhoto.uploadUrl, file)
    },
  },
})
