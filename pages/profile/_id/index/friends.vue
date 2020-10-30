<template>
    <div class="card">
        <h2>Přátelé</h2>
        <ul class="friends-submenu">
            <nuxt-link :to="{hash:'#all'}" tag="li">Všichni přátelé</nuxt-link>
            <nuxt-link :to="{hash:'#mutual-friends'}" tag="li">Společní přátelé</nuxt-link>
        </ul>  
                    
        <div class="grid">
            <UILoadingContent v-if="loadingFriends"/>
            <FriendlistItem v-for="friend in friends" :key="friend.profile_id" :friendData="friend"/>
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
        }
    },
    data() {
        return {
            loadingFriends: true,
            friends: []
        }
    },
    methods: {
        getFriends() {
          let friends = this.profileData.friends;
          if(friends) {
            axios.get('https://jakubnedorost.cz/marty/api/?type=profiles&profile_ids=' + friends.join())
                .then(response => {
                this.friends = [...response.data];
                this.loadingFriends = false;
                })
                .catch(error => console.log(error))   
          }           
        }
    },
    watch: {
        profileData() {
            this.getFriends();
        }
    },
    mounted() {
        this.getFriends();
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
.grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
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