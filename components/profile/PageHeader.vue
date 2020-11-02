<template>
    <div class="profile__header-wrapper">
        <div class="profile__header" :style="{backgroundImage: 'url(http://jakubnedorost.cz/marty/images/profiles/' + profileData.userId + '/cover.jpg)'}">
            <div class="container profile__header-grid">
              <div class="profile__header-img"><UIProfileImg :userID="profileData.profile_id" :imgSize="180" class="ui-profile-img" /></div>
              <div class="profile__header-name"><div><strong>{{profileData.name}}</strong> <span v-if="is_certified" class="certified"><i class="lar la-check-circle"></i></span></div></div>
              <div class="profile__header-btns">
                <button @click="changeConnection" :class="'profile__header-btn' + ((likedByMe)?' liked-by-me':'')">
                  <span v-if="likedByMe"><i class="las la-heart"></i> Už se mi líbí</span>
                  <span v-else><i class="lar la-heart"></i> To se mi líbí</span>
                </button>
              </div>
            </div>
        </div> 
        <div class="profile__header-menu">
            <div class="container">
              <ul>
                <nuxt-link :to="'/page/' + profileData.userId" tag="li" class="main-page">Hlavní stránka</nuxt-link>
                <nuxt-link v-if="profileData.photos" :to="'/page/' + profileData.userId + '/photos'" tag="li">Fotky</nuxt-link>             
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
        profileData: Object,
        is_certified: Boolean
    },
    computed: {
        likedByMe() {
            return (this.$store.state.loggedUser.liked_pages) ? this.$store.state.loggedUser.liked_pages.includes(this.profileData.userId) : false;
        }
    },
    methods: {
      changeConnection() {
        this.$store.commit('changeConnection', {
          connection_type: 'page',
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
  i {
    position: relative;
    top: 1.5px;
    font-size: 18px;

  }
  &.liked-by-me {
    background: $like-color;
    color: white; 
      &:hover:not([disabled]) {
        background: darken($like-color, 5);
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