<template>
  <v-file-input
    :label="label"
    :multiple="multiple"
    :value="files"
    :accept="accepts.join(',')"
    @change="onChange"
  >
    <template #append-outer>
      <v-btn @click="onCommit">
        アップロード
      </v-btn>
    </template>
  </v-file-input>
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
