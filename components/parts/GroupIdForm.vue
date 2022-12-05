<template>
  <v-card>
    <v-form v-model="validate" @submit.prevent="onNextClick">
      <v-card-text>
        <v-text-field
          label="グループID"
          autofocus
          :value="value"
          :error-messages="errorMessage"
          :rules="rules"
          :loading="loading"
          @input="onInput"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn :disabled="!validate" type="submit">
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
    onNextClick () {
      if (!this.validate) {
        return
      }
      this.$emit('commit')
    },
  },
})
</script>
