<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>写真の取り込み</v-card-title>
          <v-card-text>
            写真フォルダにある写真ファイルを取り込みます。写真を追加したら実行してください。
          </v-card-text>
          <v-card-text>
            {{ meStore.group.displayId }} - {{ meStore.userId }}
          </v-card-text>
          <v-card-actions>
            <v-btn @click="onStatClick">
              写真取り込みを開始
            </v-btn>
            <v-checkbox v-model="refreshMode" label="取り込み済み写真の情報も更新する" class="ml-4" />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMeStore } from '~/store/me-store'
import alertStore from '~/store/alert-store'
import { usePhotoStore } from '~/store/photo-store'

export default defineComponent({
  name: 'IndexingPage',
  layout: 'default',
  setup () {
    return {
      meStore: useMeStore(),
      photoStore: usePhotoStore(),
      alertStore: alertStore(),
    }
  },
  data () {
    return {
      refreshMode: false,
    }
  },
  methods: {
    async onStatClick () {
      try {
        await this.photoStore.beginIndexing(this.meStore.group.id, !this.refreshMode)
        this.alertStore.displayMessage('写真の取り込みを開始しました。順次取り込みます。お待ちください。')
      } catch (err) {
        console.error(err)
        this.alertStore.displayError('エラーが発生しました。')
      }
    },
  },
})
</script>
