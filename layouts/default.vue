<template>
<div>
  <div class="loading-screen" v-if="isAppLoading">
    <div>
    <UILoader/>
    Načítám...
    </div>
  </div>
  <div v-else id="top">
    <Header />
    <nuxt/>    
    <ModalWindow v-if="modalData!==null && modalData.modalName" :modalData="modalData"/>
    <Chat v-if="chatContactId!==null" :contactId="chatContactId"/>
  </div>
</div>  
</template>

<script>
import Chat from "~/components/Chat";
import DropdownWrapper from "~/components/dropdowns/DropdownWrapper";
import ModalWindow from '~/components/modals/ModalWindow';
import Header from '~/components/Header';
import UILoader from '~/components/ui/UILoader'

export default {
  middleware: ['login'],
  components: {
     Header, 
     Chat,
     DropdownWrapper,
     ModalWindow,
     UILoader   
  },
  computed: { 
    isAppLoading() {
        return this.$store.state.loadingApp;
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
.loading-screen {
  width: 100vw;
  height: 100vh;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
