<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-subtitle>設定</v-card-subtitle>
          <v-list>
            <v-list-item to="/settings/indexing">
              写真の取り込み
            </v-list-item>
            <v-list-item to="/groups/alter_member">
              グループメンバー設定
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SettingsPage',
  middleware: ['authenticated'],
})
</script>
