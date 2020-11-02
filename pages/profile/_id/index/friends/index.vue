<template>
  <div class="grid">
      <FriendlistItem v-for="friend in allFriends" :key="friend.profile_id" :friendData="friend"  :profileName="profileName"/>
  </div>    
</template>

<script>
import FriendlistItem from '~/components/profile/FriendlistItem'
export default {
  components: {
    FriendlistItem
  },
  props: {
    allFriends: {
      type: Object
    },
    profileName: {
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
.grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
}
</style>