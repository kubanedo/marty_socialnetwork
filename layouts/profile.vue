<template>
  <div id="top">
    <Header /> 
    <Nuxt />        
    <ModalWindow v-if="modalData!==null && modalData.modalName" :modalData="modalData"/>
    <Chat v-if="chatContactId!==null" :contactId="chatContactId"/>
  </div>
</template>

<script>
import Chat from "~/components/Chat";
import DropdownWrapper from "~/components/dropdowns/DropdownWrapper";
import ModalWindow from '~/components/modals/ModalWindow';
import Header from "~/components/Header";
import Contacts from "~/components/Contacts";
import UIProfileImg from '~/components/ui/UIProfileImg'

export default {
  middleware: ['login'],
  components: {
     Chat,
     Header,
     DropdownWrapper,
     ModalWindow,
     Contacts,
     UIProfileImg     
  },
  computed: {
    wholeUsername() {
        return this.$store.getters.getMyWholeName;
    },
/*       state() {
        return this.$store.state;
    },        
    storeChats() {
        return (this.$store.state ? this.$store.state.chats : [{}]);
    },*/
    friendsCount() {
        return this.$store.state.loggedUser.friends.length
    },
    receivedFriendsReqCount() {
        return this.$store.state.pendingRecievedFriendReq.length
    },        
    savedPostsCount() {
        return this.$store.state.savedPosts.length;
    },     
    chatContactId() {
        return this.$store.state.openedChat;
    },
    modalData() {
        return this.$store.state.modalWindow;
    }    
  }   
}
</script>

<style lang="scss">
@import "~/assets/main.scss";
</style>
