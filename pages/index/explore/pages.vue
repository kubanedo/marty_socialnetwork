<template>
  <div>
    <div class="card card--title">
        <h2>Objevte stránky #fejkbuku</h2>
    </div>      
    <div class="card">
        <UILoadingContent v-if="!pagesLoaded" :title="false"/>
        <div class="grid" v-else>                        
                <PagelistItem v-for="(page, page_id) in pagesData" :key="page_id" :pageData="{...page, profile_id: page_id}"/>
        </div>                
    </div>     
  </div>
</template>

<script>
import axios from 'axios'
import UILoadingContent from '~/components/ui/UILoadingContent'
import PagelistItem from '~/components/profile/PagelistItem'
export default {
    components: {
        UILoadingContent,
        PagelistItem
    },    
    data() {
        return {
            pagesData: {},
            pagesLoaded: false            
        }
    },
    methods: {
        getPagesData() {      
            axios.get('https://jakubnedorost.cz/marty/api/?type=profiles-basic&profile_type=pages')
                .then(response => {
                this.pagesData = {...response.data};
                this.pagesLoaded = true;
                })
                .catch(error => console.log(error))     
        }        
    },
    mounted() {
        this.getPagesData();
    },
    head () {
            return {
                title: 'Stránky'
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