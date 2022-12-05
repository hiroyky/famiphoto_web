<template>
  <v-card>
    <v-form v-model="validate" @submit.prevent="onNextClick">
      <v-card-text>
        <p v-if="loginId">
          {{ loginId }}
        </p>
        <v-text-field
          label="名前"
          autofocus
          :value="value"
          :error-messages="errorMessage"
          :rules="rules"
          @input="onInput"
        />
      </v-card-text>
      <v-card-actions>
        <v-btn @click="onBack">
          戻る
        </v-btn>
        <v-spacer />
        <v-btn :disabled="!validate" @click="onNextClick">
          次へ
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
    errorMessage: {
      type: String || null,
      default: null,
    },
    loginId: {
      type: String || null,
      default: null,
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
      this.validate = true
      this.$emit('input', val)
    },
    onNextClick () {
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
