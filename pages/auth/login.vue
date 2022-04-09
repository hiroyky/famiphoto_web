<template>
  <v-card>
    <v-card-title>ログイン</v-card-title>
    <v-form>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" :href="loginPage">
          ログイン
        </v-btn>
        <v-spacer />
      </v-card-actions>
      <v-card-text class="text-center">
        <nuxt-link to="./create_user">
          アカウント新規作成
        </nuxt-link>
      </v-card-text>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'LoginPage',
  layout: 'center',

  computed: {
    loginPage () {
      const u = new URL(this.$config.LOGIN_PAGE_URL)
      u.search = new URLSearchParams({
        response_type: 'code',
        redirect_uri: this.$config.LOGIN_REDIRECT_URL,
        client_id: this.$config.CLIENT_ID,
        state: 'hogefuga',
      }).toString()
      return u.href
    },
  },
  methods: {
  },
})
</script>
