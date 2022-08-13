<template>
  <v-btn color="primary" :href="loginPage">
    ログイン
  </v-btn>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'LoginButton',
  computed: {
    loginPage () {
      const u = new URL(this.$config.LOGIN_PAGE_URL)
      u.search = new URLSearchParams({
        response_type: 'code',
        redirect_uri: this.$config.LOGIN_REDIRECT_URL,
        client_id: this.$config.CLIENT_ID,
        state: 'hogefuga',
        scope: 'user',
      }).toString()
      return u.href
    },
  },
})
</script>
