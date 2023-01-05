<template>
  <v-navigation-drawer
    app
    clipped
    :value="isDisplayNavigationDrawer"
  >
    <v-list-item to="/photos/upload">
      <v-list-item-icon>
        <v-icon>mdi-upload</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>写真アップロード</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useContainerStore } from '~/store/container-store'

export default defineComponent({
  name: 'CommonNavigation',
  setup () {
    return {
      containerStore: useContainerStore(),
    }
  },
  computed: {
    isDisplayNavigationDrawer () {
      return this.containerStore.isDisplayNavigationDrawer
    },
  },
})
</script>
