<template>
  <div class="friends-pages__list">
      <FriendlistItem  class="list-item" v-for="friend in allFriends" :key="friend.profile_id" :friendData="friend"  :profileName="profileName"/>
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
      type: Array
    },
    profileName: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>

</style>