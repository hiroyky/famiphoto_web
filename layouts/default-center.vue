<template>
  <v-app dark>
    <alert-snackbar />
    <common-navigation />
    <f-header :title="title" />
    <v-main>
      <v-container class="fill-height align-center">
        <v-row justify="center" align="center">
          <v-col cols="12" sm="8" md="6">
            <nuxt />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <f-footer />
  </v-app>
</template>

<script>
import FFooter from '~/components/parts/Footer'
import CommonNavigation from '~/components/parts/CommonNavigation'
import FHeader from '~/components/parts/Header'
import AlertSnackbar from '~/components/modules/AlertSnackbar'
export default {
  name: 'DefaultLayout',
  components: { AlertSnackbar, FHeader, CommonNavigation, FFooter },
  computed: {
    title () {
      return this.$config.APP_NAME || 'FAMIPHOTO'
    },
  },
}
</script>
