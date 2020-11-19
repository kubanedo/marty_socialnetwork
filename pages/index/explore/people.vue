<template>
  <div>
        <div class="card card--title">
            <h2>Objevte lidi #fejkbuku</h2>
        </div>
        <div class="card">
            <UILoadingContent v-if="!peopleLoaded" :title="false"/>
            <div class="grid" v-else>                        
                    <FriendlistItem v-for="(person, person_id) in peopleData" :key="person_id" :friendData="{...person, profile_id: person_id}"/>
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
            axios.get('https://jakubnedorost.cz/marty/api/?type=profiles')
                .then(response => {
                this.peopleData = {...response.data[0]};
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
.grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
}
</style>