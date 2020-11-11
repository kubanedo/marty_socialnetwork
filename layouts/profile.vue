<template>
  <div id="top">
      <header>
          <div class="container">
            <nav class="header__nav">                 
                <ul>
                    <li><DropdownWrapper dropdownName="Messages" @unreadCount="unreadChatsCount = $event"><button><i class="las la-sms"></i><br/> Zprávy <span class="count" v-if="unreadChatsCount > 0">{{unreadChatsCount}}</span></button></DropdownWrapper></li> 
                    <li><DropdownWrapper dropdownName="Notifications" @unreadCount="unreadNotifCount = $event"><button><i class="las la-bell"></i><br/>  Upozornění <span class="count"  v-if="unreadNotifCount > 0">{{unreadNotifCount}}</span></button></DropdownWrapper></li>                    
                </ul>
            </nav>
            <div class="header__logo-wrapper">
                <nuxt-link to="/"><h1>#fejkbuk</h1></nuxt-link>
            </div>
            <div class="header__user-panel">
                <HeaderUserPanel />
            </div>            
          </div>     
      </header> 
    <Nuxt />        
    <ModalWindow v-if="modalData!==null && modalData.modalName" :modalData="modalData"/>
    <Chat v-if="chatContactId!==null" :contactId="chatContactId"/>
  </div>
</template>

<script>
import Chat from "~/components/Chat";
import DropdownWrapper from "~/components/dropdowns/DropdownWrapper";
import ModalWindow from '~/components/modals/ModalWindow';

import Contacts from "~/components/Contacts";
import UIProfileImg from '~/components/ui/UIProfileImg'

export default {
  middleware: ['login'],
  components: {
     Chat,
     DropdownWrapper,
     ModalWindow,
     Contacts,
     UIProfileImg     
  },
  data() {
      return {
        unreadChatsCount: 0,
        unreadNotifCount: 0
      }
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
