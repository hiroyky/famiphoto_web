<template>
  <v-card>
    <v-card-title>グループに参加</v-card-title>
    <v-card-subtitle>招待されたグループに参加します。</v-card-subtitle>
    <v-card-text>
      <v-text-field label="招待コード" value="323223092809" disabled></v-text-field>
      <v-subheader>グループ</v-subheader><p>ああああああああああああ</p>
      <v-subheader>招待者</v-subheader><p>amaterasu</p>
      <v-subheader>招待有効期限</v-subheader><p>2022年3月14日20時09分</p>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn color="primary">参加する</v-btn>
      <v-btn>辞退する</v-btn>
      <v-spacer />
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'JoinGroupPage',
  layout: 'center',
})
</script>
