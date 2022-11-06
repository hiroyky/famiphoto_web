<template>
  <ul class="photo_list">
    <li class="photo_list__item">
      <img src="/sample1.jpg" class="photo_list__item__img">
    </li>
    <li class="photo_list__item">
      <img src="/sample1.jpg" class="photo_list__item__img">
    </li>
    <li class="photo_list__item">
      <img src="/sample2.jpg" class="photo_list__item__img">
    </li>
    <li class="photo_list__item">
      <img src="/sample1.jpg" class="photo_list__item__img">
    </li>
    <li class="photo_list__item">
      <img src="/sample2.jpg" class="photo_list__item__img">
    </li>
    <li class="photo_list__item">
      <img src="/sample1.jpg" class="photo_list__item__img">
    </li>
    <li class="photo_list__item">
      <img src="/sample1.jpg" class="photo_list__item__img">
    </li>
    <li class="photo_list__item">
      <img src="/sample1.jpg" class="photo_list__item__img">
    </li>
  </ul>
</template>

<script lang="ts">
export default {
  name: 'PhotoList',
}
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
    }
   }
}

</style>
