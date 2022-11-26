<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            FAMIPHOTO
          </v-card-title>
          <v-card-subtitle>ログイン</v-card-subtitle>

          <v-window v-model="step">
            <v-window-item>
              <login-id-form v-model="loginId" :loading="loading" :error-message="loginIdErrorMessage" @commit="onLoginIdCommit" @input="loginIdErrorMessage=''" />
            </v-window-item>

            <v-window-item>
              <login-password-form
                v-model="password"
                :loading="loading"
                :login-id="loginId"
                :error-message="passwordErrorMessage"
                @back="onBack"
                @commit="onCommit"
                @input="passwordErrorMessage=''"
              />
            </v-window-item>
          </v-window>

          <v-card-text class="text-center">
            <nuxt-link to="./create_user">
              アカウント新規作成
            </nuxt-link>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import LoginIdForm from '~/components/parts/LoginIdForm.vue'
import LoginPasswordForm from '~/components/parts/LoginPasswordForm.vue'
import { useAuthStore } from '~/store/auth-store'
import { ApiError } from '~/repositories/api'

export default Vue.extend({
  name: 'LoginPage',
  components: { LoginIdForm, LoginPasswordForm },
  layout: 'center',
  middleware: ['unauthenticated'],
  setup () {
    return {
      authStore: useAuthStore(),
    }
  },
  data () {
    const to = this.$route.query.to
    return {
      step: 0,
      loginId: '',
      loginIdErrorMessage: '',
      password: '',
      passwordErrorMessage: '',
      loading: false,
      to: typeof to === 'string' ? to : '/',
    }
  },
  methods: {
    async onLoginIdCommit () {
      try {
        this.loading = true
        if (!await this.authStore.existUserId(this.loginId)) {
          this.loginIdErrorMessage = 'そのユーザIDは存在しません。'
          return
        }
        this.step = 1
      } finally {
        this.loading = false
      }
    },
    onBack () {
      this.step = 0
    },
    async onCommit () {
      try {
        this.loading = true
        await this.authStore.login(this.loginId, this.password)
        await this.$router.push(this.to)
      } catch (err) {
        if (err instanceof ApiError) {
          if (err.errorCode === 'UserUnauthorizedError') {
            this.passwordErrorMessage = 'パスワードが違います。。'
            return
          }
        }
        this.passwordErrorMessage = '予期せぬエラーが起こりました。'
      } finally {
        this.loading = false
      }
    },
  },
})
</script>
