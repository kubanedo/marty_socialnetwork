<template>
  <div>
      <div class="main-wrapper">
          <ProfileHeader v-if="dataLoaded" :profileData="profileData"/>
          <div class="container grid">
            <aside class="left-sidebar">
                <div class="card">
                    <h3>Základní informace</h3>
                    <div v-if="profileData.sex"><strong>Pohlaví: </strong>{{ (profileData.sex=="m") ? "muž" : "žena"}}</div>
                </div>
                <p style="position: fixed; bottom: 20px;">(c) 2020 Internet Mall, a.s.</p>               
            </aside>
            <div class="main-content">
                <div class="card card--noshadow">
                    URL Profilu: /profile/{{$route.params.id}}<br/>
                    <strong>{{profileData.first_name + " " + profileData.last_name}}</strong><br/>
                    <br/>
                    {{profileData}}
                </div>                
            </div>
          </div>
      </div>
  </div>      
</template>

<script>
import axios from 'axios'
import ProfileHeader from '~/components/profile/ProfileHeader'
export default {
  data() {
    return {
      dataLoaded: false,
      profileData: {}
    }
  },
  mounted() {
    if(this.$route.params.id=="me") {
      this.profileData = {
        ...this.$store.state.loggedUser
      }
      this.dataLoaded = true
    } else {  
      axios.get('http://jakubnedorost.cz/marty/json-cors.php?f=profiles&c=1')
        .then(response => {
          const data = response.data[0][this.$route.params.id];
          this.profileData = {...data, userId: this.$route.params.id}
          this.dataLoaded = true
        })
        .catch(error => console.log(error))
    } 
  }
}
</script>

<style lang="scss" scoped>
.main-wrapper {
    padding-top: 90px;
    .container.grid {
        display: grid;
        grid-template-columns: 1fr 3fr;
        gap: 30px;
    }
}
</style>