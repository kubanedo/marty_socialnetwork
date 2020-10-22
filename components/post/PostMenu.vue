<template>
  <div class="post__menu">
    <button @click="showMenu=!showMenu"><i class="las la-ellipsis-v"></i></button>
    <div v-if="showMenu" v-click-outside="closeMenu">
        <ul v-if="postedBy=='me'">
            <li @click="editPost"><i class="las la-edit"></i> Upravit příspěvek</li>
            <li @click="deletePost"><i class="las la-trash"></i> Smazat příspěvek</li>                    
        </ul>    
        <ul v-else>
            <li @click="savePost"><i class="las la-bookmark"></i> {{isSaved ? 'Odstranit z uložených' : 'Uložit'}}</li>
            <li @click="reportPost"><i class="las la-exclamation-triangle"></i> Nahlásit příspěvek</li>                    
        </ul>
    </div>    
  </div>
</template>

<script>
export default {
    props: {
        postedBy: String,
        postID: String
    },
    data() {
        return {
            showMenu: false,
            isSaved: false
        }
    },
    methods: {
        closeMenu() {
            this.showMenu=false;
        },
        deletePost() {
            this.$emit('isDeleted') 
            this.$store.commit('deletePost', this.postID);
            this.$toast("Příspěvek smazán.");
        },
        editPost() {
            this.$emit('editPost') 
        },
        savePost() {
            this.isSaved = !this.isSaved;
            this.$store.commit('savePost', this.postID); 
        },
        reportPost() {
            this.$store.state.modalWindow = {
                modalName: 'ReportPost'
            };
            this.$store.commit('reportPost', this.postID);            
        }                
    }
}
</script>

<style scoped lang="scss">
@import "~/assets/variables.scss";
.post__menu {
    position: relative;
}
ul {
    min-width: 150px;
    position: absolute;
    font-size: 14px;
    bottom: -3px;
    right: 0;
    border-radius: 5px;
    z-index: 10;
    transform: translateY(100%);
    background: white;
    padding: 8px 14px;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);

    &:before {
        content: " ";
        position: absolute;
        top: -12px; /* At the bottom of the tooltip */
        right: 7px;
        margin-left: -7px;
        border-width: 6px;
        border-style: solid;
        border-color: transparent transparent white transparent;      
    }

    li {
        display: block;
        list-style: none;
        white-space: nowrap;
        padding: 5px 0;

        &:hover {
            cursor: pointer;
            color: $primary-color;
        }
    }
}
</style>