<template>
<div v-if="nameLoaded">
    <div class="post__comment">
        <div>
            <nuxt-link :to="'/profile/' + commentData.commented_by">
                <UIProfileImg :userID="commentData.commented_by" :imgSize="35" class="mr-5"/>
            </nuxt-link>
        </div>
        <div>
            <div class="post__comment-content">
                <strong class="post__comment-author"><nuxt-link :to="'/profile/' + commentData.commented_by">{{commentedByName}}</nuxt-link></strong><br/>
                <span v-html="commentText"></span>
                <QuizAction v-if="commentData.quiz_action && commentData.quiz_action.placement=='post_text'" :quizAction="commentData.quiz_action"/>
                <span style="border-radius: 10px; padding: 1px 3px; background: white; font-size: 10px; position: absolute; right: -10px; bottom: 0; box-shadow: 0 1px 3px 0 silver;"><i class="las la-heart"></i> 8</span>
            </div>
            <small>
                <strong @click="likeComment" :class="(isLiked) ? 'liked' : ''">To se mi líbí</strong> · <strong @click="replyToComment">Odpovědět</strong> · <TimeAgo :time="commentData.published"/>
            </small>
        </div>
    </div>
</div>      
</template>

<script>
import axios from 'axios'
import UIProfileImg from '~/components/ui/UIProfileImg';

import clickableLinks from '~/mixins/clickableLinks.js'
import replaceSmileys from '~/mixins/smileys.js'

export default {
    mixins: [clickableLinks, replaceSmileys],
    props: {
        commentData: Object
    },
    data() {
        return {
            nameLoaded: false,
            commentText: '',
            commentedByName: this.commentData.commented_by,
            isLiked: false
        }
    },
    components: {
        UIProfileImg
    },
    methods: {
        likeComment() {
            this.isLiked = !this.isLiked;
        },
        replyToComment() {
            this.$emit('addReplyReference', 'Jakub Nedorost');
        },
        getFullName() {
            if(this.commentData.commented_by=='me') {
                this.commentedByName = this.$store.getters.getloggedUserWholeName;
                this.nameLoaded = true;
            } else {
                axios.get('http://jakubnedorost.cz/marty/json-cors.php?f=profiles_basic-info')
                    .then(response => {
                        const data = response.data[0][this.commentData.commented_by];
                        if(data.first_name) {
                            this.commentedByName = data.first_name + ' ' + data.last_name;
                        } else {
                            this.commentedByName = data.name;
                        }
                    })
                    .catch(error => console.log(error)) 
                    .finally(() => this.nameLoaded = true)                
            }
        }    
    },
    mounted() {
        this.commentText = this.makeLinksClickable(this.replaceSmileys(this.commentData.comment_text));
        this.getFullName();        
    }
}
</script>

<style lang="scss">
@import "~/assets/variables.scss";
    .post__comment {
        display: flex;
        margin-bottom: 10px; 

        small strong {
            cursor: pointer;
            font-size: 12px;
        }         
    }
    .post__comment-content {
        position: relative;
        background: $message-grey-color;
        padding: 5px 7px;
        border-radius: 5px;
        overflow-wrap: break-word; 
        
        .post__comment-author {
            margin-right: 10px;

            a {
                color: black;
                text-decoration: none;
                &:hover {
                    color: rgba(0,0,0,0.8)
                }
            }
        }
        
    }
    .mr-5 {
        margin-right: 5px;
    }
    .liked {
        color: red;
    }
</style>