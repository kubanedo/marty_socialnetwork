<template>
<div style="position: relative;">
    <div class="user-panel" @click="showMenu = !showMenu">
        <div class="user-panel__profile-img-wrapper">
            <div class="profile-img" :style="{ backgroundImage: 'url(' + profileImg + ')' }"></div>
        </div>
        <div>
            <strong>{{wholeUsername}}</strong><br/>
            <i class="las la-coins"></i> Skóre: 100
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
export default {
  data() {
    return {
      wholeUsername: this.$store.state.loggedUser.firstName + ' ' + this.$store.state.loggedUser.lastName,  
      profileImg: 'https://demo.hasthemes.com/adda-preview/adda/assets/images/profile/profile-small-1.jpg',
      showMenu: false
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