<template>
  <div>
      <div class="main-wrapper">
          <div class="container homepage-grid">
            <aside class="left-sidebar">
                <div class="card">
                    <h3>Profil</h3>
                    Počet přátel: 43<br/>
                    <span>Počet nevyřízených žádostí: 2</span>
                </div>  
                <div class="card">
                    <button><i class="las la-user-friends"></i> Lidé</button>
                </div>                             
            </aside>
            <div class="main-content">
                <PostsLoop /> 
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
import PostsLoop from "~/components/PostsLoop";

import Contacts from "~/components/Contacts";

export default {
    components: {
        PostsLoop,
        Contacts
    },
/*    data() {
        return {
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
    } */
}
</script>

<style scoped>

</style>