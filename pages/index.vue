<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      FAMIPHOTO
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
  mounted () {
    console.log('mounted')
    fetch('/api/status.html', { method: 'GET' }).then(res => res.text()).then(txt => console.log(txt)).catch(err => console.error(err))
  },
})
</script>
