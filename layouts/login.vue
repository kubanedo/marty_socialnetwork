<template>
  <div class="body">
      <Nuxt />
  </div>    
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import "~/assets/variables.scss";
.body {
    background: radial-gradient(circle, $primary-color 0%, lighten($primary-color, 30) 100%);
    background-size: 400% 400%;
    animation: backroundAnimation 10s ease infinite;  
}
@keyframes backroundAnimation {
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
}
</style>