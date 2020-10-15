<template>
    <div class="post__comments">
        <div>
            <PostSingleComment v-for="comment in commentsToDisplay" class="post__comment" :key="comment.comment_id" :commentData="comment" :postID="postID" @addReplyReference="addReplyReference"/>
            <div v-if="showLessComments && commentsData.length > 3" @click="showLessComments=false" class="post__show-all-comments">Zobrazit další komentáře</div>
            <div class="post__new-comment-wrapper">
                <div><UIProfileImg userID="me" :imgSize="35" class="mr-5"/></div>
                <div class="post__new-comment-textarea">
                    <div v-if="replyingTo"><small>Odpovídáte na <strong>{{replyingTo}}</strong>  <i @click="replyingTo=''" class="las la-times replyto-close"></i></small></div>
                    <UIInput v-model="newComment" ref="addComment" placeholder="Napište komentář..." @keydown.enter.prevent.native="addComment()"/>
                </div>
            </div>    
        </div>
    </div>  
</template>

<script>
import UIProfileImg from '~/components/ui/UIProfileImg';
import PostSingleComment from '~/components/post/PostSingleComment';
import UIInput from "~/components/ui/UIInput";

import focusInput from '~/mixins/focusInput.js'

export default {
    mixins: [focusInput],
    props: {
        comments: Array,
        postID: String
    },
    components: {
        PostSingleComment,
        UIProfileImg,
        UIInput
    },    
    data() {
        return {
            commentsData: this.comments || [],
            newComment: '',
            showLessComments: true, 
            replyingTo: ''
        }
    },
    computed: {
        commentsToDisplay() {
            if(this.showLessComments && this.commentsData.length > 3) {
                return this.commentsData.slice(0, 3);
            } else {
                return this.commentsData;
            }
        }
    },
    methods: {
        addComment() {
            if(this.newComment) {
                let vm = this;
                let newCommentText = vm.newComment;
                let replyTo = vm.replyingTo;
                setTimeout(() => { 
                    const newComment = {
                        "comment_id": "me-com" + (Math.floor(Math.random() * 100000) + 1),
                        "commented_by": "me",
                        "published": new Date().getTime(),
                        "comment_text": newCommentText               
                    };
                    if(replyTo) {                        
                        newComment['reply_to'] = replyTo;
                    }
                    vm.commentsData.unshift(newComment);
                    vm.updateCommentsInStore(newComment);
                }, 1000);
                this.newComment = '';
                this.replyingTo = '';
            }
        },
        addReplyReference(name) {
            this.replyingTo = name;
        },
        updateCommentsInStore(newComment) {
            this.$store.commit('postNewComment', {
                post_id: this.postID,
                ...newComment
            });
        }

    }/*,
    mounted() {
        this.focusInput('addComment') 
    } */  
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

            margin-right: 10px;
        }
    }
    .post__new-comment-wrapper {
        display: flex;
    }
    .post__new-comment-textarea {
        width: 100%;
    }
    .post__show-all-comments {
        color: $primary-color;
        cursor: pointer;
        padding-bottom: 20px;
        text-align: center;
    }
    .replyto-close {
        &:hover {
            transform: scale(0.9);
            cursor: pointer;
        }
    }
</style>