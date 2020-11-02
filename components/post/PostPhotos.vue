<template>
<div class="post__photos--wrapper">
    <div :class="'post__photos post__photos--' + (photosData.length > 1 ? 'more' : 1)">
        <div v-for="(photo, index) in photosData.slice(0, 2)" :key="index"
        class="post__photo" 
        :style="{ backgroundImage: 'url(' + photo + ')' }"
        @click="openPhotoLightbox(index)"></div>
        <div class="post__photo-count" v-if="photosData.length > 2" @click="openPhotoLightbox(2)"><div>+ {{photosData.length - 2}}</div></div>
    </div>
</div>
</template>

<script>

export default {
    props: {
        photosData: Array,
        postData: Object
    },
    methods: {
        openPhotoLightbox(enterPhotoId) {
            this.$store.state.modalWindow = {
                modalName: 'PhotoLightbox',
                lightboxData: {
                    type: 'post_photos',
                    photos: this.photosData,
                    enter_photo_id: enterPhotoId,
                    post_data: this.postData
                }
            };        
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
</style>