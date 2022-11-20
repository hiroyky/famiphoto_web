<template>
  <v-card>
    <v-form v-model="validate" @submit.prevent="onCommit">
      <v-card-text>
        <p>{{ loginId }}</p>
        <p v-if="userName">
          {{ userName }}
        </p>
        <v-text-field
          :value="value"
          label="パスワード"
          :type="isShowText ? 'text' : 'password'"
          :append-icon="isShowText ? 'mdi-eye' : 'mdi-eye-off'"
          autofocus
          :error-messages="errorMessage"
          :rules="rules"
          :loading="loading"
          @input="onInput"
          @click:append="isShowText = !isShowText"
        />
      </v-card-text>
      <v-card-actions>
        <v-btn @click="onBack">
          戻る
        </v-btn>
        <v-spacer />
        <v-btn :disabled="!validate" @click="onCommit">
          <slot name="nextButton">
            ログイン
          </slot>
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
    userName: {
      type: String || null,
      default: null,
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
      isShowText: false,
    }
  },
  computed: {
    rules () {
      return [(v: string) => v.length > 0 || '入力してください']
    },
  },
  methods: {
    onInput (val: string) {
      this.validate = true
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
