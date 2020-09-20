<template>
  <div class="post__menu">
      <button @click="showMenu=!showMenu"><i class="las la-ellipsis-v"></i></button>
      <ul v-if="showMenu">
          <li><i class="las la-bookmark"></i> Uložit</li>
          <li><i class="las la-exclamation-triangle"></i> Nahlásit příspěvek</li>                    
      </ul>
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

<style scoped lang="scss">
@import "~/assets/variables.scss";
.post__menu {
    position: relative;
}
ul {
    min-width: 150px;
    position: absolute;
    font-size: 14px;
    bottom: 0;
    right: 0;
    z-index: 10;
    transform: translateY(100%);
    background: white;
    padding: 8px 14px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);

    li {
        display: block;
        list-style: none;
        white-space: nowrap;
        padding: 5px 0;

        &:hover {
            cursor: pointer;
            color: $primary-color;
        }
    }
}
</style>