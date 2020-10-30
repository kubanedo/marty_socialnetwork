<template>
    <div class="profile__header-wrapper">
        <div class="profile__header" :style="{backgroundImage: 'url(http://jakubnedorost.cz/marty/images/profiles/' + profileData.userId + '/cover.jpg)'}">
            <div class="container profile__header-grid">
              <div class="profile__header-img"><UIProfileImg :userID="profileData.profile_id" :imgSize="180" class="ui-profile-img" /></div>
              <div class="profile__header-name"><strong>{{profileData.first_name + " " + profileData.last_name}}</strong></div>
              <div class="profile__header-btns">
                <button @click="changeConnection" v-if="profileData.userId!=='me'" :class="'profile__header-btn' + ((friendWithMe)?' friend-with-me':'')">
                  <span v-if="friendWithMe"><i class="las la-user-check"></i> Jste přátelé</span>
                  <span v-else-if="isPendingRequest" class="pending"><i class="las la-user-clock"></i> Čeká na vyřízení</span>
                  <span v-else><i class="las la-user-plus"></i> Přidat do přátel</span>
                </button>
              </div>
            </div>
        </div> 
        <div class="profile__header-menu">
            <div class="container">
              <ul>
                <nuxt-link :to="'/profile/' + profileData.userId" tag="li">Hlavní stránka</nuxt-link>
                <nuxt-link v-if="profileData.photos" :to="'/profile/' + profileData.userId + '/photos'" tag="li">Fotky</nuxt-link>
                <nuxt-link v-if="profileData.friends" :to="'/profile/' + profileData.userId + '/friends'" tag="li">Přátelé <small v-html="'(' + profileData.friends.length + ')'" class="friend-count"></small></nuxt-link>
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
            return (this.$store.state.myFriends) ? this.$store.state.myFriends.includes(this.profileData.userId) : null;
        },
        isPendingRequest() {
            return (this.$store.state.myPendingFriendRequests) ? this.$store.state.myPendingFriendRequests.includes(this.profileData.userId) : null;
        }
    },
    methods: {
      changeConnection() {
        this.$store.dispatch('waitForFriendRequestApproval', {
          connection_type: 'person', 
          profile_id: this.profileData.userId, 
          user_name: this.profileData.first_name + " " + this.profileData.last_name
          });
        /*this.$store.commit('changeConnection', {connection_type: 'person', profile_id: this.profileData.userId});*/
      }
    }        
}
</script>

<style lang="scss" scoped>
@import "~/assets/variables.scss";

.profile__header {
  position: relative;
  background-color: grey;
  background-size: cover;
  background-position: center center;

   &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: -webkit-gradient(linear, left bottom, left top, from(rgba(0, 0, 0, 0.75)), color-stop(50%, rgba(0, 0, 0, 0)));
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0) 50%);     
   }
}
.profile__header-wrapper {
  position: relative;
  max-width: 1040px;
  width: 95%;
  margin: 0 auto;
  border-radius: 5px;
  margin-bottom: 30px;
  box-shadow: 0px 1px 15px 0px rgba(51, 51, 51, 0.2);
}
.profile__header-menu {
  position: relative;
  margin-bottom: 20px;
  background: white;
    border-radius: 5px;

  .container {
    max-width: 1040px;
    margin: 0 auto;
    padding: 0;
  }

  ul {
    position: relative;
    left: 220px;    
    display: inline-flex;
    margin-bottom: 0;
    list-style: none; 
    
    li {
      display: block;
      cursor: pointer;
      padding: 10px 20px;
      padding-bottom: 14px;
      border-top: 4px solid white;

      &.nuxt-link-exact-active {
        color: $primary-color;
        border-top: 4px solid $primary-color;
      }
    }
    small.friend-count {
      position: relative;
      top: -1px;
    }
  }
}
.profile__header-img, .profile__header-name, .profile__header-btns {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.profile__header-name {
  color: white;
  font-size: 24px;
}
.profile__header-btns {
  color: white;
}
.profile__header-img {
  margin-bottom: -50px;
  .ui-profile-img {
    width: 200px; 
    height: 200px;
    border: 5px solid white;
  }
}
.profile__header-grid {
  display: grid;
  min-height: 280px;
  grid-template-columns: 210px auto 180px;
  position: relative;
  z-index: 2;
}
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
      &:hover {
        background: darken($primary-color, 5);
      } 
  }
            &:hover {
              background: darken(#f7f7f7, 5);
            }
            &:active {
                transform: scale(0.97);
            }  
}
</style>