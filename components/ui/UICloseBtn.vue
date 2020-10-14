<template>
  <button><i class="las la-times"></i></button>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import "~/assets/variables.scss";
button {
    background: $input-color;
    width: 30px;
    height: 30px;
    border-radius: 50%;

    &:hover {
        background: lighten($input-color, 5);
    }
    &:active {
        transform: scale(0.97);
    }    
}
</style>