<template>
    <div class="friendlist-item">
        <div class="flex-column-center mr-10">
            <nuxt-link :to="'/profile/' + friendData.profile_id"><div @click="navigateAway()"><UiProfileImg :userID="friendData.profile_id" :imgSize="65" imgBorderColor="#f1f1f1"/></div></nuxt-link>
        </div>
        <div>
            <div class="friendlist-item-text">
                <nuxt-link :to="'/profile/' + friendData.profile_id" class="underline-hover"><strong  @click="navigateAway()">{{friendData.first_name + ' ' + friendData.last_name}}</strong></nuxt-link>
                <small v-if="commonFriendsCount > 0" @click="openCommonFriendsList" class="underline-hover">
                    {{commonFriendsCount}} společných přátel
                </small>
            </div>
            <div v-if="friendData.profile_id!=='me'">                
                <button v-if="friendWithMe" @click="changeConnection" class="friend-with-me"><i class="las la-check-circle"></i> Jste přáteli</button>
                <button v-else-if="isPendingRequest" class="pending" disabled><i class="las la-clock"></i> Čeká na vyřízení</button>
                <button v-else @click="changeConnection"><i class="las la-plus-circle"></i> Přidat do přátel</button>
            </div> 
            <div v-else>
                <i><small>S uživatelem {{profileName}} jste přátelé.</small></i>
            </div>    
        </div>
    </div>   
</template>

<script>
import UIProfileImg from '~/components/ui/UIProfileImg'
export default {
    props: {
        friendData: {
            type: Object
        },
        profileName: {
            type: Object
        }        
    },
    components: {
        UIProfileImg
    },    
    computed: {
        friendWithMe() {
            return (this.$store.state.loggedUser.friends) ? this.$store.state.loggedUser.friends.includes(this.friendData.profile_id) : false;
        },
        isPendingRequest() {
            return (this.$store.state.loggedUser.pending_friend_requests) ? this.$store.state.loggedUser.pending_friend_requests.includes(this.friendData.profile_id) : false;
        },        
        commonFriends() {
            let result = [];
            let friendsOfUser = this.friendData.friends;
            if(this.$store.state.loggedUser.friends && friendsOfUser) {
                result = this.$store.state.loggedUser.friends.filter((item) => {
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
        this.$store.dispatch('waitForFriendRequestApproval', {
          connection_type: 'person', 
          profile_id: this.friendData.profile_id, 
          user_name: this.friendData.first_name + ' ' + this.friendData.last_name
          });          
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
    &.pending {
        font-weight: bold;
    }
            &:active {
                transform: scale(0.97);
            }     
}
</style>