<template>
  <v-data-table
    :hide-default-footer="hideFooter"
    :headers="headers"
    :items="value"
    :page="page"
    :server-items-length="totalCount"
    :items-per-page="itemsPerPageLength"
    :loading="loading"
    :footer-props="{'items-per-page-options': [itemsPerPageLength]}"
    item-key="id"
    @pagination="onPagination"
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'GroupMemberTable',
  props: {
    value: {
      type: Array as PropType<Array<{ id: string, userId: string, name: string }>>,
      default: () => [],
    },
    totalCount: {
      type: Number,
      default: 0,
    },
    page: {
      type: Number,
      default: 1,
    },
    itemsPerPageLength: {
      type: Number,
      default: 0,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      headers: [
        { text: 'ユーザID', value: 'userId', sortable: false },
        { text: '名前', value: 'name', sortable: false },
      ],
    }
  },
  computed: {
    hideFooter (): boolean {
      return this.paginationLength === 1
    },
  },
  methods: {
    onPagination (n: any) {
      this.$emit('pagination', n)
    },
  },
})
</script>
