<template>
  <div>
      <div class="main-wrapper">
          <div class="container homepage-grid">
            <aside class="left-sidebar">
                            
            </aside>
            <div class="main-content">
                <div class="card">
                    <h2>Nevyřízené žádosti o přátelství</h2> <br/>

                    <UILoadingContent v-if="!peopleLoaded" :title="false"/>
                    <div v-else-if="peopleLoaded && !peopleData.length">
                        Žádné nevyřízené žádosti o přátelství :).
                    </div>    
                    <div class="grid" v-else>             
                            <FriendlistItem v-for="(person) in peopleData" :key="person.profile_id" :friendData="person"/>        
                    </div>   
                </div>
            </div>
            <aside class="right-sidebar">
               
            </aside>
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
    methods: {
        getPeopleData() { 
            let recievedFriendReq = this.$store.state.pendingRecievedFriendReq;  
            if(Array.isArray(recievedFriendReq) && recievedFriendReq.length) {   
                axios.get('https://jakubnedorost.cz/marty/api/?type=profiles&profile_ids=' + recievedFriendReq.join())
                    .then(response => {
                    this.peopleData = [...response.data];
                    })
                    .catch(error => console.log(error))
                    .finally(() => {
                        this.peopleLoaded = true;
                    })
            }  else {
                this.peopleLoaded = true;
            }        
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