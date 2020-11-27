<template>
  <div class="explore">
        <div class="card card--title">
            <h2>Objevte lidi #fejkbuku</h2>
        </div>
        <div class="card">
            <UILoadingContent v-if="!peopleLoaded" :title="false"/>
            <div class="explore__list" v-else>                        
                    <FriendlistItem class="list-item" v-for="(person, person_id) in peopleData" :key="person_id" :friendData="{...person, profile_id: person_id}"/>
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
            peopleData: {},
            peopleLoaded: false            
        }
    },
    methods: {
        getPeopleData() {      
            axios.get(process.env.apiUrl + '/?type=profiles-basic&profile_type=people')
                .then(response => {
                this.peopleData = {...response.data};
                })
                .catch(error => console.log(error))
                .finally(() => {
                    this.peopleLoaded = true;
                })     
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

</style>