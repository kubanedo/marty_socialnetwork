<template>
    <div v-if="!(isDeleted || isPostReported)" class="post">
        <div class="post__head">
                <nuxt-link :to="((postData.first_name || postData.posted_by =='me') ? '/profile/' : '/page/') + postData.posted_by"><UIProfileImg :userID="postData.posted_by" imgBorderColor="#f1f1f1"/></nuxt-link>
                <div class="post-wrapper">
                    <nuxt-link :to="((postData.first_name || postData.posted_by =='me') ? '/profile/' : '/page/') + postData.posted_by" class="profile-name underline-hover">{{postedByName}}</nuxt-link>
                    <div class="post-time"><TimeAgo :time="postData.published"/> · <PrivacySettings :postedBy="postData.posted_by" :privacySetting="postData.privacy_settings" :postID="postData.post_id" @updatePrivacySetting="updatePrivacySetting($event)"/></div>                
                </div>
                <div class="post__menu"><PostMenu :postedBy="postData.posted_by" :postID="postData.post_id" @isDeleted="isDeleted=true"/></div>
        </div>
        <div class="post__body">
            <div class="post__text">
                <span v-html="postText"></span>  
                <QuizAction v-if="postData.quiz_action && postData.quiz_action.placement=='post_text'" :quizAction="postData.quiz_action"/>
                <PostSharedContent v-if="postData.shared_post" :sharedPost="postData.shared_post" />
            </div>
            <div class="post__linkpreview" v-if="postData.link && !postData.extra_content">
                <LinkPreview :linkData="postData.link" />
            </div>
            <div class="post__extra-content" v-if="postData.extra_content">
                <PostPhotos v-if="postData.extra_content.type=='photo'" :photosData="postData.extra_content.url" 
                :postData="{
                    posted_by: postData.posted_by,
                    published: postData.published,
                    post_text: postData.post_text
                }"/> 
                <PostVideo v-if="postData.extra_content.type=='video'" :embedURL="postData.extra_content.url"/>                   
            </div>
        </div>
        <div class="post__footer">
            <div class="post__footer-stats">
                <div class="post__likes" :class="(!islikedByMe && likesFromOthers == 0) ? 'zero-likes' : ''">
                    <i class="las la-heart"></i>
                    <span v-if="islikedByMe && likesFromOthers">Líbí se vám a {{likesFromOthers}} dalším uživatelům.</span>
                    <span v-else-if="islikedByMe">Líbí se vám.</span>
                    <span v-else-if="likesFromOthers">Líbí se {{likesFromOthers}} uživatelům.</span>
                    <span v-else>0</span>
                </div>
                <div class="post__footer-right">
                    <button class="post__comments-stats" @click="toggleComments">
                       <span><i class="lar la-comments"></i> {{commentsCount}}</span>
                    </button>
                    <div v-if="shareCount > 0" class="post__shares-stats">
                        <i class="las la-share"></i> {{shareCount}}
                    </div>
                </div>
            </div>
            <div class="post__footer-buttons">
                <button @click="likePost" :class="{liked: islikedByMe}"><i :class="'las la-heart' + ((animatedLike) ? ' animated-like' : '')"></i> <span>To se mi líbí</span></button>
                <button @click="toggleComments"><i class="las la-comment"></i> <span>Okomentovat</span></button>
                <button @click="sharePost" v-if="(postData.posted_by=='me') ? true : (postData.privacy_settings=='all' ? true : false)"><i class="las la-share-square"></i> <span>Sdílet</span></button>
            </div>
            <PostComments v-if="areCommentsOpened" :postID="postData.post_id" :comments="comments" :openedByUser="commentsOpenedByUser" />
        </div>
    </div>  
</template>

<script>
import axios from 'axios'
import TimeAgo from "~/components/TimeAgo";
import PostMenu from "~/components/post/PostMenu";
import PostVideo from "~/components/post/PostVideo";
import PostPhotos from "~/components/post/PostPhotos";
import PostSharedContent from "~/components/post/PostSharedContent";
import PostComments from "~/components/post/PostComments";
import PrivacySettings from "~/components/post/PrivacySettings";
import UIProfileImg from '~/components/ui/UIProfileImg';
import LinkPreview from "~/components/post/LinkPreview";
import QuizAction from '~/components/QuizAction';

import clickableLinks from '~/mixins/clickableLinks.js'
import replaceSmileys from '~/mixins/smileys.js'
export default {
    mixins: [clickableLinks, replaceSmileys],
    props: {
        post_data: Object
    },
    components: {
        TimeAgo,
        PostMenu,
        PostVideo,
        PostPhotos,
        PostSharedContent,
        PostComments,
        UIProfileImg,
        QuizAction,
        LinkPreview
    },
    data() {
        return {
            postData: this.post_data,
            /*nameLoaded: false,*/
            areCommentsOpened: false,
            commentsOpenedByUser: false,
            isDeleted: false,            
            postText: '',
            postedByName: (this.post_data.first_name ? this.post_data.first_name + ' ' + this.post_data.last_name : 
                                (this.post_data.name ? this.post_data.name : 
                                (this.post_data.posted_by==='me' ? this.$store.getters.getMyWholeName() : this.post_data.posted_by))),
            comments: [],
            /*privacySetting: this.post_data.privacy_settings,*/
            animatedLike: false
        }
    },
    computed: {
        islikedByMe() {
            return (this.postData.likes && this.postData.likes.known && this.postData.likes.known.indexOf('me') > -1) ? true : false;
        },        
        likesFromOthers() {
            return ((this.postData.likes && this.postData.likes.known) ? ((this.postData.likes && this.postData.likes.known && this.postData.likes.known.indexOf('me') > -1) ? this.postData.likes.known.length - 1 : this.postData.likes.known.length) : 0) + ((this.postData.likes && this.postData.likes.others) ? this.postData.likes.others : null);
        },
        shareCount() {
            let shareCount = 0;
            if(this.postData.shares) {
                if(this.postData.shares.known) {
                    shareCount += this.postData.shares.known.length;
                }
                if(this.postData.shares.others) {
                    shareCount += this.postData.shares.others;
                }                
            }
            return shareCount;
        },        
        commentsCount() {
            return ((this.comments && this.comments.length) ? this.comments.length : 0);
        },
        isPostReported() {
            return (this.$store.state.reportedPosts) ? this.$store.state.reportedPosts.includes(this.postData.post_id) : false;
        },
 /*       getMyPostData() {
            if(this.postData.posted_by=="me") {
               let postID = this.postData.post_id;
               let thisMyPost = this.$store.getters.getMyPost(postID)
               console.log('my', thisMyPost, postID)
               return thisMyPost
              // 
            } 
            //return null
        } */
    },
    methods: {
        likePost() {
           if(!this.postData.likes) {
             this.postData = {
                 ...this.postData,
                 likes: { known: [] }
             }  
           } 

           if(this.postData.likes.known.indexOf('me') > -1) {
               this.postData.likes.known.splice(this.postData.likes.known.indexOf('me'),1);
               this.animatedLike = false;   
           } else {
                this.postData.likes.known.push('me');
                this.animatedLike = true;           
           } 
           this.updatePost({likes: this.postData.likes});                
        },
        sharePost(){
           if(!this.postData.shares) {
             this.postData = {
                 ...this.postData,
                 shares: { known: [] }
             }  
           } 

           if(this.postData.shares.known.indexOf('me') > -1) {
               this.postData.shares.known.splice(this.postData.shares.known.indexOf('me'),1);
           } else {
               this.postData.shares.known.push('me');
           }            
            this.$store.state.modalWindow = {
                modalName: 'CreatePost',
                shareData: {...this.postData}
            }
            this.updatePost({shares: this.postData.shares});
        },
        toggleComments() {
            this.areCommentsOpened = !this.areCommentsOpened;
            if(this.areCommentsOpened==true) {
                this.commentsOpenedByUser = true;
            }
        },
 /*       getFullName() {
            if(this.post_data.posted_by=='me') {
                this.postedByName = this.$store.getters.getMyWholeName();
                this.nameLoaded = true;
                this.$emit('postLoaded'); 
            } else {
                axios.get(process.env.apiUrl + '/?type=profiles-basic')
                    .then(response => {
                        const data = response.data[this.post_data.posted_by];
                        if(data.first_name) {
                            this.postedByName = data.first_name + ' ' + data.last_name;
                        } else {
                            this.postedByName = data.name;
                        }
                    })
                    .catch(error => console.log(error)) 
                    .finally(() => {
                        this.nameLoaded = true;
                        this.$emit('postLoaded'); 
                    })                
            }
        }, */
        loadComments() {
                axios.get(process.env.apiUrl + '/?type=comments&post_id=' + this.post_data.post_id)
                    .then(response => {
                        const data = response.data;
                        if(Array.isArray(data) && data.length) {
                            this.comments = [...data];
                        } else {
                            this.comments = [];
                        }
                    })
                    .catch(error => console.log(error))
                    .then(() => this.loadMyCommentsFromStore()) 
                    .finally(() => {
                          /*  this.commentsCount = (this.comments && this.comments.length) ? this.comments.length : 0;*/
                            if(this.commentsCount > 0) {
                                this.areCommentsOpened = true;
                            }  
                            this.$emit('postLoaded');                       
                    });        
        },
        updatePost(updatedProperty) {
            let postData = {
                post_id: this.postData.post_id,
                posted_by: this.postData.posted_by, 
                ...updatedProperty
            };
            this.$store.commit('updatePost', postData);
        },
        updatePrivacySetting(value) {
            this.postData.privacy_settings = value;
            this.updatePost({privacy_settings: this.postData.privacy_settings});
        },
        getChangesFromStore() {
            let storeArrayPos;
            this.$store.state.othersPosts.forEach((item, index) => {
                if(item.post_id==this.postData.post_id) {
                    storeArrayPos = index;
                }
            });
            if(storeArrayPos!==undefined) {
               this.postData = {
                   ...this.postData,
                   ...this.$store.state.othersPosts[storeArrayPos]
               } 
            } 
        },
        loadMyCommentsFromStore() {                     
            let storeData = this.$store.state.myComments[this.postData.post_id];
            if(storeData!==undefined) {
                let temporaryArray = []; 
                storeData.forEach((item) => {
                    temporaryArray.unshift(item)
                });      
                console.log(temporaryArray)         
                this.comments = [...temporaryArray, ...this.comments];
            }            
        },
        watchForChangesOfMyPost() {
            if(this.postData.posted_by=="me") {
                let postID = this.postData.post_id;
                console.log('watcher activated', postID)
                this.$store.watch((state, getters) => getters.getMyPost(postID), (newValue, oldValue) => {
                    if(newValue!==undefined) {
                        this.postData = newValue;
                        this.postText = newValue.post_text;
                    }
                }, {deep: true})                
            }
        }
    },
   /* watch: {
        getMyPostData(value) {
            //if my post edited
            console.log(value);
            this.postData = value;
            this.postText = value.post_text;
        }
    },*/
    mounted() {
        this.watchForChangesOfMyPost();
        this.getChangesFromStore();
        this.postText = this.makeLinksClickable(this.replaceSmileys(this.postData.post_text));
        this.loadComments();
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
        word-break: break-all;

        a {
          word-break: keep-all;  
        }
    }
    .post__extra-content {
        margin-right: -15px;
        margin-left: -15px;
        @media screen and (min-width: 490px) {
            margin-left: -20px;
            margin-right: -20px;           
        }          
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
        display: flex;
        justify-content: space-around;
        text-align: center;
        font-size: 14px;
        padding-bottom: 0;
        margin-left: -15px;
        margin-right: -15px;
        @media screen and (min-width: 490px) {
            margin-left: -20px;
            margin-right: -20px;           
        }        
        i.las {
            font-size: 18px;
                @media screen and (min-width: 490px) {
                    font-size: 22px;       
                }            
        }
        button {
            span {
                display: block;
                @media screen and (min-width: 490px) {
                    display: inline;          
                }
            }
            min-width: 33%;
            padding: 5px;
            border-radius: 5px;
            white-space: nowrap;
            &:hover {
                background: #f7f7f7;
            }
            &:active {
                transform: scale(0.97);
            }
        }        
    }
    .post__comments-stats {
        margin-right: 10px;
    }
    button.liked {
        color: red;
    }
    i.animated-like {
        animation: heartbeat 1s 4;
    }
    @keyframes heartbeat
    {
        0%
            {
                transform: scale( 1.25 );
            }
        20%
            {
                transform: scale( 1 );
            }
        40%
            {
                transform: scale( 1.25 );
            }
        60%
            {
                transform: scale( 1 );
            }
        80%
            {
                transform: scale( 1.25 );
            }
        100%
            {
                transform: scale( 1.25 );
            }
    }    
    .zero-likes {
        color: grey;
    }
}
</style>