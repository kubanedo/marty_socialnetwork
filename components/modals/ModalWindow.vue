<template>
    <div>
      <PhotoLightbox v-if="modalData.modalName=='PhotoLightbox'" :modalData="modalData" @closeWindow="closeWindow"/>
      <div v-else class="overlay" @click.self.prevent="closeWindow"> 
          <div class="card overlay-content" :style="`max-width: ${modalData.modalWidth}px;`">
              <component :is="modalData.modalName" :modalData="modalData" @closeWindow="closeWindow" />
          </div>
      </div>
    </div>       
</template>

<script>
import CreatePost from '~/components/modals/CreatePost';
import ReportPost from '~/components/modals/ReportPost';
import EditPost from '~/components/modals/EditPost';
import Quiz from '~/components/modals/Quiz';
import FriendsList from '~/components/modals/FriendsList';
import ContactList from '~/components/modals/ContactList';
import PhotoLightbox from '~/components/modals/PhotoLightbox';
import GameSaved from '~/components/modals/GameSaved';
import Welcome from '~/components/modals/Welcome';
export default {
  components: {
      CreatePost,
      ReportPost,
      EditPost,
      Quiz,
      GameSaved,
      Welcome,
      FriendsList,
      ContactList
  },  
  props: {
      modalData: {
          type: Object,
          required: true
      }
  },
  methods: {
    closeWindow() {
        this.$store.state.modalWindow = null;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/variables.scss";
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
      background-color: rgba(0,0,0,0.4);
      z-index: 12;      
    }
    .overlay-content {
      background: white;
      padding: 20px;
      margin: 0 auto;
      width: 95%;
      max-width: 650px;
      box-shadow: 0px 1px 15px 5px rgba(51, 51, 51, 0.2);
    }
</style>