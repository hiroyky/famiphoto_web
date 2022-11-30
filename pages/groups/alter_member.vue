<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>グループメンバの編集</v-card-title>
          <v-card-text>
            <group-abstraction-table
              :value="{
                id: meStore.group.id,
                groupId: meStore.group.displayId,
                name: groupName,
              }"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-subtitle>メンバーの追加</v-card-subtitle>
          <v-form class="mx-2" @submit.prevent="onAddMemberClick">
            <v-card-actions>
              <v-text-field v-model="appendMemberText" label="ユーザID" class="pr-2" />
              <v-btn type="submit">
                追加
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-subtitle>メンバー</v-card-subtitle>
          <group-member-table
            :value="groupMembers"
            :items-per-page-length="groupMemberLimit"
            :page="groupMemberPaginationInfo.page"
            :total-count="groupMemberPaginationInfo.totalCount"
            :loading="groupMemberLoading"
            @pagination="onGroupPagination"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMeStore } from '~/store/me-store'
import { useGroupStore } from '~/store/group-store'
import GroupAbstractionTable from '~/components/modules/GroupAbstractionTable.vue'
import GroupMemberTable from '~/components/modules/GroupMemberTable.vue'
import { GroupMembers } from '~/types/api-gql-alias'
import { PaginationInfo } from '~/types/api-gql'

export default defineComponent({
  name: 'AlterGroupMemberPage',
  components: { GroupMemberTable, GroupAbstractionTable },
  layout: 'default',
  middleware: ['authenticated'],
  setup () {
    return {
      meStore: useMeStore(),
      groupStore: useGroupStore(),
    }
  },
  data () {
    return {
      appendMemberText: '',
      groupName: '',
      groupMembers: [] as GroupMembers,
      groupMemberPaginationInfo: {} as PaginationInfo,
      groupMemberLimit: 10,
      groupMemberOffset: 0,
      groupMemberLoading: false,
    }
  },
  computed: {
    groupId (): string {
      return this.meStore.group.id
    },
  },
  async created () {
    const group = await this.groupStore.getGroup(this.groupId)
    this.groupName = group.name
    await this.loadGroupMembers(this.groupMemberLimit, this.groupMemberOffset)
  },
  methods: {
    onAddMemberClick () {
      this.groupStore.appendGroupMember(this.groupId, this.appendMemberText)
    },
    onGroupPagination (val :any) {
      console.log(val)
    },
    async loadGroupMembers (limit: number, offset: number) {
      try {
        this.groupMemberLoading = true
        const {
          nodes,
          pageInfo,
        } = await this.groupStore.getGroupMembers(this.groupId, limit, offset)
        this.groupMembers = nodes
        this.groupMemberPaginationInfo = pageInfo
      } finally {
        this.groupMemberLoading = false
      }
    },
  },
})
</script>
