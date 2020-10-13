<template>
  <div v-if="nameLoaded" class="shared-content">
      <nuxt-link :to="'/profile/' + sharedPost.posted_by">{{postedByName}}</nuxt-link> · <small><TimeAgo :time="sharedPost.published"/></small><br/>
      <span v-html="postText"></span>
  </div>
</template>

<script>
import axios from 'axios'
import PostVideo from "~/components/post/PostVideo";
import PostPhotos from "~/components/post/PostPhotos";
import TimeAgo from "~/components/TimeAgo";

import clickableLinks from '~/mixins/clickableLinks.js'
import replaceSmileys from '~/mixins/smileys.js'

export default {
    mixins: [clickableLinks, replaceSmileys],    
    props: {
        sharedPost: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            postText: this.sharedPost.post_text,
            postedByName: '',
            nameLoaded: false
        }
    },
    components: {
        TimeAgo,
        PostPhotos,
        PostVideo
    }, 
    methods: {
        getFullName() {
            if(this.sharedPost.posted_by=='me') {
                this.postedByName = this.$store.getters.getloggedUserWholeName;
                this.nameLoaded = true;
            } else {
                axios.get('http://jakubnedorost.cz/marty/json-cors.php?f=profiles_basic-info')
                    .then(response => {
                        const data = response.data[0][this.sharedPost.posted_by];
                        if(data.first_name) {
                            this.postedByName = data.first_name + ' ' + data.last_name;
                        } else {
                            this.postedByName = data.name;
                        }
                    })
                    .catch(error => console.log(error)) 
                    .finally(() => this.nameLoaded = true)                
            }
        }        
    },
    mounted() {
        this.getFullName();
        this.postText = this.makeLinksClickable(this.replaceSmileys(this.sharedPost.post_text));
    }           
}
</script>

<style scoped>
    .shared-content {
        padding-left: 10px;
        margin: 10px 0 15px 5px;
        border-left: 5px silver solid;
    }
</style>