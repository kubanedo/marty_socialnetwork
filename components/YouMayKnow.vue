<template>
    <div class="card" v-if="!allPeopleConnected">
        <h3>Koho možná znáte</h3>
        <UILoadingContent v-if="loadingContent" :title="false" :numberOfLines="3" />
        <FriendlistItem v-else v-for="unconnectedPerson in shuffledUnconnectedPeople" :key="unconnectedPerson.profile_id" :friendData="unconnectedPerson"/>
    </div>  
</template>

<script>
import axios from 'axios';
import FriendlistItem from '~/components/profile/FriendlistItem';
import UILoadingContent from '~/components/ui/UILoadingContent'
export default {
    components: {
        FriendlistItem,
        UILoadingContent
    },
    data() {
        return {
            loadingContent: true,
            allPeopleConnected: false,
            unconnectedPeopleData: []
        }
    },
    computed: {
        myFriends() {
            return this.$store.getters.getMyFriends;
        },
        shuffledUnconnectedPeople() {
            const shuffled = this.unconnectedPeopleData.sort(() => 0.5 - Math.random());
            return shuffled.slice(0, 3);
        }   
    },
    methods: {
        loadUnconnectedPersons() {
            this.unconnectedPeopleData = [];
            this.loadingContent = true;
            this.allPeopleConnected = false;

        let friends = this.myFriends;
        console.log('https://jakubnedorost.cz/marty/api/?type=profiles-basic&profile_type=people&except_profile_ids=' + friends.join());
            axios.get('https://jakubnedorost.cz/marty/api/?type=profiles-basic&profile_type=people&except_profile_ids=' + friends.join())
                        .then(response => {
                            let data = response.data;
                            console.log(data, 'data');
                            if(data!==null) {
                                data = Object.entries(data);
                                data.forEach((item) => {
                                        this.unconnectedPeopleData.push({...item[1], profile_id: item[0]})
                                })
                            } else {
                                this.allPeopleConnected = true;
                            }
                            this.loadingContent = false;
                        })
                        .catch(error => console.log(error))
        }
    },
    watch: {
        myFriends() {
            this.loadUnconnectedPersons();
        }
    },
    mounted() {
        this.loadUnconnectedPersons();
    }
}
</script>

<style>

</style>