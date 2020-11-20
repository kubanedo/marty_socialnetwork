<template>
    <div>
            <div class="editPost__header">
              <h2>Upravit příspěvek</h2>
              <UICloseBtn @click.native="closeWindow" />
            </div>
            <UIInput ref="addeditPost" v-model="editPost" :rows="3" :placeholder="(modalData.shareData) ? 'Něco k tomu napište...' : 'Co se vám honí hlavou?'" @keydown.enter.prevent.native="saveEditedPost()" />
            <div class="link__preview" v-if="!modalData.shareData && firstLinkData && firstLinkData.status=='found'">
               <LinkPreview :linkData="firstLinkData" :deletablePreview="true" @deleteLinkPreview="deleteLinkPreview"/>
            </div>
            <div class="editPost__privacy-setting">      
              Kdo může tento příspěvek vidět? <button @click="togglePrivacy"><i :class="'las la-' + privacySetting.icon"></i> {{ (privacySetting.value=='all' ? 'Všichni' : 'Přátelé')}}</button><br/>
            </div>
            <UIButton text="Uložit příspěvek" @click.native="saveEditedPost()" />
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
      editPost: '',
      links: '',
      firstLinkData: null,
      privacySetting: {
        icon: 'globe',
        value: 'all'
      }
    }
  },
  methods: {
    saveEditedPost() {
        let postData = {
            post_id: this.modalData.post_id,
            posted_by: "me", 
            post_text: this.editPost,
            privacy_settings: this.privacySetting.value
        };
        this.$store.commit('updatePost', postData);
        this.closeWindow();
     /* let editPostObj = {
                    "post_id": "me" + (Math.floor(Math.random() * 100000) + 1),
                    "posted_by": "me",
                    "published": new Date().getTime(),
                    "privacy_settings": this.privacySetting.value,
                    "post_text": this.editPost              
      }; 
      if(this.modalData.shareData) {        
        if(this.modalData.shareData.extra_content) {
          editPostObj.extra_content = this.modalData.shareData.extra_content;
          delete this.modalData.shareData.extra_content;
        }
        editPostObj.shared_post = this.modalData.shareData;
      }
      if(this.firstLinkData) {
        editPostObj.link = this.firstLinkData;
        delete editPostObj.link.status;
      }
      let vm = this; 
      setTimeout(() => { 
        vm.$store.commit('saveEditedPost', editPostObj);
      }, 1000);
      this.editPost = "";
      this.closeWindow();
      this.$toast.success(
        "Nový příspěvek publikován.",
        { icon: 'las la-check-circle' }
      ); */
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
    editPost(value) {
      this.links = this.getLinks(value);
    },
    links(value) {
      if(value && value[0]!==undefined) {
        this.getLinkInfo(value[0]);
      }
    }
  },
  mounted() {
    let postData = this.$store.getters.getMyPost(this.modalData.post_id);
    this.editPost = postData.post_text;
    this.privacySetting.value = postData.privacy_settings;
    if(postData.privacy_settings=="friends") {
      this.privacySetting.icon = "user-friends";
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/variables.scss";
    div.editPost__wrapper, div.editPost__input {
      display: flex;
      width: 100%;
    }
    .editPost__profile-img-wrapper {
      margin-right: 10px;
    }
    .editPost__fakeinput, textarea {
      width: 100%;
      padding: 10px;
      margin-right: 5px;
      background: $grey-color;
      border-radius: 20px;      
    }
    .editPost__fakeinput {
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
    .editPost__privacy-setting {
      padding: 10px 0;
    }
    .editPost__header {
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