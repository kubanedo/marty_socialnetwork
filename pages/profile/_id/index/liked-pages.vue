<template>
    <div class="card">
        <h2>Stránky, které se uživateli líbí</h2>
                    
        <div class="grid">
            <UILoadingContent v-if="loadingLikedPages"/>
            <FriendlistItem v-for="likedPage in likedPages" :key="likedPage.profile_id" :friendData="likedPage"/>
        </div>
    </div>   
</template>

<script>
import axios from 'axios';
import FriendlistItem from '~/components/profile/FriendlistItem'
import UILoadingContent from '~/components/ui/UILoadingContent'

export default {
    components: {
        FriendlistItem,
        UILoadingContent
    },
    props: {
        profileData: {
            type: Object
        }
    },
    data() {
        return {
            loadingLikedPages: true,
            likedPages: []
        }
    },
    methods: {
        getLikedPages() {
          let likedPages = this.profileData.liked_pages;
          if(likedPages) {
            axios.get('https://jakubnedorost.cz/marty/api/?type=pages&profile_ids=' + likedPages.join())
                .then(response => {
                this.likedPages = [...response.data];
                this.loadingLikedPages = false;
                })
                .catch(error => console.log(error))   
          }           
        }
    },
    watch: {
        profileData() {
            this.getLikedPages();
        }
    },
    mounted() {
        this.getLikedPages();
    },
    head () {
            return {
                title: "Oblíbené stránky uživatele " + ((this.profileData.first_name) ? (this.profileData.first_name + ' ' + this.profileData.last_name) : this.$route.params.id)
            }
    }    
}
</script>

<style lang="scss" scoped>
@import "~/assets/variables.scss";
h2 {
    margin-bottom: 10px;
}
.grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
}
ul.friends-submenu {
    display: inline-flex;
    list-style: none;
    margin-bottom: 20px;

    li {
        cursor: pointer;
        padding: 5px 10px;
        border-bottom: 4px solid white;

      &.nuxt-link-exact-active {
        color: $primary-color;
        border-bottom: 4px solid $primary-color;
      }        
    }
}
</style>