<template>
  <div>
      <div class="main-wrapper">
          <ProfileHeader v-if="dataLoaded" :profileData="profileData"/>
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
                <p style="position: fixed; bottom: 20px;">(c) 2020 Internet Mall, a.s.</p>               
            </aside>
            <div class="main-content">
                <div v-if="profileData.userId === 'me'" class="card card--noshadow">
                    <CreateNewPost />
                </div>                
                <Post :postData="postData"/>               
            </div>
          </div>
      </div>
  </div>      
</template>

<script>
import axios from 'axios'
import ProfileHeader from '~/components/profile/ProfileHeader'
import Post from "~/components/post/Post";
export default {
  data() {
    return {
      dataLoaded: false,
      profileData: {},
      postData: {
          profile: {
              userId: "jnovak",
              name: "Jan Novák",
              img: "https://demo.hasthemes.com/adda-preview/adda/assets/images/profile/profile-small-1.jpg",
          },
          published: "2020-09-10T21:10:00",
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam ut molestiae exercitationem tenetur facilis odit neque iusto autem officia. Delectus dicta perferendis soluta quia ipsum autem saepe natus ut recusandae.",
          extraContent: {
              type: "photo",
              url: [ 
                  "https://www.irozhlas.cz/sites/default/files/styles/zpravy_otvirak_velky/public/uploader/jakub_nemcok_jako_pa_191018-093542_kro.JPG?itok=ZpzwVeCA",
                  "https://img.blesk.cz/img/1/normal690/5994234-img-marty-is-dead-v0.jpg",
                  "https://dehayf5mhw1h7.cloudfront.net/wp-content/uploads/sites/683/2020/01/03230000/Getty_Buckinghams630_010320.jpg"
              ]
          },
          likes: 40,
          comments: 38,
          shares: 11
      }      
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
        grid-template-columns: 1fr 2fr 1fr;
        gap: 30px;
    }
}
</style>