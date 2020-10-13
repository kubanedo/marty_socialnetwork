<template>
    <div>
            <div class="newpost__header">
              <h2>{{(modalData.shareData) ? 'Sdílejte příspěvek' : 'Vytvořte příspěvek'}}</h2>
              <UICloseBtn @click.native="closeWindow" />
            </div>
            <UIInput ref="addNewPost" v-model="newPost" placeholder="Co se vám honí hlavou?" @keydown.enter.prevent.native="postNewPost()" />
            <div class="link__preview" v-if="!modalData.shareData && firstLinkData && firstLinkData.status=='found'">
               <LinkPreview :linkData="firstLinkData" :deletablePreview="true" @deleteLinkPreview="deleteLinkPreview"/>
            </div>
            <div class="shared__preview" v-if="modalData.shareData">
              <strong><small>Náhled sdíleného příspěvku:</small></strong>
              <PostSharedContent :sharedPost="modalData.shareData"/>
              <div class="shared__extra-content" v-if="modalData.shareData.extra_content">
                  <PostPhotos v-if="modalData.shareData.extra_content.type=='photo'" :photosData="modalData.shareData.extra_content.url"/> 
                  <PostVideo v-if="modalData.shareData.extra_content.type=='video'" :embedURL="modalData.shareData.extra_content.url"/>                   
              </div>     
            </div> 
            <div class="newpost__privacy-setting">      
              Kdo může tento příspěvek vidět? <button @click="togglePrivacy"><i :class="'las la-' + privacySetting.icon"></i> {{ (privacySetting.value=='all' ? 'Všichni' : 'Přátelé')}}</button><br/>
            </div>
            <UIButton text="Zveřejnit" @click.native="postNewPost()" />
    </div>    
</template>

<script>
import axios from 'axios'
import PostSharedContent from "~/components/post/PostSharedContent";
import UIButton from "~/components/ui/UIButton";
import UICloseBtn from "~/components/ui/UICloseBtn";
import UIInput from "~/components/ui/UIInput";
import LinkPreview from "~/components/post/LinkPreview";

import focusInput from '~/mixins/focusInput.js'
import clickableLinks from '~/mixins/clickableLinks.js'

export default {
  mixins: [focusInput, clickableLinks],  
  components: {
    UIButton,
    UICloseBtn,
    UIInput,
    PostSharedContent,
    LinkPreview
  },
  props: {
    modalData: {
      type: Object
    }
  },
  data() {
    return {
      newPost: '',
      links: '',
      firstLinkData: null,
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
      if(this.modalData.shareData) {        
        if(this.modalData.shareData.extra_content) {
          newPostObj.extra_content = this.modalData.shareData.extra_content;
          delete this.modalData.shareData.extra_content;
        }
        newPostObj.shared_post = this.modalData.shareData;
      }
      if(this.firstLinkData) {
        newPostObj.link = this.firstLinkData;
        delete newPostObj.link.status;
      }
      let vm = this; 
      setTimeout(() => { 
        vm.$store.commit('postNewPost', newPostObj);
      }, 1000);
      this.newPost = "";
      this.closeWindow();
    }, 
    closeWindow() {
        this.$emit('closeWindow');
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
    },
    getLinkInfo(link) {
      axios.get('https://jakubnedorost.cz/marty/scrape-links/?link=' + link)
        .then(response => {
            const data = response.data;
            this.firstLinkData = JSON.parse(data);
        })
        .catch(error => console.log(error))     
    },
    deleteLinkPreview() {
      this.firstLinkData = null;
    }
  },
  watch: {
    newPost(value) {
      this.links = this.getLinks(value);
    },
    links(value) {
      if(value && value[0]!==undefined) {
        this.getLinkInfo(value[0]);
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
    .shared__preview {
      border: 1px solid #F0F0F0;
      border-radius: 5px;
      padding: 10px;
      margin-top: 10px;
      width: 60%;
      margin: 0;
    }
    .newpost__privacy-setting {
      padding: 10px 0;
    }
    .newpost__header {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid $grey-color;
      padding-bottom: 10px;
      margin-bottom: 20px;
    }
    .link__preview {
      max-width: 400px;
    }
</style>