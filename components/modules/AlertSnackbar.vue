<template>
  <v-snackbar
    outlined
    right
    top
    app
    :value="isDisplay"
    :color="color"
    @input="onDisplayChange"
  >
    <span>{{ body }}</span>
    <v-progress-linear absolute bottom :value="progressPercentage" :color="color" />
  </v-snackbar>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import useAlertStore from '~/store/alert-store'

export default defineComponent({
  name: 'AlertSnackbar',
  props: {
    timeout: {
      type: Number,
      default: 5000,
    },
  },
  setup () {
    const alertStore = useAlertStore()
    return {
      alertStore,
    }
  },
  data () {
    return {
      currentTime: 0,
      color: 'success',
      body: '',
      isDisplay: false,
    }
  },
  computed: {
    progressPercentage (): number {
      if (this.timeout <= 0) {
        return 0
      }
      return Math.floor(100 * (this.currentTime / this.timeout))
    },
    head () {
      if (this.alertStore.alertQueue.length === 0) {
        return undefined
      }
      return this.alertStore.alertQueue[0]
    },
  },
  watch: {
    head (v: any) {
      if (!this.isDisplay && v) {
        setTimeout(() => {
          this.isDisplay = true
          this.color = this.calcColor()
          this.body = this.head ? this.head.body : ''
          this.syncProgressbar()
        }, 300)
      }
    },
  },
  created () {
  },
  methods: {
    onDisplayChange (v : boolean) {
      if (!v) {
        this.isDisplay = false
        this.alertStore.deque()
        this.currentTime = 0
      }
    },
    calcColor () {
      if (this.head === undefined) {
        return 'message'
      }
      switch (this.head.type) {
        case 'message':
          return 'success'
        case 'warn':
          return 'warning'
        case 'error':
        case 'fatal':
          return 'error'
      }
      return 'error'
    },
    syncProgressbar () {
      setTimeout(() => {
        this.currentTime += 110

        if (this.isDisplay) {
          this.syncProgressbar()
        }
      }, 100)
    },
  },
})
</script>
