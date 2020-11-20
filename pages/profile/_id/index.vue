<template>
  <div>
      <div class="main-wrapper">
          <div class="profile-header">
            <ProfileHeader v-if="dataLoaded" :profileData="profileData" :profileId="$route.params.id"/>
            <LoadingProfileHeader v-else />
          </div>
          <div class="container grid">
            <aside class="left-sidebar">        
              <div class="sidebar-container" v-if="dataLoaded">
                <div class="card">
                    <h3>Úvodní informace</h3>
                    <div v-if="profileData.about_info && profileData.about_info.motto" class="mb-10"><i>"{{ profileData.about_info.motto}}"</i></div>
                    <div v-if="profileData.sex"><strong>Pohlaví: </strong>{{ (profileData.sex=="m") ? "muž" : "žena"}}</div>
                    <div v-if="profileData.about_info && profileData.about_info.day_of_birth"><strong><i class="las la-birthday-cake"></i> Narozeniny: </strong>{{ getBirthdayDate(profileData.about_info.day_of_birth) }}</div>
                    <div v-if="profileData.about_info && profileData.about_info.day_of_birth"><strong><i class="las la-portrait"></i> Věk: </strong>{{ getAge(profileData.about_info.day_of_birth) }} let</div>                    
                    <div v-if="profileData.about_info && profileData.about_info.current_town"><strong><i class="las la-city"></i> Žije ve městě: </strong>{{ profileData.about_info.current_town }}</div>
                    <div v-if="profileData.about_info && profileData.about_info.study"><strong><i class="las la-graduation-cap"></i> Studuje: </strong>{{ profileData.about_info.study }}</div>
                    <nuxt-link v-if="$route.params.id=='me'" to="/settings" tag="button" class="grey w100 mt-10"><i class="las la-user-edit"></i> Upravit informace</nuxt-link>                
                </div> 
                <div class="card" v-if="Array.isArray(profileData.photos) && profileData.photos.length">
                  <h3>Fotky</h3>
                  <div class="sidebar__photos">
                    <ProfileSidebarPhoto 
                      v-for="(photo, index) in profileData.photos.slice(0,3)" :key="index" 
                      :imageURL="`https://jakubnedorost.cz/marty/images/profiles/${$route.params.id}/photos/${photo}.jpg`"
                      @click.native="openPhotoLightbox(index)" />
                  </div>
                  <nuxt-link v-if="profileData.photos.length > 3" :to="`/profile/${$route.params.id}/photos`" tag="button" class="grey w100 mt-10">Všechny fotky</nuxt-link>
                </div>
                <div class="card" v-if="friendsLoaded && userFriends.length > 0">
                  <h3>Přátelé<small v-if="commonFriendsCount > 0"> (<nuxt-link :to="`/profile/${$route.params.id}/friends/mutual`" class="underline-hover">{{commonFriendsCount}} společných</nuxt-link>)</small></h3>
                  <div class="sidebar__friends">
                    <ProfileSidebarFriend v-for="friend in friendsData.slice(0,3)" :key="friend.profile_id" :friendData="friend" :commonFriends="getCommonFriendsList(friend.friends)"/>
                  </div>                  
                  <nuxt-link :to="`/profile/${$route.params.id}/friends`" tag="button" class="grey w100 mt-10">Všichni přátelé</nuxt-link>
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
import ProfileHeader from '~/components/profile/ProfileHeader'
import LoadingProfileHeader from '~/components/profile/LoadingProfileHeader'
import ProfileSidebarPhoto from '~/components/profile/ProfileSidebarPhoto'
import ProfileSidebarFriend from '~/components/profile/ProfileSidebarFriend'
import UILoadingContent from '~/components/ui/UILoadingContent'
export default {
  components: {
    ProfileHeader,
    LoadingProfileHeader,
    ProfileSidebarPhoto,
    UILoadingContent
  },
  data() {
    return {
      dataLoaded: false,
      friendsLoaded: false,
      profileData: {},
      friendsData: []
    }
  },
  computed: {
      commonFriendsCount() {
          let commonFriends = this.getCommonFriendsList(this.profileData.friends);
          return commonFriends.length;
      },
      friendWithMe() {
          return (this.$store.state.loggedUser.friends) ? this.$store.state.loggedUser.friends.includes(this.profileData.userId) : false;
      },
      myProfileData() {
        return this.$store.state.loggedUser
      },
      userFriends() {
        if(this.$route.params.id=="me") {
          return this.$store.state.loggedUser.friends;
        } else {
          return this.profileData.friends;
        }          
      }           
  },
  methods: {
    openPhotoLightbox(enterPhotoId) {
        this.$store.state.modalWindow = {
            modalName: 'PhotoLightbox',
            lightboxData: {
                type: 'profile_photos',
                profile_id: this.$route.params.id,
                profile_name: this.profileData.first_name + ' ' + this.profileData.last_name,
                photos: this.profileData.photos,
                enter_photo_id: enterPhotoId
            }
        };        
    },    
    getBirthdayDate(dayOfBirth) {
      dayOfBirth = new Date(dayOfBirth);
      return (dayOfBirth.getDate()) + '. ' + (dayOfBirth.getMonth() + 1) + '.';  
    },
    getAge(dayOfBirth) {
      dayOfBirth = new Date(dayOfBirth);
      let ageDifMs = Date.now() - dayOfBirth.getTime();
      let ageDate = new Date(ageDifMs);
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    },
    getCommonFriendsList(friendsArray) {
          let result = [];
          if(this.$route.params.id!=="me") {
            if(this.$store.state.loggedUser.friends && friendsArray) {
                result = this.$store.state.loggedUser.friends.filter((item) => {
                    return friendsArray.indexOf(item) > -1;
                });
            }
          }
          return result;
    },
    getProfileData() {
        if(this.$route.params.id=="me") {
          this.profileData = {
            ...this.myProfileData
          }
          this.getFriendsData();
          this.dataLoaded = true
        } else {  
          axios.get('https://jakubnedorost.cz/marty/api/?type=profiles&profile_id=' + this.$route.params.id)
            .then(response => {
              const data = response.data;
              if(data===null) {
                return this.$nuxt.error({ statusCode: 404, message: 'Profil neexistuje' })
              } else {
                this.profileData = {...data, userId: this.$route.params.id}
                this.dataLoaded = true
              }
            })
            .catch(error => console.log(error))
            .finally(() => {
              this.getFriendsData();
            })
        } 
    },
    getFriendsData() {
        let friends = this.userFriends; 
        
        if(Array.isArray(friends) && friends.length) {   
          axios.get('https://jakubnedorost.cz/marty/api/?type=profiles&profile_ids=' + friends.join())
            .then(response => {
              this.friendsData = [...response.data];
              this.friendsLoaded = true;
            })
            .catch(error => console.log(error))
            .finally(() => {
              if(this.friendWithMe) {
                this.getMyData()
              }
            })
        } else {
          this.friendsData = [];
          this.friendsLoaded = true;         
        }         
    },
    getMyData(addOrRemove = 'add') {
      /*pokud se staneme se přáteli s jiným profilem, zobrazíme se mezi jeho přáteli */
      if(addOrRemove=='remove') {
        this.friendsData = this.friendsData.filter((item) => item.profile_id!=='me')
      } else {
        const {first_name, last_name} = this.$store.state.loggedUser;
        const myData = {
          first_name,
          last_name,
          profile_id: 'me'
        }
        this.friendsData.push(myData);
      }  
    }  
  },
  watch: {
    friendWithMe(value) {
      if(value) {
        this.getMyData();
      } else {
        this.getMyData('remove');
      }
    },
    myProfileData() {
      if(this.$route.params.id=="me") {
        this.getProfileData();
      }
    },
    userFriends() {
      this.getProfileData();
    }
  },
  mounted() {
      this.getProfileData(); 
  },
  head () {
        return {
            title: (this.profileData.first_name) ? (this.profileData.first_name + " " + this.profileData.last_name) : this.$route.params.id
        }
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/variables.scss";
@import "~/assets/profile-page.scss";
</style>