<template>
    <div class="card" v-if="!allPagesLiked">
        <h3>Mohlo by se líbit</h3>
        <UILoadingContent v-if="loadingContent" :title="false" :numberOfLines="3" />
        <PagelistItem v-else v-for="notLikedPage in shuffledNotLikedPages" :key="notLikedPage.profile_id" :pageData="notLikedPage"/>
    </div>  
</template>

<script>
import axios from 'axios';
import PagelistItem from '~/components/profile/PagelistItem';
import UILoadingContent from '~/components/ui/UILoadingContent'
export default {
    components: {
        PagelistItem,
        UILoadingContent
    },
    data() {
        return {
            loadingContent: true,
            allPagesLiked: false,
            notLikedPagesData: []
        }
    },
    computed: {
        myLikedPages() {
            return this.$store.getters.getMyLikedPages;
        },
        shuffledNotLikedPages() {
            const shuffled = this.notLikedPagesData.sort(() => 0.5 - Math.random());
            return shuffled.slice(0, 3);
        }   
    },
    methods: {
        loadNotLikedPages() {
            this.notLikedPagesData = [];
            this.loadingContent = true;
            this.allPagesLiked = false;

        let likedPages = this.myLikedPages;
            axios.get('https://jakubnedorost.cz/marty/api/?type=profiles-basic&profile_type=pages&except_profile_ids=' + likedPages.join())
                        .then(response => {
                            let data = response.data;
                            console.log(data, 'data');
                            if(data!==null) {
                                data = Object.entries(data);
                                data.forEach((item) => {
                                        this.notLikedPagesData.push({...item[1], profile_id: item[0]})
                                })
                                console.log(this.notLikedPagesData)
                            } else {
                                this.allPagesLiked = true;
                            }
                            this.loadingContent = false;
                        })
                        .catch(error => console.log(error))
        }
    },
    watch: {
        myLikedPages() {
            this.loadNotLikedPages();
        }
    },
    mounted() {
        this.loadNotLikedPages();
    }
}
</script>

<style>

</style>