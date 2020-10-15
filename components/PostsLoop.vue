<template>
  <div>
    <div v-if="filterByAuthor=='all'||filterByAuthor=='me'" class="card card--noshadow">
        <CreateNewPost />
    </div>

    <Post v-for="postData in postsData" :key="postData.post_id" :post_data="postData"/>
    <UILoader v-if="isLoading"/>       
  </div>    
</template>

<script>
import axios from 'axios'
import CreateNewPost from "~/components/CreateNewPost";
import Post from "~/components/post/Post";
import UILoader from "~/components/ui/UILoader";

export default {
    props: {
        filterByAuthor: {
            type: String,
            default: 'all'
        }
    },
    components: {
        Post,
        CreateNewPost,
        UILoader
    },    
    data() {
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
                if(this.filterByAuthor!=='all') {
                    response.data.forEach((item) => {
                        if(item.posted_by==this.filterByAuthor) {
                            this.postsData.unshift(item);
                        }
                    });                    
                } else {
                   this.postsData = [...response.data];
                }
            })
            .catch(error => console.log(error))
            .finally(() => {
                if(this.filterByAuthor=='all'||this.filterByAuthor=='me') {
                    this.loadMyPostsFromStore();
                }
            })    
    }
}
</script>

<style>

</style>