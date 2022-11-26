<template>
  <v-menu offset-y>
    <template #activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item-group>
        <v-list-item>
          <v-list-item-icon><v-icon>mdi-account-circle</v-icon></v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ userId }}</v-list-item-title>
            <v-list-item-subtitle>{{ groupId }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
      <v-divider />
      <v-list-item-group>
        <!--
        <v-list-item>
          <v-list-item-icon><v-icon>mdi-account-cog</v-icon></v-list-item-icon>
          <v-list-item-content>アカウント情報</v-list-item-content>
        </v-list-item>
        -->
        <v-list-item to="/settings">
          <v-list-item-icon><v-icon>mdi-cog</v-icon></v-list-item-icon>
          <v-list-item-content>設定</v-list-item-content>
        </v-list-item>
        <v-list-item to="/groups/select_group">
          <v-list-item-icon><v-icon>mdi-home-group</v-icon></v-list-item-icon>
          <v-list-item-content>グループ切替</v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon><v-icon>mdi-logout</v-icon></v-list-item-icon>
          <v-list-item-content>ログアウト</v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AccountMenu',
  props: {
    userId: {
      type: String,
      default: '',
    },
    groupId: {
      type: String,
      default: '',
    },
  },
  methods: {

  },
})
</script>
