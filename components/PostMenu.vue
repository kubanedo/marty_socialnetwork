<template>
  <div class="post__menu">
      <button @click="showMenu=!showMenu"><i class="las la-ellipsis-v"></i></button>
      <div v-if="showMenu">
          menu
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            showMenu: false
        }
    }
}
</script>

<style>

</style>