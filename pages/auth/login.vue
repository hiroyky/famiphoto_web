<template>
  <v-container>
    <v-row>
      <v-col>
        <login-link-card />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import LoginLinkCard from '~/components/modules/LoginLinkCard.vue'

export default Vue.extend({
  name: 'LoginPage',
  components: { LoginLinkCard },
  layout: 'center',
})
</script>
