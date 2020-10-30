<template>
<div class="profile__sidebar-friend-wrapper">
    <nuxt-link :to="`/profile/${friendData.profile_id}`">
        <div class="profile__sidebar-friend" :style="`background-image: url('https://jakubnedorost.cz/marty/images/profiles/${friendData.profile_id}/profileimg.jpg')`">
            <div class="overlay"></div>
        </div> 
    </nuxt-link>
    <nuxt-link :to="`/profile/${friendData.profile_id}`" class="underline-hover"> 
        <h4>{{friendData.first_name + ' ' + friendData.last_name}}</h4>
    </nuxt-link>
    <small v-if="commonFriends.length > 0" @click="openCommonFriendsList" class="underline-hover">{{commonFriends.length}} společných přátel</small>    
</div>         
</template>

<script>
export default {
    props: {
        friendData: {
            type: Object,
            required: true
        },
        commonFriends: {
            type: Array
        }
    },
    methods: {
        openCommonFriendsList() {
            this.$store.state.modalWindow = {
                modalName: 'FriendsList',
                modalWidth: 350,
                userName: this.friendData.first_name + ' ' + this.friendData.last_name,
                friendsIds: this.commonFriends
            };
        }         
    }
}
</script>

<style lang="scss" scoped>
@import "~/assets/variables.scss";
.profile__sidebar-friend-wrapper {
    line-height: 1.1;
}
.profile__sidebar-friend {
    margin-bottom: 5px;
    cursor: pointer;
    position: relative;
    background-size: cover;
    background-position: center center;
    background-color: #f1f1f1;
    border: 1px solid #ececec;
    border-radius: 5px;


    &:after {
        content: "";
        display: block;
        padding-bottom: 100%;
    }

    &:hover .overlay {
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.1);
    }
}
h4 {
    margin-bottom: 2px;
    line-height: 1.1;
}
</style>