<template>
  <v-card>
    <v-card-title>新規作成</v-card-title>
    <v-window v-model="step">
      <v-window-item>
        <v-form>
          <v-card-text>
            <v-text-field label="希望のユーザID" />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" @click="onSubmitUserId">
              次へ
            </v-btn>
            <v-spacer />
          </v-card-actions>
        </v-form>
      </v-window-item>
      <v-window-item>
        <v-form>
          <v-card-text>
            <v-text-field label="パスワード" type="password" />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn @click="onBackToUserId">
              戻る
            </v-btn>
            <v-btn color="primary" @click="onCreateUserSubmit">
              アカウント作成
            </v-btn>
            <v-spacer />
          </v-card-actions>
        </v-form>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'LoginPage',
  layout: 'center',

  data () {
    return {
      step: 0,
      loading: false,
    }
  },
  methods: {
    onSubmitUserId () {
      this.step = 1
    },
    onBackToUserId () {
      this.step = 0
    },
    onCreateUserSubmit () {

    },
  },
})
</script>
