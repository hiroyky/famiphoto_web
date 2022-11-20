<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>FAMIPHOTO</v-card-title>
          <v-card-subtitle>アカウント作成</v-card-subtitle>

          <v-window v-model="step">
            <v-window-item>
              <login-id-form v-model="loginId" :loading="loading" :error-message="loginIdErrorMessage" @commit="onLoginIdCommit" @input="loginIdErrorMessage=''" />
            </v-window-item>

            <v-window-item>
              <user-name-form v-model="userName" :login-id="loginId" @commit="onUserNameCommit" @back="onBack" />
            </v-window-item>

            <v-window-item>
              <login-password-form
                v-model="password"
                :loading="loading"
                :login-id="loginId"
                :error-message="passwordErrorMessage"
                :user-name="userName"
                @back="onBack"
                @commit="onCommit"
                @input="passwordErrorMessage=''"
              />
            </v-window-item>
          </v-window>

          <v-card-text class="text-center">
            <nuxt-link to="./login">
              既存アカウントでログイン
            </nuxt-link>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LoginIdForm from '~/components/parts/LoginIdForm.vue'
import LoginPasswordForm from '~/components/parts/LoginPasswordForm.vue'
import { useAuthStore } from '~/store/auth-store'
import UserNameForm from '~/components/parts/UserNameForm.vue'

export default defineComponent({
  name: 'CreateUserPage',
  components: { UserNameForm, LoginIdForm, LoginPasswordForm },
  layout: 'center',
  setup () {
    return {
      authStore: useAuthStore(),
    }
  },
  data () {
    return {
      step: 0,
      loginId: '',
      loginIdErrorMessage: '',
      userName: '',
      password: '',
      passwordErrorMessage: '',
      loading: false,
    }
  },
  methods: {
    async onLoginIdCommit () {
      try {
        this.loading = true
        if (await this.authStore.existUserId(this.loginId)) {
          this.loginIdErrorMessage = 'そのユーザIDは使われています。'
          return
        }
        this.step = 1
      } finally {
        this.loading = false
      }
    },
    onBack () {
      this.step--
    },
    onUserNameCommit () {
      this.step = 2
    },
    onCommit () {
      try {
        this.loading = true
      } finally {
        this.loading = false
      }
    },
  },
})
</script>
