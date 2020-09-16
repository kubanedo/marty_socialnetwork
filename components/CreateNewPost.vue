<template>
  <div class="newpost__wrapper">
    <div class="newpost__profile-img-wrapper">
      <div class="profile-img" :style="{ backgroundImage: 'url(' + profileImg + ')' }"></div>
    </div>
    <div class="newpost__input">
      <div class="newpost__fakeinput" @click="showCreatePostInput = true">Co se vám honí hlavou?</div>
    </div>

    <div v-if="showCreatePostInput" class="overlay" @click.self.prevent="showCreatePostInput = false"> 
       <div class="card overlay-content">
         <h2>Vytvořte příspěvek</h2>
         <button @click="showCreatePostInput = false"><i class="las la-times"></i></button>
         <textarea></textarea>
         <UIButton text="Zveřejnit"/>
       </div>
    </div>
  </div>  
</template>

<script>
import UIButton from "~/components/ui/UIButton";
export default {
  components: {
    UIButton
  },
  data() {
    return {
      profileImg: 'https://demo.hasthemes.com/adda-preview/adda/assets/images/profile/profile-small-1.jpg',
      showCreatePostInput: false
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
    .newpost__fakeinput, textarea {
      width: 100%;
      padding: 10px;
      margin-right: 5px;
      background: $grey-color;
      border-radius: 20px;      
    }
    .newpost__fakeinput {
      cursor: pointer;
      color: silver;
      padding-top: 12px;
      padding-left: 20px;
    }
    .overlay {
      display: flex;
      justify-content: center;
      flex-direction: column;
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0,0,0,0.5);
      z-index: 12;      
    }
    .overlay-content {
      background: white;
      padding: 20px;
      margin: 0 auto;
      width: 100%;
      max-width: 50%;
    }
</style>