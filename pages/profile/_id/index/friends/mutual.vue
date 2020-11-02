<template>
  <div class="grid">
      <FriendlistItem v-for="friend in mutualFriends" :key="friend.profile_id" :friendData="friend"/>
  </div>    
</template>

<script>
import FriendlistItem from '~/components/profile/FriendlistItem'
export default {
  components: {
    FriendlistItem
  },
  props: {
    mutualFriends: {
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