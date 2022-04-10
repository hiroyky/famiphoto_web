<template>
  <v-card :loading="true">
    <v-card-title>ログイン中</v-card-title>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { newAuthUseCase } from '~/app/di/registry'

const authClientUsecase = newAuthUseCase()

export default Vue.extend({
  name: 'LoginRedirectingPage',
  layout: 'center',

  async asyncData ({ redirect, query }) {
    const { state, code } = query
    if (!state || !code) {
      redirect('/login')
      return {}
    }
    return { code, state }
  },

  data () {
    return {
      state: '',
      code: '',
    }
  },
  mounted () {
    this.login(this.code, this.state)
  },
  methods: {
    async login (code: string, state: string) {
      await authClientUsecase.authorizationCode(code, state)
      await this.$router.push('/')
    },
  },
})
</script>
