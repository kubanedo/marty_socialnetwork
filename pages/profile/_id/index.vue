<template>
  <div>
      <div class="main-wrapper">
          <div class="profile-header">
            <ProfileHeader v-if="dataLoaded" :profileData="{profile_id: $route.params.id, ...profileData}"/>
            <LoadingProfileHeader v-else />
          </div>
          <div class="container grid">
            <aside class="left-sidebar">
                <div class="card">
                    <h3>Základní informace</h3>
                    <div v-if="profileData.sex"><strong>Pohlaví: </strong>{{ (profileData.sex=="m") ? "muž" : "žena"}}</div>
                    <div v-if="profileData.about_info && profileData.about_info.birthday"><strong><i class="las la-birthday-cake"></i> Narozeniny: </strong>{{ profileData.about_info.birthday }}</div>
                    <div v-if="profileData.about_info && profileData.about_info.current_town"><strong><i class="las la-city"></i> Žije ve městě: </strong>{{ profileData.about_info.current_town }}</div>
                    <div v-if="profileData.about_info && profileData.about_info.study"><strong><i class="las la-graduation-cap"></i> Studuje: </strong>{{ profileData.about_info.study }}</div>
                    {{profileData}}
                </div> 
                <div class="card">
                  <h3>Fotky</h3>
                </div>
                <div class="card">
                  <h3>Přátelé<small v-if="commonFriendsCount > 0"> ({{commonFriendsCount}} společných)</small></h3>
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
export default {
  components: {
    ProfileHeader,
    LoadingProfileHeader
  },
  data() {
    return {
      dataLoaded: false,
      profileData: {},
      postsData: []   
    }
  },
  computed: {
        postsDataComp() {
            return this.postsData
        },
        commonFriendsCount() {
          let result = [];
          let friendsOfUser = this.profileData.friends;
          if(this.$store.state.myFriends && friendsOfUser) {
              result = this.$store.state.myFriends.filter((item) => {
                  return friendsOfUser.indexOf(item) > -1;
              });
          }
          return result.length;
      }      
  },
  methods: {
    getProfileData() {
        if(this.$route.params.id=="me") {
          this.profileData = {
            ...this.$store.state.loggedUser
          }
          this.dataLoaded = true
        } else {  
          axios.get('https://jakubnedorost.cz/marty/api/?type=profiles')
            .then(response => {
              const data = response.data[0][this.$route.params.id];
              this.profileData = {...data, userId: this.$route.params.id}
              this.dataLoaded = true
            })
            .catch(error => console.log(error))
        } 
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
.main-wrapper {
    padding-top: 90px;
    .container.grid {
        max-width: 1040px;
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
</style>