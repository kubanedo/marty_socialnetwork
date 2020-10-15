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
        <div class="switch-photo switch-photo--previous" v-if="photoInLightbox.index > 0" @click="previousPhoto"><div><i class="las la-angle-double-left"></i></div></div>
        <div>            
            <div class="post__gallery-content">
                <UiCloseBtn @click.native="closeLightbox()"/><br/>
                <img :src="photoInLightbox.url"><br/>
            </div>
        </div>
        <div class="switch-photo swich-photo--next" v-if="photoInLightbox.index <= photosData.length - 2" @click="nextPhoto"><div><i class="las la-angle-double-right"></i></div></div>    
    </div>    
</div>
</template>

<script>
import UICloseBtn from "~/components/ui/UICloseBtn";

export default {
    components: {
        UICloseBtn
    },
    props: {
        photosData: Array
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
      text-align: center;
      position: relative;  
      padding: 20px;
      margin: 0 auto;
      width: 100%;
      max-width: 80%;

      img {
          width: 95%;
          max-width: 1200px;
          height: auto;
      }
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
    }
}
.swich-photo--next {
    right: 0;
}
.swich-photo--previous {
    left: 0;
}
  
</style>