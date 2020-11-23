<template>
  <div>
      <div class="main-wrapper">
          <div class="profile-header">
            <PageHeader v-if="dataLoaded" :profileData="{profile_id: $route.params.id, ...profileData}" :is_certified="profileData.is_certified"/>
            <LoadingProfileHeader v-else />
          </div>
          <div class="container grid">
            <aside class="left-sidebar">
              <div class="sidebar-container" v-if="dataLoaded">
                <div class="card">
                    <h3>Úvodní informace</h3>
                    <div v-if="likeCount"><i class="las la-heart"></i> {{likeCount}} lidem se to líbí<span v-if="likedByFriendsCount > 0">, z toho <span class="underline-hover" @click="openLikedByList()">{{likedByFriendsCount}} přátelům</span></span></div>
                    <div v-if="profileData.about_info && profileData.about_info.info"><strong><i class="las la-info-circle"></i> Popis:</strong> {{ profileData.about_info.info }}</div>
                    <div v-if="profileData.about_info && profileData.about_info.url"><strong><i class="las la-globe"></i> Web: </strong> <a :href="'https://' + profileData.about_info.url" target="_blank">{{ profileData.about_info.url }}</a></div>
                    <div v-if="profileData.about_info && profileData.about_info.twitter"><strong><i class="lab la-twitter"></i> Twitter: </strong> <a :href="'https://twitter.com/' + profileData.about_info.twitter" target="_blank">{{ profileData.about_info.twitter }}</a></div>
                    <div v-if="profileData.about_info && profileData.about_info.facebook"><strong><i class="lab la-facebook"></i> Facebook: </strong> <a :href="'https://www.facebook.com/' + profileData.about_info.facebook" target="_blank">{{ profileData.about_info.facebook }}</a></div>
                    <div v-if="profileData.about_info && profileData.about_info.instagram"><strong><i class="lab la-instagram"></i> Instagram: </strong> <a :href="'https://www.instagram.com/' + profileData.about_info.instagram" target="_blank">{{ profileData.about_info.instagram }}</a></div>
                    <div v-if="profileData.about_info && profileData.about_info.youtube"><strong><i class="lab la-youtube"></i> Youtube: </strong> <a :href="'https://www.youtube.com/' + profileData.about_info.youtube" target="_blank">{{ profileData.about_info.youtube }}</a></div>
                    <div v-if="profileData.about_info && profileData.about_info.email"><strong><i class="las la-envelope"></i> Email: </strong> <a :href="'mailto:' + profileData.about_info.email">{{ profileData.about_info.email }}</a></div>                                        
                    <div v-if="profileData.category"><strong><i class="las la-folder-open"></i> Kategorie: </strong> {{ profileData.category }}</div>    
                </div> 
                <div class="card" v-if="Array.isArray(profileData.photos) && profileData.photos.length">
                  <h3>Fotky</h3>
                  <div class="sidebar__photos">
                    <ProfileSidebarPhoto 
                      v-for="(photo, index) in profileData.photos.slice(0,3)" :key="index" 
                      :imageURL="`https://jakubnedorost.cz/marty/images/profiles/${$route.params.id}/photos/${photo}.jpg`"
                      @click.native="openPhotoLightbox(index)" />
                  </div>
                  <nuxt-link v-if="profileData.photos.length > 3" :to="`/page/${$route.params.id}/photos`" tag="button" class="grey w100 mt-10">Všechny fotky</nuxt-link>
                </div>
              </div> 
              <div class="sidebar-container" v-else>
                <div class="card" v-for="(item, index) in 2" :key="index">
                  <UILoadingContent /> 
                </div>             
              </div>                             
            </aside>
            <div class="main-content">
              <nuxt-child :profileData="profileData" :friendsData="friendsData"/>            
            </div>
          </div>
      </div>
  </div>      
</template>

<script>
import axios from 'axios';
import PageHeader from '~/components/profile/PageHeader'
import LoadingProfileHeader from '~/components/profile/LoadingProfileHeader'
import ProfileSidebarPhoto from '~/components/profile/ProfileSidebarPhoto'
import UILoadingContent from '~/components/ui/UILoadingContent'
export default {
  components: {
    PageHeader,
    LoadingProfileHeader,
    ProfileSidebarPhoto,
    UILoadingContent
  },
  data() {
    return {
      dataLoaded: false,
      profileData: {},
    }
  },
  computed: {
      likedByMe() {
          return (this.$store.state.loggedUser.liked_pages) ? this.$store.state.loggedUser.liked_pages.includes(this.profileData.userId) : false;
      },
      likeCount() {
          let count = (this.profileData.liked_by && this.profileData.liked_by.known) ? this.profileData.liked_by.known.length : 0; 
              count += (this.profileData.liked_by && this.profileData.liked_by.others) ? this.profileData.liked_by.others : 0;  
              count += (this.likedByMe) ? 1 : 0;   
          return count;
      },
      likedByFriendsCount() {
          let likedByFriends = this.getLikedByFriendsList(this.profileData.liked_by.known);
          return likedByFriends.length;
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
    },    
    getProfileData() {
          axios.get(process.env.apiUrl + '/?type=pages&profile_id=' + this.$route.params.id)
            .then(response => {
              const data = response.data;
              if(data===null) {
                return this.$nuxt.error({ statusCode: 404, message: 'Fanouškovská stránka neexistuje' })
              } else {              
                this.profileData = {...data, userId: this.$route.params.id}
                this.dataLoaded = true
              }
            })
            .catch(error => console.log(error))
    }, 
    getLikedByFriendsList(likedByKnownArray) {
          let result = [];
          if(this.$store.state.loggedUser.friends && likedByKnownArray) {
              result = this.$store.state.loggedUser.friends.filter((item) => {
                  return likedByKnownArray.indexOf(item) > -1;
              });
          }
          return result;
    },
    openLikedByList() {
        this.$store.state.modalWindow = {
            modalName: 'FriendsList',
            modalWidth: 350,
            type: 'page',
            userName: this.profileData.name,
            friendsIds: this.getLikedByFriendsList(this.profileData.liked_by.known)
        };
    }        
  },
  mounted() {
      this.getProfileData(); 
  },
  head () {
        return {
            title: (this.profileData.name) ? (this.profileData.name) : this.$route.params.id
        }
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/variables.scss";
@import "~/assets/profile-page.scss";
</style>