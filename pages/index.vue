<template>
  <v-container fluid>
    <v-row justify="center" align="center">
      <v-col cols="12">
        <photo-list :value="photos" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-pagination v-model="page" :length="paginationLength" total-visible="6" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">

import { defineComponent } from '@nuxtjs/composition-api'
import { useMeStore } from '~/store/me-store'
import PhotoList from '~/components/modules/PhotoList.vue'
import { usePhotoStore } from '~/store/photo-store'
import useAlertStore from '~/store/alert-store'

export default defineComponent({
  name: 'IndexPage',
  components: { PhotoList },
  middleware: ['authenticated'],
  setup () {
    const meStore = useMeStore()
    const photoStore = usePhotoStore()
    return {
      meStore,
      photoStore,
      alertStore: useAlertStore(),
    }
  },

  data () {
    return {
      limit: 50,
      offset: 0,
    }
  },

  computed: {
    photos () {
      return this.photoStore.photos
    },
    paginationLength () {
      return this.photoStore.paginationInfo.paginationLength
    },
    page: {
      get () {
        return this.photoStore.paginationInfo.page
      },
      set (page: number) {
        const offset = (page - 1) * this.limit
        this.$router.push({ path: '/', query: { limit: String(this.limit), offset: String(offset) } })
        this.photoStore.getPhotos({ limit: this.limit, offset })
      },
    },
  },

  created () {
    const { limit, offset } = this.$route.query

    if (typeof limit === 'string') {
      const limitInt = parseInt(limit)
      if (!isNaN(limitInt)) {
        this.limit = limitInt
      }
    }

    if (typeof offset === 'string') {
      const offsetInt = parseInt(offset)
      if (!isNaN(offsetInt)) {
        this.offset = offsetInt
      }
    }
  },

  async mounted () {
    try {
      await this.photoStore.getPhotos({
        limit: this.limit,
        offset: this.offset,
      })
    } catch (err) {
      this.alertStore.displayFatal('予期せぬ通信エラーが発生しました。')
    }
  },
})
</script>
