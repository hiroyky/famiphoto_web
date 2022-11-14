<template>
  <v-card>
    <v-card-title>
      <slot name="title">
        FAMIPHOTO
      </slot>
    </v-card-title>
    <v-form>
      <v-card-actions>
        <v-spacer />
        <login-button />
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

<script>
import LoginButton from '~/components/parts/LoginButton'
export default {
  name: 'LoginLinkCard',
  components: { LoginButton },
}
</script>
