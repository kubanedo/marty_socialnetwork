<template>
    <div class="card">
        <h2>Fotky</h2>
        <div class="grid">
            <ProfileSidebarPhoto
            v-for="(photo, index) in profileData.photos" :key="index" 
            :imageURL="`https://jakubnedorost.cz/marty/images/profiles/${$route.params.id}/photos/${photo}.jpg`"
            @click.native="openPhotoLightbox(index)" />
        </div>
    </div>   
</template>

<script>
import ProfileSidebarPhoto from '~/components/profile/ProfileSidebarPhoto'
export default {
    props: {
        profileData: {
            type: Object
        }
    },
    methods: {
        openPhotoLightbox(enterPhotoId) {
            this.$store.state.modalWindow = {
                modalName: 'PhotoLightbox',
                lightboxData: {
                    type: 'profile_photos',
                    profile_type: 'page',
                    profile_id: this.$route.params.id,
                    profile_name: this.profileData.name,
                    photos: this.profileData.photos,
                    enter_photo_id: enterPhotoId
                }
            };        
        }
    },
    head () {
            return {
                title: "Fotky stránky " + ((this.profileData.name) ? (this.profileData.name) : this.$route.params.id)
            }
    }    
}
</script>

<style lang="scss" scoped>
h2 {
    margin-bottom: 10px;
}
 .grid {
     display: grid;
     grid-template-columns: repeat(3, 1fr);
     gap: 10px;
 }
</style>