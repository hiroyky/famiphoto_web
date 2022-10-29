<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo py-4 d-flex justify-center" />
    </v-col>
  </v-row>
</template>

<script>

import { defineComponent } from '@nuxtjs/composition-api'
import { useMeStore } from '~/store/me-store'

export default defineComponent({
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
