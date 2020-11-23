<template>
  <div>
    <div v-if="filterByAuthor=='all'||filterByAuthor=='me'" class="card card--noshadow">
        <CreateNewPost />
    </div>
    <div v-if="loadingPosts">
      <LoadingPost v-for="item in 3" :key="item"/>
    </div>
    <Post v-for="postData in postsData" :key="postData.post_id" :post_data="postData" @postLoaded="loadingPosts=false"/>
    <!--<div class="" v-if="!(Array.isArray(postsData) && postsData.length)">Uživatel zatím nenapsal žádný příspěvek.</div>-->
    <UILoader v-if="showLoader"/>
    <NoMorePosts v-if="noMorePosts" />     
  </div>    
</template>

<script>
import UIFriendedToast from '~/components/ui/UIFriendedToast';
import axios from 'axios'
import CreateNewPost from "~/components/CreateNewPost";
import Post from "~/components/post/Post";
import NoMorePosts from "~/components/post/NoMorePosts";
import UILoader from "~/components/ui/UILoader";
import LoadingPost from "~/components/post/LoadingPost";

export default {
    props: {
        filterByAuthor: {
            type: String,
            default: 'all'
        }
    },
    components: {
        UIFriendedToast,
        Post,
        CreateNewPost,
        UILoader,
        NoMorePosts,
        LoadingPost
    },    
    data() {
        return {
            loadingPosts: true,
            postsData: [],
            myPostsCount: this.$store.state.myPosts.length,
            showLoader: false,
            newPostsToBeLoadedFrom: 0,
            noMorePosts: false,
           /* store: this.$store.state*/
        }
    },
    computed: {
        myPosts() {
            return this.$store.state.myPosts;
        },
        storeLikes() {
            return this.$store.state.likes;
        },
        myFriends() {
            return (this.$store.state.loggedUser.friends) ? this.$store.state.loggedUser.friends : [];
        },
        myLikedPages() {
            return (this.$store.state.loggedUser.liked_pages) ? this.$store.state.loggedUser.liked_pages : [];
        }
    },
    watch: {
        myPosts(value, oldvalue) {
            if(oldvalue.length > 0) {
                if(this.filterByAuthor=='all'||this.filterByAuthor=='me') {
                    if(value.length > this.myPostsCount) {
                        //jen pokud přibylo
                        this.postsData.unshift(value[0]); 
                    }
                    this.myPostsCount = value.length;
                }
            }
        },
       /* store(value) {
            this.store = value;
        },*/
        myFriends() {
           if(Array.isArray(this.postsData) && this.postsData.length > 0) {
                this.reloadPosts();
           } 
        }
    },
    methods: {
        reloadPosts() {
                this.postsData = [];
                this.loadingPosts = true;
                this.loadPosts();
        },
        addScrollListener() {
            window.addEventListener('scroll', this.loadNewPostsOnScroll);
        },
        loadNewPostsOnScroll() {
            if(this.showLoader==false) {
                if(this.noMorePosts==false) {
                    let bottomOfWindow = Math.abs(Math.round(document.documentElement.scrollTop + window.innerHeight) - Math.round(document.documentElement.offsetHeight)) < 2; // odchylka pod 2          
                    if(bottomOfWindow) {
                        this.showLoader = true;
                        let vm = this;
                        setTimeout(() => vm.loadPosts(vm.newPostsToBeLoadedFrom), 1000)
                        //this.loadPosts(this.newPostsToBeLoadedFrom); 
                        this.newPostsToBeLoadedFrom += 3;
                    }
                } else {
                    window.removeEventListener('scroll', this.loadNewPostsOnScroll); 
                }
            }    
        },        
        loadPosts(from = 0, count = 3) {
            let queryUrl = process.env.apiUrl + '/?type=posts&from='+ from +'&count='+ count;
            if(this.filterByAuthor!=='all') {
                queryUrl += '&posted_by=' + this.filterByAuthor; 
                if(!(this.myFriends.includes(this.filterByAuthor) || this.myLikedPages.includes(this.filterByAuthor) || this.filterByAuthor=="me")) {
                    queryUrl += '&privacy_settings=all';
                }               
            }
            if(this.filterByAuthor=='all') {
                queryUrl += '&posted_by_ids=' + this.myFriends.join() + ',' + this.myLikedPages.join() + ',me';
            }

            axios.get(queryUrl)
                    .then(response => { 
                        if(Array.isArray(response.data) && response.data.length) {
                            this.postsData = [...this.postsData, ...response.data]
                        } else {
                            this.noMorePosts = true;
                        }                       
                    })
                    .catch(error => console.log(error))
                    .finally(() => {
                        this.loadingPosts = false; 
                        this.showLoader = false;
                        if(this.filterByAuthor=='all'||this.filterByAuthor=='me') {
                            if(from == 0) {
                                this.loadMyPostsFromStore();
                            }
                        }    
                    }) 
        },
        loadMyPostsFromStore() {
            if(this.filterByAuthor=='all'||this.filterByAuthor=='me') {
                let myPosts = [...this.$store.state.myPosts];
                this.postsData = [...myPosts, ...this.postsData]
            }      
        }
    },
    mounted() {
        this.addScrollListener();
        this.loadPosts();
    }
}
</script>

<style>

</style>