<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>グループ作成</v-card-title>
          <v-card-subtitle>写真やユーザをグループ単位で管理します。</v-card-subtitle>
          <v-window v-model="step">
            <v-window-item>
              <group-id-form
                v-model="groupId"
                :loading="loading"
                :error-message="groupIdErrorMessage"
                @commit="onGroupIdCommit"
                @input="groupIdErrorMessage=''"
              />
            </v-window-item>
            <v-window-item>
              <group-name-form
                v-model="groupName"
                :loading="loading"
                :group-id="groupId"
                :error-message="groupNameErrorMessage"
                @back="onBack"
                @commit="onGroupNameCommit"
                @input="groupNameErrorMessage=''"
              />
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import GroupIdForm from '~/components/parts/GroupIdForm.vue'
import GroupNameForm from '~/components/parts/GroupNameForm.vue'
import { useAuthStore } from '~/store/auth-store'
import { useGroupStore } from '~/store/group-store'
import { useMeStore } from '~/store/me-store'
import useAlertStore from '~/store/alert-store'

export default defineComponent({
  name: 'CreateGroupPage',
  components: { GroupNameForm, GroupIdForm },
  layout: 'default-center',
  middleware: ['authenticated'],
  setup () {
    return {
      meStore: useMeStore(),
      authStore: useAuthStore(),
      groupStore: useGroupStore(),
      alertStore: useAlertStore(),
    }
  },
  data () {
    return {
      step: 0,
      groupId: '',
      groupIdErrorMessage: '',
      groupName: '',
      groupNameErrorMessage: '',
      loading: false,
    }
  },
  methods: {
    async onGroupIdCommit () {
      try {
        this.loading = true
        if (await this.authStore.existUserId(this.groupId)) {
          this.groupIdErrorMessage = 'そのグループIDは使われています。'
          return
        }
        this.step = 1
      } finally {
        this.loading = false
      }
    },
    async onGroupNameCommit () {
      try {
        this.loading = true
        const { id, groupId } = await this.groupStore.creteGroup(this.groupId, this.groupName)
        this.meStore.setCurrentGroup(id, groupId)
        await this.$router.push('/groups/alter_member')
      } finally {
        this.loading = false
      }
    },
    onBack () {
      this.step--
    },
  },
})
</script>
