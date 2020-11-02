<template>
<div class="user-panel__wrapper">
    <div class="user-panel" @click="showMenu = !showMenu">
        <div class="user-panel__profile-img-wrapper">
            <UIProfileImg userID="me" imgBorderColor="#f1f1f1"/>
        </div>
        <div>
            <strong>{{wholeUsername}}</strong><br/>
            <i class="las la-coins"></i> Skóre: {{getPoints}}
        </div>
    </div>
    <ul v-if="showMenu" class="user-panel__menu" @mouseleave="showMenu=!showMenu">
        <li><nuxt-link to="/profile/me">Přejít na svůj profil</nuxt-link></li>
        <li>Nastavení</li>
        <hr>
        <li @click="saveGame">Uložit hru</li>
        <li><nuxt-link to="/login">Odhlásit se</nuxt-link></li>
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
         return this.$store.getters.getloggedUserWholeName;
     }
  },
  methods: {
      saveGame() {
            let gameId = this.$store.state.loggedUser.game_id;
            axios.post("https://jakubnedorost.cz/marty/api/save/?game_id=" + gameId, this.$store.state)
                    .then(response => console.log(response))  
          this.$toast.success("Hra uložena.");                
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
</style>