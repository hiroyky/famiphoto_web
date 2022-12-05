<template>
  <v-app>
    <alert-snackbar />
    <v-main>
      <v-container class="fill-height align-center">
        <v-row justify="center" align="center">
          <v-col cols="12" sm="8" md="6">
            <nuxt />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AlertSnackbar from '~/components/modules/AlertSnackbar.vue'

export default defineComponent({
  name: 'CenterLayout',
  components: { AlertSnackbar },
})
</script>
