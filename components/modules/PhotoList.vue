<template>
  <ul class="photo_list">
    <li v-for="item in value" :key="item.id" class="photo_list__item">
      <img :src="item.thumbnailUrl" :alt="item.name" class="photo_list__item__img" @click="onPhotoItemClick(item)">
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { PhotoList } from '~/types/api-gql-alias'
import { Photo } from '~/types/api-gql'

export default defineComponent({
  name: 'PhotoList',
  props: {
    value: {
      type: Array as PropType<PhotoList>,
      default: [] as PhotoList,
    },
  },
  methods: {
    onPhotoItemClick (el: { id: string }) {
      this.$router.push({ name: 'photos-id', params: { id: el.id } })
    },
  },
})
</script>

<style lang="scss" scoped>
.photo_list {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap:10px;

  &__item {
     flex: 1 1 auto;
     height: 300px;
     position: relative;

    &__img {
      width: 100%;
      height: 100%;
      vertical-align: middle;
      object-fit: contain;
      cursor: pointer;
    }
   }
}

</style>
