<template>
  <v-app-bar
    fixed
    app
    clipped-left
  >
    <v-btn icon outlined class="mr-2" @click="onMenuClick">
      <v-icon>mdi-menu</v-icon>
    </v-btn>
    <v-btn icon outlined to="/" class="mr-2">
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
import { useContainerStore } from '~/store/container-store'

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
  setup () {
    return {
      containerStore: useContainerStore(),
    }
  },
  methods: {
    onMenuClick () {
      this.containerStore.isDisplayNavigationDrawer = !this.containerStore.isDisplayNavigationDrawer
    },
  },
})
</script>
