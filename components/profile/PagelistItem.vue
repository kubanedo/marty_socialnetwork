<template>
    <div class="pagelist-item">
        <div class="flex-column-center mr-10">
            <nuxt-link :to="'/page/' + pageData.profile_id"><div><UiProfileImg :userID="pageData.profile_id" :imgSize="65" imgBorderColor="#f1f1f1"/></div></nuxt-link>
        </div>
        <div>
            <div class="pagelist-item-text">
                <nuxt-link :to="'/page/' + pageData.profile_id" class="underline-hover"><strong>{{pageData.name}}</strong></nuxt-link>
            </div>                
                <button v-if="likedByMe" @click="changeConnection" class="liked-by-me"><i class="las la-heart"></i> Už se mi líbí</button>
                <button v-else @click="changeConnection"><i class="las la-heart"></i> To se mi líbí</button>
        </div>
    </div>   
</template>

<script>
import UIProfileImg from '~/components/ui/UIProfileImg'
export default {
    props: {
        pageData: {
            type: Object
        }
    },
    components: {
        UIProfileImg
    },    
    computed: {
        likedByMe() {
            return (this.$store.state.loggedUser.liked_pages) ? this.$store.state.loggedUser.liked_pages.includes(this.pageData.profile_id) : null;
        }        
    },
    methods: {
      changeConnection() {
        this.$store.commit('changeConnection', {connection_type: 'page', profile_id: this.pageData.profile_id});
      }      
    }      
}
</script>

<style lang="scss" scoped>
@import "~/assets/variables.scss";
.pagelist-item {
    display: flex;
    border-radius: 5px;
    padding: 5px;
    &:hover {
      background: #f7f7f7;
    }
}
.flex-column-center {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.mr-10 {
    margin-right: 10px;
}
.pagelist-item-text {
    line-height: 1.5;
    small {
        display: block;
    }
    margin-bottom: 5px;
}
button {
    padding: 3px 6px;
    border: 1px $like-color solid;
    border-radius: 5px;
    color: $like-color;
    font-size: 12px;
    &.liked-by-me, &:hover {
        background: $like-color;  
        color: white;      
    }
            &:active {
                transform: scale(0.97);
            }     
}
</style>