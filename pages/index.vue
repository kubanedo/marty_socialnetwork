<template>
      <div class="main-wrapper">
          <div class="container homepage-grid">
            <aside class="left-sidebar">
                <div class="card">

                    <div class="sidebarprofile__header-wrapper hide-mobile" style="background-image: url('http://jakubnedorost.cz/marty/images/profiles/me/cover.jpg');">
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
                    <div v-if="receivedFriendsReqCount > 0" class="mt-10"><nuxt-link to="/friend-requests">Nevyřízené žádosti o přátelství: {{receivedFriendsReqCount}}</nuxt-link></div>                   
                </div>  
                <div class="card menu-wrapper">
                    <nuxt-link to="/" class="menu-item">
                        <div class="menu-circle">
                            <i class="las la-home"></i>
                        </div>
                         <div>Hlavní stránka</div>
                    </nuxt-link>                    
                    <nuxt-link to="/explore/people" class="menu-item">
                        <div class="menu-circle">
                            <i class="las la-user-friends"></i>
                        </div>
                         <div>Lidé</div>
                    </nuxt-link>
                    <nuxt-link to="/explore/pages" class="menu-item">
                        <div class="menu-circle">
                            <i class="las la-flag"></i>
                        </div>                   
                         <div>Stránky</div>
                    </nuxt-link>
                    <nuxt-link to="/saved-posts" class="menu-item">
                        <div class="menu-circle">
                            <i class="las la-bookmark"></i>
                        </div>                     
                        <div>Uložené příspěvky<span v-if="savedPostsCount > 0"> ({{savedPostsCount}})</span></div>
                    </nuxt-link>
                </div> 
                <small class="hide-mobile">© 2020 <strong>#fejkbuk</strong> · <nuxt-link to="/about" target="_blank">O aplikaci</nuxt-link></small>                            
            </aside>
            <div class="main-content">
                <nuxt-child />
            </div>
            <aside class="right-sidebar">
                <div class="card">
                    <h3>Mé kontakty</h3>
                    <Contacts placement="sidebar"/>
                </div>
                <YouMayKnow />
                <YouMayLike />                                 
                <div class="card">
                    <h3>Reklama</h3>
                </div>                
            </aside>
          </div>
      </div>          
</template>

<script>
import Contacts from "~/components/Contacts";
import UIProfileImg from '~/components/ui/UIProfileImg';
import YouMayKnow from '~/components/YouMayKnow';
import YouMayLike from '~/components/YouMayLike';

export default {
  components: {
     Contacts,
     UIProfileImg,
     YouMayKnow,
     YouMayLike     
  },
  computed: {
    wholeUsername() {
        return this.$store.getters.getMyWholeName();
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
