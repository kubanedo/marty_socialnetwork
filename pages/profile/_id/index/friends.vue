<template>
    <div class="card">
        <h2>Přátelé</h2>
        <ul class="friends-submenu" v-if="commonFriendsCount > 0">
            <nuxt-link :to="'/profile/' + profileData.userId + '/friends'" tag="li">Všichni přátelé</nuxt-link>
            <nuxt-link :to="'/profile/' + profileData.userId + '/friends/mutual'" tag="li">Společní přátelé ({{commonFriendsCount}})</nuxt-link>
        </ul>  
                    
        <div>
            <nuxt-child :allFriends="friendsData" :mutualFriends="commonFriendsData" :profileName="profileData.first_name + ' ' + profileData.last_name" />
        </div>
    </div>   
</template>

<script>
import axios from 'axios';
import FriendlistItem from '~/components/profile/FriendlistItem'
import UILoadingContent from '~/components/ui/UILoadingContent'

export default {
    components: {
        FriendlistItem,
        UILoadingContent
    },
    props: {
        profileData: {
            type: Object
        },
        friendsData: {
            type: Object
        }
    },
    data() {
        return {
            mutualFriendsData: []
        }
    },
    computed: {
        commonFriends() {
            let result = [];
            if(this.$route.params.id!=="me") {
                let friendsOfUser = this.profileData.friends;
                if(this.$store.state.loggedUser.friends && friendsOfUser) {
                    result = this.$store.state.loggedUser.friends.filter((item) => {
                        return friendsOfUser.indexOf(item) > -1;
                    });
                }
            }
            return result;
        },
        commonFriendsCount() {
            return this.commonFriends.length;
        },
        commonFriendsData() {
            return this.friendsData.filter((item) => {
                return (this.commonFriends.indexOf(item.profile_id) > -1)
            });
        }         
    },
    head () {
            return {
                title: "Přátelé uživatele " + ((this.profileData.first_name) ? (this.profileData.first_name + ' ' + this.profileData.last_name) : this.$route.params.id)
            }
    }    
}
</script>

<style lang="scss" scoped>
@import "~/assets/variables.scss";
h2 {
    margin-bottom: 10px;
}
ul.friends-submenu {
    display: inline-flex;
    list-style: none;
    margin-bottom: 20px;

    li {
        cursor: pointer;
        padding: 5px 10px;
        border-bottom: 4px solid white;

      &.nuxt-link-exact-active {
        color: $primary-color;
        border-bottom: 4px solid $primary-color;
      }        
    }
}
</style>