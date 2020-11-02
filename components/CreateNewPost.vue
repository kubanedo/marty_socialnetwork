<template>
  <div class="newpost__wrapper">
    <div class="newpost__profile-img-wrapper">
      <nuxt-link to="/profile/me"><UIProfileImg userID="me" imgBorderColor="#f1f1f1"/></nuxt-link>
    </div>
    <div class="newpost__input">
      <div class="newpost__fakeinput" @click="openCreatePostInput">Co se vám honí hlavou?</div>
    </div>

  </div>  
</template>

<script>
import UIProfileImg from '~/components/ui/UIProfileImg';

export default {
  components: {
    UIProfileImg
  },
  data() {
    return {
      showCreatePostInput: false
    }
  },
  methods: {
    openCreatePostInput() {
      this.$store.state.modalWindow = {
        modalName: 'CreatePost'
      };
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
</style>