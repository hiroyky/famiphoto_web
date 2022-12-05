<template>
  <v-app>
    <alert-snackbar />
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
import AlertSnackbar from '~/components/modules/AlertSnackbar'
export default {
  name: 'simple.vue',
  components: { AlertSnackbar },
}
</script>
