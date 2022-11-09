<template>
  <v-container fluid>
    <v-row justify="center" align="center">
      <v-col cols="12">
        <v-card>
          <v-img :src="previewUrl" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { usePhotoStore } from '~/store/photo-store'

export default defineComponent({
  name: 'PhotoPage',
  middleware: ['authenticated'],
  setup () {
    const photoStore = usePhotoStore()
    return {
      photoStore,
    }
  },
  computed: {
    previewUrl () {
      return this.photoStore.photo !== null ? this.photoStore.photo?.previewUrl : ''
    },
  },
  created () {
    const id = this.$route.params.id
    this.photoStore.getPhoto(id)
  },
})
</script>
