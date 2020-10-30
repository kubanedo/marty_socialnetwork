<template>
  <div class="profile__photo-preview" :style="`background-image: url('${imageURL}')`">
      <div class="overlay"></div>
  </div>    
</template>

<script>
export default {
    props: {
        imageURL: {
            type: String,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~/assets/variables.scss";
.profile__photo-preview {
    cursor: pointer;
    position: relative;
    background-size: cover;
    background-position: center center;
    background-color: #f1f1f1;
    border: 1px solid #ececec;
    border-radius: 5px;

    &:after {
        content: "";
        display: block;
        padding-bottom: 100%;
    }

    &:hover .overlay {
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.1);
    }
}
</style>