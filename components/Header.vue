<template>
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
</template>
<script>
import DropdownWrapper from '~/components/dropdowns/DropdownWrapper';
import HeaderUserPanel from '~/components/HeaderUserPanel';
export default {
  components: {
      HeaderUserPanel,
      DropdownWrapper
  },
  data() {
      return {
        unreadChatsCount: 0,
        unreadNotifCount: 0
      }
  }    
}
</script>
<style scoped>

</style>