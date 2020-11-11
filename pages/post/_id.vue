<template>
<div>
    <div class="card card--title">
        <h2>Samostatný příspěvek</h2>
    </div>           
    <LoadingPost v-if="loadingPost"/>
    <Post v-for="postData in postsData" :key="postData.post_id" :post_data="postData" @postLoaded="loadingPost=false"/>
    <div class="card text-center card--noshadow" v-if="isPostReported">
        <div class="circle-icon">
            <i class="las la-eye-slash"></i>
        </div>
        Tento příspěvek jsi nahlásil/a jako nevhodný. Není jej proto možné zobrazit.
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
            loadingPost: true,
            postsData: [] 
        }
    },
    computed: {
        myPosts() {
            return this.$store.state.myPosts;
        },
        isPostReported() {
            return (this.$store.state.reportedPosts) ? this.$store.state.reportedPosts.includes(this.$route.params.id) : false;
        }
    },
    methods: {
        loadPost() {
                let myPostsFromStore = [...this.myPosts];

                let postsData = myPostsFromStore.filter((item) => {
                    return item.post_id === this.$route.params.id;
                });
                this.postsData = postsData;


                if(!(Array.isArray(postsData) && postsData.length)) {
                axios.get('https://jakubnedorost.cz/marty/api/?type=posts&post_id=' + this.$route.params.id)
                                .then(response => { 
                                    if(Array.isArray(response.data) && response.data.length) {
                                        this.postsData = [...response.data]
                                    } else {
                                        
                                    }                       
                                })
                                .catch(error => console.log(error))
                }              
        }
    },
    watch: {
        myPosts(value) {
            this.loadPost();
        }
    },    
    mounted() {
        this.loadPost();
    },
    head () {
        return {
          title: 'Příspěvek'
        }
    } 
}
</script>

<style>

</style>