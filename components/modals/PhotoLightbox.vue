<template>
    <div class="gallery__overlay" @click.self.prevent="closeWindow()">
        <div class="switch-photo switch-photo--previous" v-if="photoInLightbox.index > 0" @click="previousPhoto"><div class="switch-photo-btn"><i class="las la-angle-double-left"></i></div></div>
        <div>            
            <div class="gallery__content">
                <div class="gallery__inner" style="position: relative;">
                    <UiCloseBtn @click.native="closeWindow()" style="position: absolute; right: -10px; top: -10px;"/>
                    <img :src="photoInLightbox.url">

                    <div v-if="modalData.lightboxData.type=='post_photos'" class="gallery__post">
                        <div class="gallery__post-author">
                            <nuxt-link :to="'/' + profileSlug + '/'+modalData.lightboxData.post_data.posted_by"><UIProfileImg @click.native="closeWindow()" :userID="modalData.lightboxData.post_data.posted_by" style="margin-right: 10px;"/></nuxt-link>
                            <div><nuxt-link :to="'/' + profileSlug + '/'+modalData.lightboxData.post_data.posted_by" class="underline-hover"><span @click="closeWindow()">{{modalData.lightboxData.post_data.posted_by}}</span></nuxt-link><br/><small><TimeAgo :time="modalData.lightboxData.post_data.published"/></small></div>
                        </div>    
                        <div v-html="modalData.lightboxData.post_data.post_text" style="margin-left: 20px;"></div>                    
                    </div>
                    <div v-else class="gallery__post">
                        <span>Fotky uživatele <nuxt-link :to="'/' + profileSlug + '/'+modalData.lightboxData.profile_id" class="underline-hover"><span @click="closeWindow()">{{modalData.lightboxData.profile_name}}</span></nuxt-link></span>
                    </div>

                </div>

            </div>
        </div>
        <div class="switch-photo switch-photo--next" v-if="photoInLightbox.index <= photosData.length - 2" @click="nextPhoto"><div class="switch-photo-btn"><i class="las la-angle-double-right"></i></div></div>    
    </div> 
</template>

<script>
import UICloseBtn from "~/components/ui/UICloseBtn";
import TimeAgo from "~/components/TimeAgo";
import UIProfileImg from '~/components/ui/UIProfileImg';

export default {
    components: {
        UICloseBtn,
        TimeAgo,
        UIProfileImg
    },
    props: {
        modalData: {
            type: Object
        }
    },
    data() {
        return {
            photoInLightbox: {
                url: this.getProfilePhotoURL(this.modalData.lightboxData.profile_id),
                index: this.modalData.lightboxData.enter_photo_id
            },
            photosData: [],
            profileSlug: (this.modalData.lightboxData.profile_type && this.modalData.lightboxData.profile_type=='page') ? 'page' : 'profile'
        }
    },
    methods: {
        getProfilePhotoURL(profile_id, photo_id) {
            return `https://jakubnedorost.cz/marty/images/profiles/${profile_id}/photos/${photo_id}.jpg`
        }, 
        closeWindow() {
            this.$emit('closeWindow');
        }, 
       nextPhoto() {
           if(this.photoInLightbox.index <= this.photosData.length - 2) {
                this.photoInLightbox.index++;
                this.photoInLightbox.url = this.photosData[this.photoInLightbox.index];
           }
       },
       previousPhoto() {
           if(this.photoInLightbox.index > 0) {
                this.photoInLightbox.index--;
                this.photoInLightbox.url = this.photosData[this.photoInLightbox.index];
           }           
       }
    },
    mounted() {
       if(this.modalData.lightboxData.type=="profile_photos") { 
            let profileId = this.modalData.lightboxData.profile_id;
            let enterPhotoId = this.modalData.lightboxData.enter_photo_id;
            this.modalData.lightboxData.photos.forEach(item => {
                this.photosData.push(this.getProfilePhotoURL(profileId, item));          
            });
            this.photoInLightbox = {
                url: this.photosData[enterPhotoId],
                index: enterPhotoId
            }
       } else if (this.modalData.lightboxData.type=="post_photos") {
            this.photosData = this.modalData.lightboxData.photos;
            let enterPhotoId = this.modalData.lightboxData.enter_photo_id;
            this.photoInLightbox = {
                url: this.photosData[enterPhotoId],
                index: enterPhotoId
            }           
       }
    }
}
</script>

<style lang="scss" scoped>
    .post__photos {
        position: relative;
        display: flex;
        justify-content: space-between;
    }
    .post__photo {
        cursor: pointer;
        width: 100%;
        padding-bottom: 56%;
        background-size: cover;
        background-position: center;
    }
    .post__photos--more .post__photo {
        width: calc(50% - 5px);
    }
    .post__photo-count {
        cursor: pointer;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        position: absolute;
        right: 0;
        bottom: 0;
        width: 70px;
        height: 70px;
        color: white;
        background: rgba(44,44,44,0.5);
        font-size: 22px;
    }
    .gallery__post {
        display: flex;
        color: white;
        background: rgba(0,0,0,0.4);
        margin: 0 auto;
        padding: 10px 20px;
    }
    .gallery__overlay {
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0,0,0,0.9);
      z-index: 12;      
    }
    .gallery__content {
      position: relative;  
      padding: 20px;
      margin: 0 auto;
      width: 100%;
      max-width: 80%;

      img {
          display: block;
          margin: 0 auto;
          width: auto;
          max-height: 80vh;
          height: auto;
      }
    }  
    .gallery__inner {
        display: block;
        width: 95%;
        max-width: 1000px; 
        margin: 0 auto;        
    }
    .gallery__post-author {
        display: flex;
    }
.switch-photo {
    position: absolute;
    cursor: pointer;
    color: white;
    width: 85px;
    top: 0;
    bottom: 0;
    background: rgba(0,0,0,0.2);
    &:hover {
    background: rgba(0,0,0,0.4);
    width: 75px;
    }
}
.switch-photo--next {
    right: 0; 
    &:hover .switch-photo-btn {
        transform: translateX(10px);
    } 
}
.switch-photo--previous {
    left: 0;  
    &:hover .switch-photo-btn {
        transform: translateX(-10px);
    } 
}
.switch-photo-btn {
    cursor: pointer;
    position: absolute;
    top: 50%;
    width: 70px;
    height: 70px;
    background: black;
    border-radius: 50%;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 25px;
}
.switch-photo--next .switch-photo-btn {
    right: 20px;
    
}
.switch-photo--previous .switch-photo-btn {
    left: 20px;
} 
.underline-hover {
    color: white;
} 
</style>