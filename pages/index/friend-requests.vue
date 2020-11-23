<template>
  <div>
        <div class="card card--title">
            <h2>Nevyřízené žádosti o přátelství</h2>
        </div>    
        <div :class="'card' + (peopleLoaded && !peopleData.length ? ' text-center card--noshadow': '')"> 
            <UILoadingContent v-if="!peopleLoaded" :title="false"/>
            <div v-else-if="peopleLoaded && !peopleData.length">
                <div class="circle-icon">
                    <i class="las la-smile-wink"></i>
                </div>    
                Žádné nevyřízené žádosti o přátelství.
            </div>    
            <div class="grid" v-else>             
                    <FriendlistItem v-for="(person) in peopleData" :key="person.profile_id" :friendData="person"/>        
            </div>   
        </div>   
  </div>
</template>

<script>
import axios from 'axios'
import UILoadingContent from '~/components/ui/UILoadingContent'
import FriendlistItem from '~/components/profile/FriendlistItem'
export default {
    components: {
        UILoadingContent,
        FriendlistItem
    },
    data() {
        return {
            peopleData: [],
            peopleLoaded: false            
        }
    },
    computed: {
        pendingRequests() {
            return this.$store.state.pendingRecievedFriendReq;
        }
    },
    methods: {
        getPeopleData() { 
            let recievedFriendReq = this.pendingRequests;  
            if(Array.isArray(recievedFriendReq) && recievedFriendReq.length) {   
                axios.get(process.env.apiUrl + '/?type=profiles&profile_ids=' + recievedFriendReq.join())
                    .then(response => {
                    this.peopleData = [...response.data];
                    })
                    .catch(error => console.log(error))
                    .finally(() => {
                        this.peopleLoaded = true;
                    })
            }  else {
                this.peopleData = [];
                this.peopleLoaded = true;
            }        
        }        
    },
    watch: {
        pendingRequests() {
            this.getPeopleData();
        }
    },
    mounted() {
        this.getPeopleData();
    },
    head () {
            return {
                title: 'Lidé'
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