<template>
  <v-footer :absolute="true" app>
    <span>&copy; FAMIPHOTO {{ new Date().getFullYear() }}</span>
  </v-footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FFooter',
})
</script>
