<template>
    <div class="friendbox">
        <div class="flex-column-center mr-5">
            <nuxt-link :to="'/profile/' + friendData.profile_id"><UiProfileImg :userID="friendData.profile_id"/></nuxt-link>
        </div>
        <div>
            <nuxt-link :to="'/profile/' + friendData.profile_id">{{friendData.first_name + ' ' + friendData.last_name}}</nuxt-link><br/>
            <button @click="changeConnection">
                <span v-if="friendWithMe">Jste přáteli</span>
                <span v-else>Přidat do přátel</span>
            </button>
            <small v-if="commonFriendsCount > 0">
                ({{commonFriendsCount}} společných přátel)
            </small>    
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
      }
    }      
}
</script>

<style lang="scss" scoped>
.friendbox {
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
.mr-5 {
    margin-right: 5px;
}
</style>