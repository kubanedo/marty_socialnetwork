<template>
  <div>
      <div class="main-wrapper">
          <div class="container homepage-grid">
            <aside class="left-sidebar">
                <div class="card">
                    <h3>Profil</h3>
                    <span v-if="friendsCount > 0">Počet přátel: <nuxt-link :to="'/profile/me/friends'">{{friendsCount}}</nuxt-link></span><br/>
                    <span v-if="receivedFriendsReqCount > 0"><nuxt-link to="/friend-requests">Počet nevyřízených žádostí: {{receivedFriendsReqCount}}</nuxt-link></span><br/>
                    <span>Nepřečtené zprávy: 2</span>
                    {{state}}<br/>
                    {{storeChats}}
                    
                </div>  
                <div class="card">
                    <nuxt-link to="/explore/people"><i class="las la-user-friends"></i> Lidé</nuxt-link><br/>
                    <nuxt-link to="/explore/pages"><i class="las la-flag"></i> Stránky</nuxt-link><br/>
                    <nuxt-link to="/saved-posts"><i class="las la-bookmark"></i> Uložené příspěvky<span v-if="savedPostsCount > 0"> ({{savedPostsCount}})</span></nuxt-link>
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
                    <h3>Reklamy</h3>
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
    computed: {
        state() {
            return this.$store.state;
        },        
        storeChats() {
            return (this.$store.state ? this.$store.state.chats : [{}]);
        },
        friendsCount() {
            return this.$store.state.loggedUser.friends.length
        },
        receivedFriendsReqCount() {
            return this.$store.state.pendingRecievedFriendReq.length
        },        
        savedPostsCount() {
            return this.$store.state.savedPosts.length;
        }
    },
    head () {
        return {
          title: 'Hlavní strana'
        }
    }    
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