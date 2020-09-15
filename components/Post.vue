<template>
    <div class="post">
        <div class="post__head">
                <a :href="postData.profile.url" class="profile-img" :style="{ backgroundImage: 'url(' + postData.profile.img + ')' }"></a>
                <div class="post-wrapper">
                <a :href="postData.profile.url" class="profile-name">{{postData.profile.name}}</a>
                <div class="post-time"><TimeAgo :time="postData.published"/></div>
                </div>
                <div class="post__menu"><PostMenu /></div>
        </div>
        <div class="post__body">
            <div class="post__text">
                {{postData.text}}                            
            </div>
            <div class="post__extra-content">
                <PostPhotos v-if="postData.extraContent.type=='photo'" :photosData="postData.extraContent.url"/> 
                <PostVideo v-if="postData.extraContent.type=='video'" :embedURL="postData.extraContent.url"/>                   
            </div>
        </div>
        <div class="post__footer">
            <div class="post__footer-stats">
                <div class="post__likes">
                    <i class="las la-heart"></i> Líbí se vám a {{postData.likes}} dalším uživatelům.
                </div>
                <div class="post__footer-right">
                    <div class="post__comments">
                        <i class="lar la-comments"></i> {{postData.comments}}
                    </div>
                    <div class="post__shares">
                        <i class="las la-share"></i> {{postData.shares}}
                    </div>
                </div>
            </div>
            <div class="post__footer-buttons">
                <button><i class="las la-heart"></i> To se mi líbí</button>
                <button><i class="las la-comment"></i> Okomentovat</button>
                <button><i class="las la-share-square"></i> Sdílet</button>
            </div>
        </div>
    </div>  
</template>

<script>
import TimeAgo from "~/components/TimeAgo";
import PostMenu from "~/components/PostMenu";
import PostVideo from "~/components/PostVideo";
import PostPhotos from "~/components/PostPhotos";

export default {
    props: {
        postData: Object
    },
    components: {
        TimeAgo,
        PostMenu,
        PostVideo,
        PostPhotos
    }
}
</script>

<style lang="scss" scoped>
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
    .post__comments {
        margin-right: 10px;
    }
}
</style>