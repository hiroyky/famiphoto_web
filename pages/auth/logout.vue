<template>
  <v-progress-linear indeterminate />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuthStore } from '~/store/auth-store'

export default defineComponent({
  name: 'LogoutPage',
  layout: 'simple',
  middleware: ['authenticated'],
  setup () {
    return {
      authStore: useAuthStore(),
    }
  },
  async created () {
    await this.authStore.logout()
    await this.$router.push('/')
  },
})
</script>
