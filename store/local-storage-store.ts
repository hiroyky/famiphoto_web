import { defineStore } from 'pinia'

interface State {
  currentGroup: { id: string, displayId: string }
}

export const useLocalStorageStore = defineStore('local-storage', {
  persist: {
    enabled: true,
    strategies: [
      { storage: localStorage },
    ],
  },
  state: (): State => {
    return {
      currentGroup: { id: '', displayId: '' },
    }
  },
  actions: {
    setCurrentGroup (id: string, displayId: string) {
      this.currentGroup = { id, displayId }
    },
  },
})
