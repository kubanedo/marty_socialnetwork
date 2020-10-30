<template>
  <div>
      <div class="main-wrapper">
          <div class="profile-header">
            <ProfileHeader v-if="dataLoaded" :profileData="{profile_id: $route.params.id, ...profileData}"/>
            <LoadingProfileHeader v-else />
          </div>
          <div class="container grid">
            <aside class="left-sidebar">
              <div class="sidebar-container" v-if="dataLoaded">
                <div class="card">
                    <h3>Úvodní informace</h3>
                    <div v-if="profileData.sex"><strong>Pohlaví: </strong>{{ (profileData.sex=="m") ? "muž" : "žena"}}</div>
                    <div v-if="profileData.about_info && profileData.about_info.day_of_birth"><strong><i class="las la-birthday-cake"></i> Narozeniny: </strong>{{ getBirthdayDate(profileData.about_info.day_of_birth) }}</div>
                    <div v-if="profileData.about_info && profileData.about_info.day_of_birth"><strong><i class="las la-birthday-cake"></i> Věk: </strong>{{ getAge(profileData.about_info.day_of_birth) }} let</div>                    
                    <div v-if="profileData.about_info && profileData.about_info.current_town"><strong><i class="las la-city"></i> Žije ve městě: </strong>{{ profileData.about_info.current_town }}</div>
                    <div v-if="profileData.about_info && profileData.about_info.study"><strong><i class="las la-graduation-cap"></i> Studuje: </strong>{{ profileData.about_info.study }}</div>
                    {{profileData}}
                </div> 
                <div class="card" v-if="Array.isArray(profileData.photos) && profileData.photos.length">
                  <h3>Fotky</h3>
                  <div class="sidebar__photos">
                    <ProfileSidebarPhoto 
                      v-for="(photo, index) in profileData.photos.slice(0,3)" :key="index" 
                      :imageURL="`https://jakubnedorost.cz/marty/images/profiles/${$route.params.id}/photos/${photo}.jpg`"
                      @click="console.log(photo)" />
                  </div>
                  <nuxt-link :to="`/profile/${$route.params.id}/photos`" tag="button" class="sidebar__btn">Všechny fotky</nuxt-link>
                </div>
                <div class="card" v-if="friendsLoaded">
                  <h3>Přátelé<small v-if="commonFriendsCount > 0"> ({{commonFriendsCount}} společných)</small></h3>
                  <div class="sidebar__friends">
                    <ProfileSidebarFriend v-for="friend in friendsData" :key="friend.profile_id" :friendData="friend" :commonFriends="getCommonFriendsList(friend.friends)"/>
                  </div>                  
                  <nuxt-link :to="`/profile/${$route.params.id}/friends`" tag="button" class="sidebar__btn">Všichni přátelé</nuxt-link>
                </div>
              </div> 
              <div class="sidebar-container" v-else>
                <div class="card" v-for="(item, index) in 2" :key="index">
                  <UILoadingContent /> 
                </div>             
              </div>                             
            </aside>
            <div class="main-content">
              <nuxt-child :profileData="profileData"/>            
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
      }      
  },
  methods: {
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
          if(this.$store.state.myFriends && friendsArray) {
              result = this.$store.state.myFriends.filter((item) => {
                  return friendsArray.indexOf(item) > -1;
              });
          }
          return result;
    },
    getProfileData() {
        if(this.$route.params.id=="me") {
          this.profileData = {
            ...this.$store.state.loggedUser
          }
          this.dataLoaded = true
        } else {  
          axios.get('https://jakubnedorost.cz/marty/api/?type=profiles&profile_id=' + this.$route.params.id)
            .then(response => {
              const data = response.data;
              this.profileData = {...data, userId: this.$route.params.id}
              this.dataLoaded = true
            })
            .catch(error => console.log(error))
            .finally(() => {
              this.getFriendsData();
            })
        } 
    },
    getFriendsData() {
          let friends = this.profileData.friends;
          axios.get('https://jakubnedorost.cz/marty/api/?type=profiles&profile_ids=' + friends.join())
            .then(response => {
              this.friendsData = [...response.data];
              this.friendsLoaded = true;
            })
            .catch(error => console.log(error))      
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
.main-wrapper {
    padding-top: 90px;
    .container.grid {
        max-width: 1040px;
        padding: 0;
        display: grid;
        grid-template-columns: 2fr 3fr !important;
        gap: 30px;
    }
}
.profile-header {

  min-height: 270px;
}
.card h3 {
  margin-bottom: 10px;
}
.sidebar__photos, .sidebar__friends {
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(3, 1fr);
}
.sidebar__btn {
  background: $page-background;
  color: $primary-color;
  border-radius: 5px;
  width: 100%;
  margin-top: 10px;
  padding: 5px;
  font-weight: bold;

  &:hover {
  background: lighten($page-background, 1);    
  }
              &:active {
                transform: scale(0.97);
            }  
}
</style>