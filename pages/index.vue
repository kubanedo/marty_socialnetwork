<template>
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

                    <div v-if="friendsCount > 0">Počet přátel: <nuxt-link :to="'/profile/me/friends'">{{friendsCount}}</nuxt-link></div>
                    <div v-if="receivedFriendsReqCount > 0" class="mt-10"><nuxt-link to="/friend-requests">Počet nevyřízených žádostí: {{receivedFriendsReqCount}}</nuxt-link></div>                   
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
                <nuxt-child />
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
</template>

<script>
import Contacts from "~/components/Contacts";
import UIProfileImg from '~/components/ui/UIProfileImg'

export default {
  components: {
     Contacts,
     UIProfileImg     
  },
  computed: {
    wholeUsername() {
        return this.$store.getters.getMyWholeName;
    },
    friendsCount() {
        return this.$store.state.loggedUser.friends.length
    },
    receivedFriendsReqCount() {
        return this.$store.state.pendingRecievedFriendReq.length
    },        
    savedPostsCount() {
        return this.$store.state.savedPosts.length;
    }   
  }   
}
</script>
