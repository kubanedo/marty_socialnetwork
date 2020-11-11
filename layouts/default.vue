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
      <div class="main-wrapper">
          <div class="container homepage-grid">
            <aside class="left-sidebar">
                <div class="card">

                    <div class="sidebarprofile__header-wrapper" style="background-image: url('http://jakubnedorost.cz/marty/images/profiles/me/cover.jpg');">
                        <div class="sidebarprofile__header">
                            <nuxt-link to="/profile/me">
                                <UIProfileImg userID="me" :imgSize="70" class="ui-profile-img" imgBorderColor="white"/>
                            </nuxt-link>
                            <nuxt-link to="/profile/me" class="underline-hover">
                                <h3>{{wholeUsername}}</h3>
                            </nuxt-link>                           
                        </div>
                    </div>

                    <span v-if="friendsCount > 0">Počet přátel: <nuxt-link :to="'/profile/me/friends'">{{friendsCount}}</nuxt-link></span><br/>
                    <span v-if="receivedFriendsReqCount > 0"><nuxt-link to="/friend-requests">Počet nevyřízených žádostí: {{receivedFriendsReqCount}}</nuxt-link></span>                   
                </div>  
                <div class="card">
                    <nuxt-link to="/" class="menu-item">
                        <div class="menu-circle">
                            <i class="las la-home"></i>
                        </div>
                         Hlavní stránka
                    </nuxt-link>                    
                    <nuxt-link to="/explore/people" class="menu-item">
                        <div class="menu-circle">
                            <i class="las la-user-friends"></i>
                        </div>
                         Lidé
                    </nuxt-link>
                    <nuxt-link to="/explore/pages" class="menu-item">
                        <div class="menu-circle">
                            <i class="las la-flag"></i>
                        </div>                   
                         Stránky
                    </nuxt-link>
                    <nuxt-link to="/saved-posts" class="menu-item">
                        <div class="menu-circle">
                            <i class="las la-bookmark"></i>
                        </div>                     
                        Uložené příspěvky<span v-if="savedPostsCount > 0"> ({{savedPostsCount}})</span>
                    </nuxt-link>
                </div>                             
            </aside>
            <div class="main-content">
                <Nuxt />
            </div>
            <aside class="right-sidebar">
                <div class="card">
                    <h3>Mé kontakty</h3>
                    <Contacts placement="sidebar"/>
                </div>
                <div class="card">
                    <h3>Reklamy</h3>
                </div>                
            </aside>
          </div>
      </div>          
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
