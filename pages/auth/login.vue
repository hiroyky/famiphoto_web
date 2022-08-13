<template>
  <login-link-card />
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
