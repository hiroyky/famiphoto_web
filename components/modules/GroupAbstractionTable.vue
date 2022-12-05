<template>
  <v-simple-table>
    <tbody>
      <tr>
        <td>
          グループID
        </td>
        <td>
          {{ value.groupId }}
        </td>
      </tr>
      <tr>
        <td>
          グループ名
        </td>
        <td>
          {{ value.name }}
        </td>
      </tr>
    </tbody>
  </v-simple-table>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    value: {
      type: Object as PropType<{ id: string, groupId: string, name: string }>,
      required: true,
    },
  },
})
</script>
