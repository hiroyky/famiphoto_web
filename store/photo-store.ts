import { defineStore } from 'pinia'
import { useGqlStore } from '~/store/gql-store'
import { PhotoList } from '~/types/api-gql-alias'

interface State {
  photos: PhotoList
}

export const usePhotoStore = defineStore('photo', {
  state: (): State => ({
    photos: [],
  }),
  actions: {
    async getPhotos () {
      const { client } = useGqlStore()
      try {
        const res = await client.photos({ limit: 2000 })

        this.photos = res.photos.nodes
          .map(item => item.thumbnailUrl === '' ? { ...item, thumbnailUrl: '/no_thumbnail.png' } : item)
          .map(item => item.previewUrl === '' ? { ...item, previewUrl: '/no_thumbnail.ong' } : item)
      } catch (err) {
        console.error(err)
      }
    },
  },
})
