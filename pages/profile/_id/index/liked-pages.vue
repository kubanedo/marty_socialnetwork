<template>
    <div class="card">
        <h2>To se mi líbí</h2>
        <div class="grid">
            <FriendBox v-for="friend in friends" :key="friend.profile_id" :friendData="friend"/>
        </div>
    </div>   
</template>

<script>
import axios from 'axios';
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
    data() {
        return {
            friends: []
        }
    },
    mounted() {
          let friends = this.profileData.friends;
          axios.get('https://jakubnedorost.cz/marty/api/?type=profiles&profile_ids=' + friends.join())
            .then(response => {
              this.friends = [...response.data]
            })
            .catch(error => console.log(error))
    },
    head () {
            return {
                title: "Přátelé uživatele " + ((this.profileData.first_name) ? (this.profileData.first_name + ' ' + this.profileData.last_name) : this.$route.params.id)
            }
    }    
}
</script>

<style lang="scss" scoped>
h2 {
    margin-bottom: 10px;
}
.grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
}
</style>