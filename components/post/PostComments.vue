<template>
    <div class="post__comments">
        <div>
            <PostSingleComment v-for="(comment, index) in comments" class="post__comment" :key="index" :comment="comment" @addReplyReference="addReplyReference"/>
            <div class="post__new-comment-wrapper">
                <div><UIProfileImg :imgURL="this.$store.state.loggedUser.profileImg" :imgSize="35" class="mr-5"/></div>
                <div class="post__new-comment-textarea"><textarea v-model="newComment" id="addComment" placeholder="Napište komentář..." @keydown.enter.prevent="addComment()"></textarea></div>
            </div>    
        </div>
    </div>  
</template>

<script>
import UIProfileImg from '~/components/ui/UIProfileImg';
import UIHtmlInput from '~/components/ui/UIHtmlInput';
import PostSingleComment from '~/components/post/PostSingleComment';
export default {
    props: {
        comments: Array
    },
    components: {
        PostSingleComment,
        UIProfileImg,
        UIHtmlInput
    },    
    data() {
        return {
            newComment: ''
        }
    },
    methods: {
        addComment() {
            if(this.newComment) {
                this.comments.push(this.newComment);
                this.newComment = '';
            }
        },
        focusInput() {
            const input = this.$el.querySelector('#addComment');
            if(typeof input !== "undefined") {
               input.focus(); 
            }
        },
        addReplyReference(event) {
            this.newComment = '<strong>' + event + '</strong> ';
        }

    },
    mounted() {
        this.focusInput() 
    }   
}
</script>

<style lang="scss" scoped>
@import "~/assets/variables.scss";
    .post__comments {
        border-top: 1px silver solid;
        margin-left: -20px;
        margin-right: -20px;
        margin-top: 10px;
        padding: 20px 20px 10px 20px;

        textarea {
            background: $input-color;
            width: 100%;
            border-radius: 5px;
            margin-right: 10px;
            padding: 10px;
            color: black;
            overflow-wrap: break-word;
        }
    }
    .post__new-comment-wrapper {
        display: flex;
    }
    .post__new-comment-textarea {
        width: 100%;
    }
</style>