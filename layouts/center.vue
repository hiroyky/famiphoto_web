<template>
  <v-app>
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

<script>
export default {
  name: 'center.vue',
  layout: 'simple',
}
</script>
