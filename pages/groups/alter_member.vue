<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>グループメンバの編集</v-card-title>
          <v-card-text>
            <v-simple-table>
              <tbody>
                <tr>
                  <td>
                    グループID
                  </td>
                  <td>
                    {{ groupId }}
                  </td>
                </tr>
                <tr>
                  <td>
                    グループ名
                  </td>
                  <td>
                    {{ groupName }}
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-subtitle>メンバーの追加</v-card-subtitle>
          <v-card-actions>
            <v-text-field label="ユーザID" />
            <v-btn>追加</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-subtitle>メンバー</v-card-subtitle>
          <v-simple-table hide-default-footer hide-default-header>
            <thead>
              <tr>
                <th>ユーザID</th>
                <th>名前</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>hiro</td>
                <td>寛和</td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMeStore } from '~/store/me-store'
import { useGroupStore } from '~/store/group-store'

export default defineComponent({
  name: 'AlterGroupMemberPage',
  layout: 'default',
  middleware: ['authenticated'],
  setup() {
    return {
      meStore: useMeStore(),
      groupStore: useGroupStore(),
    }
  },
  async created() {
    const group = await this.groupStore.getGroup(this.meStore.group.id)
    this.groupName = group.name
  },
  data() {
    return {
      groupName: '',
    }
  },
  computed: {
    groupId (): String {
      return this.meStore.group.displayId
    },
  },
})
</script>
