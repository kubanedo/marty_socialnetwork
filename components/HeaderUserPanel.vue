<template>
<div style="position: relative;">
    <div class="user-panel" @click="showMenu = !showMenu">
        <div class="user-panel__profile-img-wrapper">
            <UIProfileImg userID="me" />
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
        <li>Uložit hru</li>
        <li><nuxt-link to="/login">Odhlásit se</nuxt-link></li>
    </ul>    
</div>    
</template>

<script>
import UIProfileImg from '~/components/ui/UIProfileImg'
export default {
  components: {
      UIProfileImg
  },
  data() {
    return {
      wholeUsername: this.$store.getters.getloggedUserWholeName,  
      showMenu: false
    }
  },
  computed: {
     getPoints() {
         return this.$store.state.loggedUser.points;
     }
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/variables.scss";
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
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);

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