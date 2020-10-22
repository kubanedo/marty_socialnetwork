<template>
    <div>
       <Post v-for="postData in postsData" :key="postData.post_id" :post_data="postData"/> 
       <br/>
              <br/>
                     <br/>
                            <br/>
                                   <br/>
                                   {{postsData}}
    </div>
</template>

<script>
import axios from 'axios'
import Post from "~/components/post/Post";
export default {
    components: {
        Post
    },
    data() {
        return {
            postsData: []
        }
    },
    computed: {

    },
    methods: {
        loadPost() {
                let myPostsFromStore = [...this.$store.state.myPosts];
                console.log(myPostsFromStore)
                let postsData = myPostsFromStore.filter((item) => {
                    return item.post_id === this.$route.params.id;
                });
                this.postsData = postsData;
        console.log(this.$route.params.id);


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
    mounted() {
        this.loadPost();
    }
}
</script>

<style>

</style>