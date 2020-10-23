<template>
<div class="post__photos--wrapper">
    <div :class="'post__photos post__photos--' + (photosData.length > 1 ? 'more' : 1)">
        <div v-for="(photo, index) in photosData.slice(0, 2)" :key="index"
        class="post__photo" 
        :style="{ backgroundImage: 'url(' + photo + ')' }"
        @click="openLightbox(photo, index)"></div>
        <div class="post__photo-count" v-if="photosData.length > 2" @click="openLightbox(photosData[2], 2)"><div>+ {{photosData.length - 2}}</div></div>
    </div>
    <div v-if="showLightbox==true" class="post__gallery-overlay" @click.self.prevent="closeLightbox()">
        <div class="switch-photo switch-photo--previous" v-if="photoInLightbox.index > 0" @click="previousPhoto"><div class="switch-photo-btn"><i class="las la-angle-double-left"></i></div></div>
        <div>            
            <div class="post__gallery-content">
                <div class="post__gallery-inner" style="position: relative;">
                    <UiCloseBtn @click.native="closeLightbox()" style="position: absolute; right: -10px; top: -10px;"/>
                    <img :src="photoInLightbox.url"><br/>
                    <div class="post__gallery-post">
                        <div class="post__gallery-post-author">
                            <nuxt-link :to="'/profile/'+postData.posted_by"><UIProfileImg :userID="postData.posted_by" style="margin-right: 10px;"/></nuxt-link>
                            <div><nuxt-link :to="'/profile/'+postData.posted_by">{{postData.posted_by}}</nuxt-link><br/><small><TimeAgo :time="postData.published"/></small></div>
                        </div>    
                        <div v-html="postData.post_text" style="margin-left: 20px;"></div>                    
                    </div>
                </div>

            </div>
        </div>
        <div class="switch-photo switch-photo--next" v-if="photoInLightbox.index <= photosData.length - 2" @click="nextPhoto"><div class="switch-photo-btn"><i class="las la-angle-double-right"></i></div></div>    
    </div>    
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
        photosData: Array,
        postData: Object
    },
    data() {
        return {
            showLightbox: false,
            photoInLightbox: {},
        }
    },
    methods: {
       openLightbox(photoUrl, indexOfPhoto) {
           this.photoInLightbox = { 
               url: photoUrl, 
               index: indexOfPhoto
            };
           this.showLightbox = true;
       },
       closeLightbox() {
           this.showLightbox = false;
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
    .post__gallery-post {
        display: flex;
        color: white;
        background: rgba(0,0,0,0.4);
        margin: 0 auto;
        padding: 10px 20px;
    }
    .post__gallery-overlay {
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
    .post__gallery-content {
      position: relative;  
      padding: 20px;
      margin: 0 auto;
      width: 100%;
      max-width: 80%;

      img {
          width: 100%;
          height: auto;
      }
    }  
    .post__gallery-inner {
        display: block;
        width: 95%;
        max-width: 1200px; 
        margin: 0 auto;        
    }
    .post__gallery-post-author {
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
</style>