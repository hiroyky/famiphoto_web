<template>
  <v-app dark>
    <alert-snackbar />
    <common-navigation />
    <f-header :title="title" :user-id="userId" :group-id="groupDisplayId" />
    <v-main>
      <Nuxt />
    </v-main>
    <f-footer />
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FFooter from '~/components/parts/Footer.vue'
import CommonNavigation from '~/components/parts/CommonNavigation.vue'
import FHeader from '~/components/parts/Header.vue'
import { useMeStore } from '~/store/me-store'
import AlertSnackbar from '~/components/modules/AlertSnackbar.vue'
export default defineComponent({
  name: 'DefaultLayout',
  components: { AlertSnackbar, FHeader, CommonNavigation, FFooter },
  setup () {
    return {
      meStore: useMeStore(),
    }
  },
  computed: {
    title (): string {
      return this.$config.APP_NAME || 'FAMIPHOTO'
    },
    userId ():string {
      return this.meStore.userId
    },
    groupDisplayId (): string {
      return this.meStore.group.displayId
    },
  },
})
</script>
