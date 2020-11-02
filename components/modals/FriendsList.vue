<template>
  <div>
        <div class="friendlist__header">
            <h2 v-if="modalData.type='page'">Přátelé, kterým se líbí stránka <small>{{modalData.userName}}</small></h2>
            <h2 v-else>Společní přátelé<br/><small> s&nbsp;{{modalData.userName}}</small></h2>
            <div><UICloseBtn @click.native="closeWindow" /></div>
        </div>
        <div v-if="friendsLoaded" class="friendlist">
            <FriendlistItem v-for="friend in friendsData" :key="friend.profile_id" :friendData="friend" class="friendlist-item" @navigateAway="closeWindow"/>
        </div>
        <UILoadingContent v-else :title="false" />
  </div>
</template>

<script>
import axios from 'axios';
import UICloseBtn from "~/components/ui/UICloseBtn";
import FriendlistItem from '~/components/profile/FriendlistItem'
import UILoadingContent from '~/components/ui/UILoadingContent'
export default {
    components: {
        UICloseBtn,
        FriendlistItem,
        UILoadingContent
    },
    props: {
        modalData: {
            type: Object
        }
    },
    data() {
        return {
            friendsData: [],
            friendsLoaded: false
        }
    },
    methods: {
        closeWindow() {
            this.$emit('closeWindow');
        },
        getFriendsData() {
            let friends = this.modalData.friendsIds;
            axios.get('https://jakubnedorost.cz/marty/api/?type=profiles&profile_ids=' + friends.join())
                .then(response => {
                this.friendsData = [...response.data];
                this.friendsLoaded = true;
                })
                .catch(error => console.log(error))      
        }             
    },
    watch: {
        modalData() {
            this.getFriendsData();
        }
    },
    mounted() {
        this.getFriendsData();
    }
}
</script>

<style lang="scss" scoped>
@import "~/assets/variables.scss";
    .friendlist {
        max-height: 500px;
        overflow-y: auto;
    }
    h2 {
        font-size: 18px;
        line-height: 1.1;
    }
    .friendlist__header {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid $grey-color;
      padding-bottom: 10px;
      margin-bottom: 20px;
    }
    .friendlist-item {
        margin-bottom: 10px;
        &:last-child {
            margin-bottom: 0;
        }
    }
</style>