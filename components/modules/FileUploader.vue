<template>
  <div>
    <v-file-input
      :label="label"
      :multiple="multiple"
      :value="value"
      :accept="accepts.join(',')"
      :disabled="loading"
      @change="onChange"
    >
      <template #append-outer>
        <v-btn :loading="loading" @click="onCommit">
          アップロード
        </v-btn>
      </template>
    </v-file-input>
    <v-progress-linear :active="loading" :value="progressPercent" height="20">
      <template>
        <strong> {{ progress }} / {{ value.length }} </strong>
      </template>
    </v-progress-linear>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'FileUploader',
  props: {
    value: {
      type: Array as PropType<File[]>,
      default: [],
    },
    prependIcon: {
      type: String,
      default: '$file',
    },
    label: {
      type: String,
      default: '',
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    accepts: {
      type: Array as PropType<string[]>,
      default: [],
    },
    progress: {
      type: Number,
      default: -1,
    },
    loading: {
      type: Boolean,
      default: false,
    }
  },
  data () {
    return {
      files: this.value,
    }
  },
  computed: {
    progressPercent(): Number {
      return this.files ? Math.round((this.progress/ this.files.length) * 100.0) : 0
    },
  },
  methods: {
    onChange (inputFiles: File[]) {
      this.files = inputFiles
      this.$emit('input', this.files)
    },
    onCommit () {
      this.$emit('commit', this.files)
    },
  },
})
</script>
