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

                <div v-if="postData.extraContent.type=='video'" class="embed-wrapper">
                    <div class="embed">
                        <iframe scrolling="no" :src="postData.extraContent.url" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen=""></iframe>
                    </div>
                </div>   

            </div>
        </div>
        <div class="post__footer">
            <div class="post__likes">
                <i class="lar la-thumbs-up"></i> Líbí se vám a {{postData.likes}} dalším uživatelům.
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
    </div>  
</template>

<script>
import TimeAgo from "~/components/TimeAgo";
import PostMenu from "~/components/PostMenu";
export default {
    props: {
        postData: Object
    },
    components: {
        TimeAgo,
        PostMenu
    }
}
</script>

<style>

</style>