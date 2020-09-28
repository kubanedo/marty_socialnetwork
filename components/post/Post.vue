<template>
    <div class="post">
        <div class="post__head">
                <nuxt-link :to="'/profile/' + postData.posted_by"><UIProfileImg :imgURL="'http://jakubnedorost.cz/marty/images/profiles/' + postData.posted_by + '/profileimg.jpg'"/></nuxt-link>
                <div class="post-wrapper">
                    <nuxt-link :to="'/profile/' + postData.posted_by" class="profile-name">{{postData.posted_by}}</nuxt-link>
                    <div class="post-time"><TimeAgo :time="postData.published"/> · <PrivacySettings :privacySetting="postData.privacy_settings"/></div>                
                </div>
                <div class="post__menu"><PostMenu /></div>
        </div>
        <div class="post__body">
            <div class="post__text">
                {{postData.post_text}}  
                <QuizAction v-if="postData.quiz_action && postData.quiz_action.placement=='post_text'" :quizAction="postData.quiz_action"/>
            </div>
            <div class="post__extra-content" v-if="postData.extra_content">
                <PostPhotos v-if="postData.extra_content.type=='photo'" :photosData="postData.extra_content.url"/> 
                <PostVideo v-if="postData.extra_content.type=='video'" :embedURL="postData.extra_content.url"/>                   
            </div>
        </div>
        <div class="post__footer">
            <div class="post__footer-stats">
                <div class="post__likes">
                    <i class="las la-heart"></i> 
                    <span v-if="islikedByMe && likesFromOthers">Líbí se vám a {{likesFromOthers}} dalším uživatelům.</span>
                    <span v-else-if="islikedByMe">Líbí se vám.</span>
                    <span v-else-if="likesFromOthers">Líbí se {{likesFromOthers}} uživatelům.</span>
                    <span v-else>0</span>
                </div>
                <div class="post__footer-right">
                    <button class="post__comments-stats" @click="toggleComments">
                        <i class="lar la-comments"></i> {{comments.length}}
                    </button>
                    <div class="post__shares-stats">
                        <i class="las la-share"></i> {{shares.count}}
                    </div>
                </div>
            </div>
            <div class="post__footer-buttons">
                <button @click="likePost" :class="(islikedByMe) ? 'liked' : ''"><i class="las la-heart"></i> To se mi líbí</button>
                <button @click="toggleComments"><i class="las la-comment"></i> Okomentovat</button>
                <button><i class="las la-share-square"></i> Sdílet</button>
            </div>
            <PostComments v-if="areCommentsOpened" :comments="comments" />
        </div>
    </div>  
</template>

<script>
import TimeAgo from "~/components/TimeAgo";
import PostMenu from "~/components/post/PostMenu";
import PostVideo from "~/components/post/PostVideo";
import PostPhotos from "~/components/post/PostPhotos";
import PostComments from "~/components/post/PostComments";
import PrivacySettings from "~/components/post/PrivacySettings";
import UIProfileImg from '~/components/ui/UIProfileImg';
import QuizAction from '~/components/QuizAction';
export default {
    props: {
        postData: Object
    },
    components: {
        TimeAgo,
        PostMenu,
        PostVideo,
        PostPhotos,
        PostComments,
        UIProfileImg,
        QuizAction
    },
    data() {
        return {
            likes: this.postData.likes || null,
            areCommentsOpened: false,
            comments: [
                'Komentář 1', 'komentářík jdhiahsdaj ahaaa ahaaaaa no nevíííím'
            ],
            shares: {
                count: 11
            }
        }
    },
    computed: {
        islikedByMe() {
            return (this.likes && this.likes.known && this.likes.known.indexOf('me') > -1) ? true : false;
        },
        likesFromOthers() {
            return ((this.likes && this.likes.known) ? ((this.likes && this.likes.known && this.likes.known.indexOf('me') > -1) ? this.likes.known.length - 1 : this.likes.known.length) : 0) + ((this.likes && this.likes.others) ? this.likes.others : null);
        }
    },
    methods: {
        likePost() {
           if(!this.likes) {
             this.likes =  {
                 known: []
             }  
           } 

           if(this.likes.known.indexOf('me') > -1) {
               this.likes.known.splice(this.likes.known.indexOf('me'),1);
           } else {
               this.likes.known.push('me'); 
           }      
        },
        toggleComments() {
            this.areCommentsOpened = !this.areCommentsOpened;
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~/assets/variables.scss";
.post {
    padding-bottom: 10px;

    .post__head {
        display: grid;
        grid-template-columns: 55px auto max-content;
        margin-bottom: 20px;
    }
    .post__menu {
        font-size: 25px;
    }
    .post__text {
        margin-bottom: 10px;
    }
    .post__extra-content {
        margin-right: -20px;
        margin-left: -20px;
    }
    .post__footer-stats, .post__footer-buttons {
        display: grid;
        padding: 10px;
        border-top: 1px silver solid;
    }
    .post__footer-stats {
        margin-top: 20px;
        grid-template-columns: auto max-content;
    }
    .post__footer-right {
        display: flex;
    }
    .post__footer-buttons {
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
        text-align: center;
        font-size: 18px;
        padding-bottom: 0;
        margin-left: -20px;
        margin-right: -20px;
        i.las {
            font-size: 22px;
        }
        button {
            padding: 5px;
            border-radius: 5px;
            &:hover {
                background: #f7f7f7;
            }
        }        
    }
    .post__comments-stats {
        margin-right: 10px;
    }
    button.liked {
        color: red;
    }
}
</style>