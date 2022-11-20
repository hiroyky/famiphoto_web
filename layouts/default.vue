<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    />

    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-btn icon outlined to="/">
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <account-menu />
    </v-app-bar>
    <v-main>
      <Nuxt />
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; FAMIPHOTO {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import AccountMenu from '~/components/parts/AccountMenu'
export default {
  name: 'DefaultLayout',
  components: { AccountMenu },
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: this.$config.APP_NAME,
    }
  },
}
</script>
