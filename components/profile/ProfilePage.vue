<template>
  <div>
      <div class="main-wrapper">
          <div class="profile-header">
            <ProfileHeader v-if="dataLoaded" :profileData="profileData"/>
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
            </aside>
            <div class="main-content">
                <slot :profileData="profileData" />          
            </div>
          </div>
      </div>
  </div>      
</template>

<script>
import axios from 'axios';
import ProfileHeader from '~/components/profile/ProfileHeader'

export default {
  components: {
    ProfileHeader
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
          axios.get('http://jakubnedorost.cz/marty/json-cors.php?f=profiles')
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
            title: (this.profileData.first_name + " " + this.profileData.last_name) || this.$route.params.id
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
        grid-template-columns: 1fr 3fr !important;
        gap: 30px;
    }
}
.profile-header {
  min-height: 270px;
}
</style>