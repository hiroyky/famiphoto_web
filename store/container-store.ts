import { defineStore } from 'pinia'

interface State {
  isDisplayNavigationDrawer: boolean
}

export const useContainerStore = defineStore('container', {
  state: (): State => ({
    isDisplayNavigationDrawer: false,
  }),
})
