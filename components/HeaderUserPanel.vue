<template>
<div class="user-panel__wrapper">
    <div class="user-panel" @click="showMenu = !showMenu">
        <div class="user-panel__profile-img-wrapper hide-mobile">
            <UIProfileImg userID="me" imgBorderColor="#f1f1f1"/>
        </div>
        <div>
            <strong class="hide-name-mobile">{{wholeUsername}}</strong>
            <strong class="hide-name-desktop">{{shortenedUsername}}</strong>
            <div><i class="las la-coins"></i> Skóre: {{getPoints}}</div>
        </div>
    </div>
    <ul v-if="showMenu" class="user-panel__menu" @mouseleave="showMenu=!showMenu">
        <li><nuxt-link to="/profile/me">Přejít na svůj profil</nuxt-link></li>
        <li><nuxt-link to="/settings"><i class="las la-cog"></i> Nastavení</nuxt-link></li>
        <hr class="divider" />
        <li><nuxt-link to="/about" target="_blank"><i class="las la-info-circle"></i> O&nbsp;aplikaci</nuxt-link></li>
        <li @click="saveGame"><i class="las la-save"></i> Uložit hru</li>
        <li @click="logOut"><i class="las la-sign-out-alt"></i> Odhlásit se</li>
    </ul>    
</div>    
</template>

<script>
import axios from 'axios'
import UIProfileImg from '~/components/ui/UIProfileImg'
export default {
  components: {
      UIProfileImg
  },
  data() {
    return {
      showMenu: false
    }
  },
  computed: {
     getPoints() {
         return this.$store.state.loggedUser.points;
     },
     wholeUsername() {
         return this.$store.getters.getMyWholeName();
     },
     shortenedUsername() {
         return this.$store.getters.getMyWholeName("shortened");         
     }
  },
  methods: {
      saveGame() {
        let gameId = this.$store.state.loggedUser.game_id;
        axios.post(process.env.apiUrl + "/save/?game_id=" + gameId, this.$store.state)
                .then(response => console.log(response))  
        this.$toast(
            "Hra uložena.",
            { icon: 'las la-save' }            
            );  
        this.$store.state.modalWindow = {
            modalName: 'GameSaved'
        };                        
      },
      logOut() {
          localStorage.removeItem('gameID');
          this.$router.push('/login?logged-out');         
      }
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/variables.scss";
    .user-panel__wrapper {
        position: relative;
        display: inline-block;
    }
    .user-panel {
        cursor: pointer;
        display: flex;
        justify-content: flex-end;
    }
    .user-panel__profile-img-wrapper {
        margin-right: 10px;
    }
    ul.user-panel__menu {
        min-width: 150px;
        position: absolute;
        font-size: 14px;
        bottom: -15px;
        right: 0;
        z-index: 10;
        transform: translateY(100%);
        background: white;
        padding: 8px 14px;
        border-radius: 5px;
        box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
        &:before {
            content: " ";
            position: absolute;
            top: -12px; /* At the bottom of the tooltip */
            right: 7px;
            margin-left: -7px;
            border-width: 6px;
            border-style: solid;
            border-color: transparent transparent white transparent;      
        }
        li {
            display: block;
            list-style: none;
            white-space: nowrap;
            padding: 5px 0;

            a {
                color: #444444;
                text-decoration: none;
            }

            &:hover, & a:hover {
                cursor: pointer;
                color: $primary-color;
            }
        }
    } 
.hide-name-mobile {
    display: none;
    @media screen and (min-width: 700px) {
        display: inherit;
    }
}
.hide-name-desktop {
    @media screen and (min-width: 700px) {
        display: none;
    }    
}       
</style>