<template>
  <div>
      <div class="main-wrapper">
          <div class="container homepage-grid">
            <aside class="left-sidebar">
                <div class="card">
                    <h3>Profil</h3>
                    Počet přátel: 43<br/>
                    <span @click="toggle=!toggle">Počet nevyřízených žádostí: 2</span>
                    <br/><br/>{{store}}

                </div>

                    <Footer />
               
            </aside>
            <div class="main-content">
                <div class="card card--noshadow">
                    <CreateNewPost />
                </div>

                <Post v-for="postData in postsData" :key="postData.post_id" :post_data="postData"/>
                <UILoader v-if="isLoading"/>            
            </div>
            <aside class="right-sidebar">
                <div class="card">
                    <h3>Kontakty</h3>
                    <Contacts />
                </div>
                <div class="card">
                    <h3>Stránky</h3>
                </div>                
            </aside>
          </div>
      </div>
  </div>  
</template>

<script>
import axios from 'axios'
import HeaderUserPanel from "~/components/HeaderUserPanel";
import CreateNewPost from "~/components/CreateNewPost";
import Post from "~/components/post/Post";
import Contacts from "~/components/Contacts";
import Footer from "~/components/Footer";
import UILoader from "~/components/ui/UILoader";

export default {
    components: {
        Post,
        HeaderUserPanel,
        CreateNewPost,
        Contacts,
        Footer,
        UILoader
    },
    data() {
        return {
            textik: '',
            toggle: false,
            postsData: [],
            myPostsCount: this.$store.state.myPosts.length,
            isLoading: false,
            store: this.$store.state
        }
    },
    computed: {
        myPosts() {
            return this.$store.state.myPosts;
        },
        storeLikes() {
            return this.$store.state.likes;
        }
    },
    watch: {
        myPosts(value) {
            if(value.length > this.myPostsCount) {
                //jen pokud přibylo
                this.postsData.unshift(value[0]); 
            }
            this.myPostsCount = value.length;
        },
        store(value) {
            this.store = value;
        }
    },
    methods: {
        loadMorePosts() {
            window.onscroll = () => {
                let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
                //console.log(document.documentElement.scrollTop, bottomOfWindow);
                if(bottomOfWindow) {
                    this.isLoading = true;

                    axios.get('http://jakubnedorost.cz/marty/json-cors.php?f=posts')
                        .then(response => {
                            this.postsData.push(...response.data);
                        })
                        .finally(() => {this.isLoading = false})
                        .catch(error => console.log(error))        
              
                }
            }
        },
        loadMyPostsFromStore() {
                let temporaryArray = [];
                this.$store.state.myPosts.forEach((item) => {
                    temporaryArray.push(item)
                });
                this.postsData = [...temporaryArray, ...this.postsData]  
        }
    },
    mounted() {
        this.loadMorePosts();
        axios.get('http://jakubnedorost.cz/marty/json-cors.php?f=posts')
            .then(response => {
                this.postsData = [...response.data];
            })
            .catch(error => console.log(error))
            .finally(() => {
                this.loadMyPostsFromStore();
            })    
    }
}
</script>

<style scoped>

</style>