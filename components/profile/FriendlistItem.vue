<template>
    <div class="friendlist-item">
        <div class="flex-column-center mr-10">
            <nuxt-link :to="'/profile/' + friendData.profile_id"><div @click="navigateAway()"><UiProfileImg :userID="friendData.profile_id" :imgSize="65"/></div></nuxt-link>
        </div>
        <div>
            <div class="friendlist-item-text">
                <nuxt-link :to="'/profile/' + friendData.profile_id" class="underline-hover"><strong  @click="navigateAway()">{{friendData.first_name + ' ' + friendData.last_name}}</strong></nuxt-link>
                <small v-if="commonFriendsCount > 0" @click="openCommonFriendsList" class="underline-hover">
                    {{commonFriendsCount}} společných přátel
                </small>
            </div>                
                <button v-if="friendWithMe" @click="changeConnection" class="friend-with-me"><i class="las la-check-circle"></i> Jste přáteli</button>
                <button v-else @click="changeConnection"><i class="las la-plus-circle"></i> Přidat do přátel</button>
        </div>
    </div>   
</template>

<script>
import UIProfileImg from '~/components/ui/UIProfileImg'
export default {
    props: {
        friendData: {
            type: Object
        }
    },
    components: {
        UIProfileImg
    },    
    computed: {
        friendWithMe() {
            return (this.$store.state.myFriends) ? this.$store.state.myFriends.includes(this.friendData.profile_id) : null;
        },
        commonFriends() {
            let result = [];
            let friendsOfUser = this.friendData.friends;
            if(this.$store.state.myFriends && friendsOfUser) {
                result = this.$store.state.myFriends.filter((item) => {
                    return friendsOfUser.indexOf(item) > -1;
                });
            }
            return result;
        },
        commonFriendsCount() {
            return this.commonFriends.length;
        }        
    },
    methods: {
      changeConnection() {
        this.$store.commit('changeConnection', {connection_type: 'person', profile_id: this.friendData.profile_id});
      },
        openCommonFriendsList() {
            this.$store.state.modalWindow = {
                modalName: 'FriendsList',
                modalWidth: 350,
                userName: this.friendData.first_name + ' ' + this.friendData.last_name,
                friendsIds: this.commonFriends
            };
        },
        navigateAway() {
            console.log('navigate')
            this.$emit('navigateAway');
        }       
    }      
}
</script>

<style lang="scss" scoped>
@import "~/assets/variables.scss";
.friendlist-item {
    display: flex;
    border-radius: 5px;
    padding: 5px;
    &:hover {
      background: #f7f7f7;
    }
}
.flex-column-center {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.mr-10 {
    margin-right: 10px;
}
.friendlist-item-text {
    line-height: 1.5;
    small {
        display: block;
    }
    margin-bottom: 5px;
}
button {
    padding: 3px 6px;
    border: 1px $primary-color solid;
    border-radius: 5px;
    color: $primary-color;
    font-size: 12px;
    &.friend-with-me, &:hover {
        background: $primary-color;  
        color: white;      
    }
            &:active {
                transform: scale(0.97);
            }     
}
</style>