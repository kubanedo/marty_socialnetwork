<template>
    <div class="card">
        <h2>Přátelé</h2>
        <FriendBox v-for="friend in profileData.friends" :key="friend" :friendId="friend"/>
    </div>   
</template>

<script>
import FriendBox from '~/components/profile/FriendBox'
export default {
    components: {
        FriendBox
    },
    props: {
        profileData: {
            type: Object
        }
    },
    head () {
            return {
                title: "Přátelé uživatele " + ((this.profileData.first_name) ? (this.profileData.first_name + ' ' + this.profileData.last_name) : this.$route.params.id)
            }
    }    
}
</script>

<style>

</style>