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
        <div class="post__gallery-content">
            <button @click="closeLightbox()"><i class="las la-times"></i></button><br/>
            <img :src="photoInLightbox.url"><br/>
            <button v-if="photoInLightbox.index > 0" @click="previousPhoto">Předchozí</button>
            <button v-if="photoInLightbox.index <= photosData.length - 2" @click="nextPhoto">Další</button>
        </div>    
    </div>    
</div>
</template>

<script>
export default {
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
    .post__gallery-content {
      text-align: center;
      position: relative;  
      padding: 20px;
      margin: 0 auto;
      width: 100%;
      max-width: 80%;
    }    
</style>