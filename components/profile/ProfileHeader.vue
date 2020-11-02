<template>
    <div class="profile__header-wrapper">
        <div class="profile__header" :style="{backgroundImage: 'url(http://jakubnedorost.cz/marty/images/profiles/' + profileData.userId + '/cover.jpg)'}">
            <div class="container profile__header-grid">
              <div class="profile__header-img"><UIProfileImg :userID="$route.params.id" :imgSize="180" class="ui-profile-img" /></div>
              <div class="profile__header-name"><strong>{{profileData.first_name + " " + profileData.last_name}}</strong></div>
              <div class="profile__header-btns">
                <button @click="changeConnection" v-if="profileData.userId!=='me'" :class="'profile__header-btn' + ((friendWithMe)?' friend-with-me':'')" :disabled="(isPendingRequest && !friendWithMe)">
                  <span v-if="friendWithMe && !isPendingRequest"><i class="las la-user-check"></i> Jste přátelé</span>
                  <span v-else-if="isPendingRequest && !friendWithMe" class="pending"><i class="las la-user-clock"></i> Čeká na vyřízení</span>
                  <span v-else><i class="las la-user-plus"></i> Přidat do přátel</span>
                </button>
              </div>
            </div>
        </div> 
        <div class="profile__header-menu">
            <div class="container">
              <ul>
                <nuxt-link :to="'/profile/' + profileData.userId" tag="li" class="main-page">Hlavní stránka</nuxt-link>
                <nuxt-link v-if="profileData.photos" :to="'/profile/' + profileData.userId + '/photos'" tag="li">Fotky</nuxt-link>
                <nuxt-link v-if="profileData.friends" :to="'/profile/' + profileData.userId + '/friends'" tag="li">Přátelé <small v-html="'(' + friendsCount + ')'" class="friend-count"></small></nuxt-link>
                <nuxt-link v-if="profileData.liked_pages" :to="'/profile/' + profileData.userId + '/liked-pages'" tag="li">To se mi líbí</nuxt-link>               
              </ul>    
            </div>
        </div>
    </div>   
</template>

<script>
import UIProfileImg from '~/components/ui/UIProfileImg'
export default {
    components: {
        UIProfileImg
    },
    props: {
        profileData: Object
    },
    computed: {
        friendWithMe() {
            return (this.$store.state.loggedUser.friends) ? this.$store.state.loggedUser.friends.includes(this.profileData.userId) : false;
        },
        isPendingRequest() {
            return (this.$store.state.loggedUser.pending_friend_requests) ? this.$store.state.loggedUser.pending_friend_requests.includes(this.profileData.userId) : false;
        },
        friendsCount() {
           return (this.friendWithMe) ? this.profileData.friends.length + 1 : this.profileData.friends.length;
        }
    },
    methods: {
      changeConnection() {
        this.$store.dispatch('waitForFriendRequestApproval', {
          connection_type: 'person', 
          profile_id: this.profileData.userId, 
          user_name: this.profileData.first_name + " " + this.profileData.last_name
          });
      }
    }        
}
</script>

<style lang="scss" scoped>
@import "~/assets/variables.scss";
@import "~/assets/profile-header.scss";
.profile__header-btn {
  background: #f7f7f7;
  color: black;
  border-radius: 5px;
  padding: 5px 10px;
  margin-bottom: 10px;
  .pending {
    color: $primary-color;
    font-weight: bold;
  }
  i {
    position: relative;
    top: 1.5px;
    font-size: 18px;

  }
  &.friend-with-me {
    background: $primary-color;
    color: white; 
      &:hover:not([disabled]) {
        background: darken($primary-color, 5);
      } 
  }
            &:hover:not([disabled]) {
              background: darken(#f7f7f7, 5);
            }
            &:active:not([disabled]) {
                transform: scale(0.97);
            }  
}
</style>