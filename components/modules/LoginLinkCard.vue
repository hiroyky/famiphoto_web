<template>
  <v-card>
    <v-card-title>
      FAMIPHOTO
    </v-card-title>
    <v-card-subtitle>ログイン</v-card-subtitle>

    <v-window v-model="step">
      <v-window-item>
        <login-id-form v-model="loginId" :error-message="loginIdErrorMessage" @commit="onLoginIdCommit" />
      </v-window-item>

      <v-window-item>
        <login-password-form v-model="password" :login-id="loginId" :error-message="passwordErrorMessage" @back="onBack" @commit="onCommit" />
      </v-window-item>
    </v-window>

    <v-card-text class="text-center">
      <nuxt-link to="./create_user">
        アカウント新規作成
      </nuxt-link>
    </v-card-text>
  </v-card>
</template>

<script>
import LoginIdForm from '~/components/parts/LoginIdForm'
import LoginPasswordForm from '~/components/parts/LoginPasswordForm'
export default {
  name: 'LoginLinkCard',
  components: { LoginPasswordForm, LoginIdForm },
  data () {
    return {
      step: 0,
      loginId: '',
      loginIdErrorMessage: '',
      password: '',
      passwordErrorMessage: '',
    }
  },
  methods: {
    onLoginIdCommit () {
      this.step = 1
    },
    onBack () {
      this.step = 0
    },
    onCommit () {

    },
  },
}
</script>
