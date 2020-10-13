<template>
    <div class="overlay" @click.self.prevent="closeWindow"> 
        <div class="card overlay-content">
            <h2>Vytvořte příspěvek</h2>
            <button @click="closeWindow"><i class="las la-times"></i></button>
            <UIInput ref="addNewPost" v-model="newPost" placeholder="Co se vám honí hlavou?" @keydown.enter.prevent.native="postNewPost()" />
            Kdo může tento příspěvek vidět? <button @click="togglePrivacy"><i :class="'las la-' + privacySetting.icon"></i> {{ (privacySetting.value=='all' ? 'Všichni' : 'Přátelé')}}</button><br/>
            <UIButton text="Zveřejnit" @click.native="postNewPost()" />
        </div>
    </div>    
</template>

<script>
import UIButton from "~/components/ui/UIButton";
import UIInput from '~/components/ui/UIInput';
import focusInput from '~/mixins/focusInput.js'

export default {
  mixins: [focusInput],  
  components: {
    UIButton,
    UIInput
  },
  data() {
    return {
      newPost: '',
      privacySetting: {
        icon: 'globe',
        value: 'all'
      }
    }
  },
  methods: {
    postNewPost() {
      let newPostObj = {
                    "post_id": "me" + (Math.floor(Math.random() * 100000) + 1),
                    "posted_by": "me",
                    "published": new Date().getTime(),
                    "privacy_settings": this.privacySetting.value,
                    "post_text": this.newPost              
      }; 
      let vm = this; 
      setTimeout(() => { 
        vm.$store.commit('postNewPost', newPostObj);
      }, 1000);
      this.newPost = "";
      this.closeWindow();
    }, 
    closeWindow() {
        this.$emit('windowClosed');
    },  
    togglePrivacy() {
      if(this.privacySetting.value=='all') {
        this.privacySetting = {
          icon: 'user-friends',
          value: 'friends'
        }
      } else {
        this.privacySetting = {
          icon: 'globe',
          value: 'all'
        }        
      }
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