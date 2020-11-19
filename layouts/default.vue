<template>
  <div id="top">
    <Header />
    <nuxt/>    
    <ModalWindow v-if="modalData!==null && modalData.modalName" :modalData="modalData"/>
    <Chat v-if="chatContactId!==null" :contactId="chatContactId"/>
  </div>
</template>

<script>
import Chat from "~/components/Chat";
import DropdownWrapper from "~/components/dropdowns/DropdownWrapper";
import ModalWindow from '~/components/modals/ModalWindow';
import Header from '~/components/Header';

export default {
  middleware: ['login'],
  components: {
     Header, 
     Chat,
     DropdownWrapper,
     ModalWindow   
  },
  computed: { 
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
