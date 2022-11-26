<template>
  <v-app-bar
    fixed
    app
  >
    <v-btn icon outlined to="/">
      <v-icon>mdi-home</v-icon>
    </v-btn>
    <v-toolbar-title v-text="title" />
    <v-spacer />
    <account-menu :user-id="userId" :group-id="groupId" />
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AccountMenu from '~/components/parts/AccountMenu.vue'

export default defineComponent({
  name: 'FHeader',
  components: { AccountMenu },
  props: {
    title: {
      type: String,
      default: 'FAMIPHOTO',
    },
    userId: {
      type: String,
      default: '',
    },
    groupId: {
      type: String,
      default: '',
    },
  },
})
</script>
