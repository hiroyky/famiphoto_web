<template>
  <v-toolbar>
    <v-text-field hide-details prepend-icon="mdi-magnify" single-line label="検索 (タグをコンマ区切りで入力)" />
    <v-btn class="ml-2">絞込</v-btn>
    <v-spacer></v-spacer>
    <v-btn-toggle>
      <v-btn>ALL</v-btn>
      <v-btn>年</v-btn>
      <v-btn>月</v-btn>
      <v-btn>日</v-btn>
    </v-btn-toggle>
  </v-toolbar>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PhotoSearch'
})
</script>
