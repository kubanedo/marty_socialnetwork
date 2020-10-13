<template>
    <div class="overlay" @click.self.prevent="closeWindow"> 
        <div class="card overlay-content">
            <component :is="modalData.modalName" :modalData="modalData" @closeWindow="closeWindow" />
        </div>
    </div>    
</template>

<script>
import CreatePost from '~/components/modals/CreatePost';
import ReportPost from '~/components/modals/ReportPost';
export default {
  components: {
      CreatePost,
      ReportPost
  },  
  props: {
      modalData: {
          type: String,
          required: true
      }
  },
  data() {
    return {
        componentName: ''
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