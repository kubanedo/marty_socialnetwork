<template>
<div>
        <div class="card card--title">
            <h2>Uložené příspěvky</h2>
        </div>    
        <LoadingPost v-if="loadingPosts"/>
        <Post v-else-if="!noPosts" v-for="postData in postsData" :key="postData.post_id" :post_data="postData" @postLoaded="loadingPosts=false"/> 
        <div v-else class="card text-center card--noshadow">
                <div class="circle-icon">
                    <i class="las la-bookmark"></i>
                </div>                    
                Žádné uložené příspěvky.
        </div>                       
  </div>      
</template>

<script>
import axios from 'axios'
import Post from "~/components/post/Post";
import LoadingPost from "~/components/post/LoadingPost";
export default {
    components: {
        Post,
        LoadingPost
    },
    data() {
        return {
            loadingPosts: true,
            noPosts: false,
            postsData: [],
            loadedSavedPosts: [] 
        }
    },
    computed: {
        savedPosts() {
            return this.$store.state.savedPosts;
        }
    },
    watch: {
        savedPosts(value) {
            if(value.length >= this.loadedSavedPosts.length) {
                this.loadSavedPosts();         
            } else {
                let difference = this.loadedSavedPosts.filter(x => !value.includes(x));
                difference.forEach((item) => this.moveFromSaved(item));
                if (!value.length) {
                    this.noPosts = true;
                }
            }
        }            
    },
    methods: {
        moveFromSaved(post_id) {
           this.postsData = this.postsData.filter(item => item.post_id !== post_id); 
           this.loadedSavedPosts = this.loadedSavedPosts.filter(item => item !== post_id);
        },
        loadSavedPosts() {
            this.postsData = [];
            if(Array.isArray(this.savedPosts) && this.savedPosts.length) {
                this.savedPosts.forEach((saved_post_id) => {
                    axios.get('https://jakubnedorost.cz/marty/api/?type=posts&post_id=' + saved_post_id)
                                    .then(response => { 
                                        if(Array.isArray(response.data) && response.data.length) {
                                            this.postsData.push(...response.data);
                                        }                      
                                    })
                                    .catch(error => console.log(error))
                                    .finally(() => {
                                       this.loadingPosts = false;
                                    }) 
                }); 
                this.loadedSavedPosts = [...this.savedPosts];
                this.noPosts = false;
            } else {
                this.loadingPosts = false;
                this.noPosts = true;
            }           
        }
    }, 
    mounted() {
        this.loadSavedPosts();
    },
    head () {
        return {
          title: 'Uložené příspěvky'
        }
    }    
}
</script>

<style>

</style>