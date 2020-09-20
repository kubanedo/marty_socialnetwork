<template>
<div style="position: relative;">
    <div class="user-panel" @click="showMenu = !showMenu">
        <div class="user-panel__profile-img-wrapper">
            <UIProfileImg :imgURL="this.$store.state.loggedUser.profileImg" />
        </div>
        <div>
            <strong>{{wholeUsername}}</strong><br/>
            <i class="las la-coins"></i> Skóre: {{getPoints}}
        </div>
    </div>
    <div v-if="showMenu" class="user-panel__menu">
        <div class="card">
            Menu
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
    .user-panel {
        cursor: pointer;
        display: flex;
        justify-content: flex-end;
    }
    .user-panel__profile-img-wrapper {
        margin-right: 10px;
    }
    .user-panel__menu {
        position: absolute;
        transform: translateY(100%);
        bottom: 0;
        right: 0;
    }
</style>