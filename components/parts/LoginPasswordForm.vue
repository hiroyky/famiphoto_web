<template>
  <v-card>
    <v-form v-model="validate" @submit.prevent="onCommit">
      <v-card-text>
        <p>{{ loginId }}</p>
        <v-text-field
          :value="value"
          label="パスワード"
          type="password"
          autofocus
          :error-messages="errorMessage"
          :rules="rules"
          :loading="loading"
          @input="onInput" />
      </v-card-text>
      <v-card-actions>
        <v-btn @click="onBack">
          戻る
        </v-btn>
        <v-spacer />
        <v-btn :disabled="!validate" @click="onCommit">
          ログイン
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    value: {
      type: String,
      default: '',
    },
    loginId: {
      type: String,
      default: '',
    },
    errorMessage: {
      type: String || null,
      default: null,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      validate: false,
    }
  },
  computed: {
    rules () {
      return [(v: string) => v.length > 0 || '入力してください']
    },
  },
  methods: {
    onInput (val: string) {
      this.$emit('input', val)
    },
    onCommit () {
      if (!this.validate) {
        return
      }
      this.$emit('commit')
    },
    onBack () {
      this.$emit('back')
    },
  },
})
</script>
