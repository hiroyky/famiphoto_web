<template>
  <v-card>
    <v-card-title>ログイン</v-card-title>
    <v-form>
      <v-card-text>
        <v-text-field label="ユーザID" />
        <v-text-field label="パスワード" type="password" />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary">
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
})
</script>
