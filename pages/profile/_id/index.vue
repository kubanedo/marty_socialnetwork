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
                    <CreateNewPost @postNewPost="postNewPost"/>
                </div>              
                <Post v-for="postData in postsDataComp" :key="postData.post_id" :postData="postData"/>               
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
    },
    getPostsData() {
      axios.get('http://jakubnedorost.cz/marty/json-cors.php?f=posts')
        .then(response => {
            response.data.forEach((item) => {
              console.log(item);
              if(item.posted_by==this.$route.params.id) {
                this.postsData.unshift(item);
              }
            });
        })
        .catch(error => console.log(error))

        this.$store.state.posts.forEach((item) => {
            this.postsData.unshift(item)
        });
    },
    postNewPost(newPostText) {
        let vm = this;
        setTimeout(() => { 
            const newPost = {
                "post_id": "me" + (Math.floor(Math.random() * 100000) + 1),
                "posted_by": "me",
                "published": new Date().getTime(),
                "privacy_settings": "all",
                "post_text": newPostText               
            };
            vm.postsData.unshift(newPost);
            vm.$store.commit('postNewPost', newPost);
        }, 1000);
    }    
  },
  mounted() {
      this.getProfileData();
      this.getPostsData();     
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
</style>