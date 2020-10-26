<template>
    <div class="card">
        <h2>Přátelé</h2>
        {{profileData}}
        <FriendBox v-for="item in 3" :key="item" />
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
    layout: 'profile'
}
</script>

<style>

</style>