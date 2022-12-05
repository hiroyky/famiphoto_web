<template>
  <v-container class="fill-height align-center">
    <v-row>
      <v-col>
        <v-card :loading="loading">
          <v-card-title>グループ切替</v-card-title>
          <v-card-subtitle>写真やユーザをグループ単位で管理します。</v-card-subtitle>
          <v-card-text>
            グループを選んでください。<br>
            または<nuxt-link to="./create_group">
              グループを作成
            </nuxt-link>します。
          </v-card-text>
          <v-divider />
          <v-list>
            <v-list-item v-for="item in belongingGroups" :key="item.id" @click="onItemClick(item)">
              <v-list-item-content>
                <v-list-item-title>{{ item.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ item.groupId }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useGroupStore } from '~/store/group-store'
import { useMeStore } from '~/store/me-store'
import useAlertStore from '~/store/alert-store'

export default defineComponent({
  name: 'SelectGroupPage',
  layout: 'default-center',
  middleware: ['authenticated'],
  setup () {
    return {
      meStore: useMeStore(),
      groupStore: useGroupStore(),
      alertStore: useAlertStore(),
    }
  },
  data () {
    const to = this.$route.query.to
    return {
      loading: false,
      to: typeof to === 'string' ? to : '/',
    }
  },
  computed: {
    belongingGroups () {
      return this.groupStore.belongingGroups
    },
  },
  async created () {
    try {
      this.loading = true
      await this.groupStore.loadBelongingGroups()
    } finally {
      this.loading = false
    }
  },
  methods: {
    onItemClick (item: { id: string, groupId: string }) {
      this.meStore.setCurrentGroup(item.id, item.groupId)
      this.$router.push(this.to)
    },
  },
})
</script>
