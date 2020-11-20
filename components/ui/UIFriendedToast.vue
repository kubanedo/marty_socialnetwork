<template>
    <div class="toast-container">
        <div class="profile_img">
            <UIProfileImg :userID="user_info.user_id" imgBorderColor="#f1f1f1"/>
        </div>
        <div class="message">
            <div><strong class="underline-hover white" @click="showProfile">{{user_info.user_name}}</strong> přijal{{(user_info.sex=="f") ? 'a' : ''}} žádost o přátelství.</div>
        </div>
    </div>   
</template>

<script>
import UIProfileImg from '~/components/ui/UIProfileImg';
export default {
    components: {
        UIProfileImg
    },
    props: {
        user_info: {
            type: Object,
            required: true
        }
    },
    methods: {
        showProfile() {
            $nuxt.$router.push(`/profile/${this.user_info.user_id}`)
        }
    }
}
</script>

<style lang="scss" scoped>
.toast-container {
    display: flex
}
.profile_img {
    margin-right: 10px;
}
.message {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.white {
    color: white;
    &:hover {
        color: rgba(255,255,255,0.95)
    }
}
</style>