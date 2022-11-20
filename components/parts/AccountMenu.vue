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
            <v-list-item-title>hiro</v-list-item-title>
            <v-list-item-subtitle>yokoyama</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
      <v-divider />
      <v-list-item-group>
        <v-list-item>
          <v-list-item-icon><v-icon>mdi-manage-accounts</v-icon></v-list-item-icon>
          <v-list-item-content>アカウント情報</v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon><v-icon>mdi-group</v-icon></v-list-item-icon>
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
