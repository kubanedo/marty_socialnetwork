<template>
  <div class="newpost__wrapper">
    <div class="newpost__profile-img-wrapper">
      <div class="profile-img" :style="{ backgroundImage: 'url(' + profileImg + ')' }"></div>
    </div>
    <div class="newpost__input">
      <input type="text" placeholder="Co se vám honí hlavou?">
    </div>
    <button>Zveřejnit</button>
  </div>  
</template>

<script>
export default {
  data() {
    return {
      profileImg: 'https://demo.hasthemes.com/adda-preview/adda/assets/images/profile/profile-small-1.jpg'
    }
  }

}
</script>

<style lang="scss" scoped>
@import "~/assets/variables.scss";
    div.newpost__wrapper, div.newpost__input {
      display: flex;
      width: 100%;
    }
    .newpost__profile-img-wrapper {
      margin-right: 10px;
    }
    input {
      width: 100%;
      padding: 10px;
      margin-right: 5px;
      border: 1px silver solid;
      background: silver;
      border-radius: 5px;      
    }
    button {
      background: $primary-color;
      padding: 10px;
      color: white;
      border-radius: 5px;
    }
</style>