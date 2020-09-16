<template>
  <button :class="type">{{text}}</button>
</template>

<script>
export default {
    props: {
      text: String,
      type: {
          type: String,
          default: 'normal'
      }  
    }
}
</script>

<style lang="scss" scoped>
@import "~/assets/variables.scss";
button {
    background: $primary-color;
    padding: 10px;
    color: white;
    border-radius: 20px;
}
</style>