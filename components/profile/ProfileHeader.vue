<template>
    <div class="profile__header-wrapper">
        <div class="profile__header" :style="{backgroundImage: 'url(http://jakubnedorost.cz/marty/images/profiles/' + normalizedUserId + '/cover.jpg)'}">
            <div class="container profile__header-grid">
              <div class="profile__header-img"><UIProfileImg :imgURL="'http://jakubnedorost.cz/marty/images/profiles/' + normalizedUserId + '/profileimg.jpg'" :imgSize="200" class="ui-profile-img"/></div>
              <div class="profile__header-name"><strong>{{profileData.first_name + " " + profileData.last_name}}</strong></div>
              <div class="profile__header-btns">
                <button v-if="profileData.userId!=='me'">
                  <div v-if="profileData.friends && (profileData.friends.indexOf('me') > -1)"><i class="las la-user-friends"></i> Jste přátelé</div>
                  <div v-else><i class="las la-plus"></i> Přidat do přátel</div>
                </button>
              </div>
            </div>
        </div> 
        <div class="profile__header-menu">
            <div class="container">
              <ul>
                <nuxt-link :to="'/profile/' + profileData.userId" tag="li">Hlavní stránka</nuxt-link>
                <nuxt-link :to="'/profile/' + profileData.userId + '/photos'" tag="li">Fotky</nuxt-link>
                <nuxt-link :to="'/profile/' + profileData.userId + '/friends'" tag="li">Přátelé</nuxt-link>              
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
    data() {
        return {
            normalizedUserId: this.profileData.userId.replace(".","_")
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
.profile__header-menu {
  padding-left: 230px;
  margin-bottom: 20px;
  background: white;

  .container {
    padding: 0;
  }

  ul {
    display: flex;
    padding-left: 0;
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
  grid-template-columns: 230px auto 200px;
  position: relative;
  z-index: 2;
}
</style>