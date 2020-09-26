<template>
<div>
    <div class="post__comment">
        <div><UIProfileImg imgURL="https://demo.hasthemes.com/adda-preview/adda/assets/images/profile/profile-small-1.jpg" :imgSize="35" class="mr-5"/></div>
        <div>
        <div class="post__comment-content"><strong class="post__comment-author">Jméno Komentujícího</strong>{{comment}}</div>
        <small><strong @click="likeComment" :class="(isLiked) ? 'liked' : ''">To se mi líbí</strong> · <strong @click="replyToComment">Odpovědět</strong> · <TimeAgo/></small>
        </div>
    </div>
</div>      
</template>

<script>
import UIProfileImg from '~/components/ui/UIProfileImg';
export default {
    props: {
        comment: String
    },
    data() {
        return {
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
        }
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
        background: $message-grey-color;
        padding: 5px 7px;
        border-radius: 5px;
        overflow-wrap: break-word; 
        
        .post__comment-author {
            margin-right: 10px;
        }
        
    }
    .mr-5 {
        margin-right: 5px;
    }
    .liked {
        color: red;
    }
</style>