<template>
  <div class="friends-pages__list">
      <FriendlistItem class="list-item" v-for="friend in mutualFriends" :key="friend.profile_id" :friendData="friend"/>
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
      type: Array
    }
  }
}
</script>

<style lang="scss" scoped>

</style>