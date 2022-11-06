<template>
  <v-container fluid>
    <v-row justify="center" align="center">
      <v-col cols="12">
        <photo-list />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import { defineComponent } from '@nuxtjs/composition-api'
import { useMeStore } from '~/store/me-store'
import PhotoList from '~/components/modules/PhotoList'

export default defineComponent({
  components: { PhotoList },
  // name: 'IndexPage',
  middleware: ['authenticated'],
  setup (ctx) {
    const meStore = useMeStore(ctx.$pinia)
    return {
      meStore,
    }
  },

  mounted () {
    console.log('me', this.meStore.me)
  },
})
</script>
