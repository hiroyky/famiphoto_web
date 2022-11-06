<template>
  <v-container fluid>
    <v-row justify="center" align="center">
      <v-col cols="12">
        <photo-list :value="photoStore.photos" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import { defineComponent } from '@nuxtjs/composition-api'
import { useMeStore } from '~/store/me-store'
import PhotoList from '~/components/modules/PhotoList'
import { usePhotoStore } from '~/store/photo-store'

export default defineComponent({
  components: { PhotoList },
  // name: 'IndexPage',
  middleware: ['authenticated'],
  setup (ctx) {
    const meStore = useMeStore(ctx.$pinia)
    const photoStore = usePhotoStore(ctx.$pinia)
    return {
      meStore,
      photoStore,
    }
  },

  async mounted () {
    await this.photoStore.getPhotos()
    console.log('me', this.meStore.me)
  },
})
</script>
