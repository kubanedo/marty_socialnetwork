<template>
  <div class="chat__wrapper">
      <div class="chat__header" @click="toggleChat()">Jméno kontaktu</div>
      <div class="chat__body" v-if="isChatOpened">
        <div class="chat__content">textiky</div>
        <div class="chat__input"><input type="text" /></div>
      </div>
  </div>    
</template>

<script>
export default {
    data() {
        return {
            isChatOpened: false
        }
    },
    methods: {
        toggleChat() {
            this.isChatOpened = !this.isChatOpened;
        }
    }
}
</script>

<style>
.chat__header {
    background: #d3d3d3;
    padding: 5px;
}
.chat__wrapper {
    background-color: white;
    position: fixed;
    width: 328px;
    bottom: 0;
    right: 20px;
    z-index: 5;
}
</style>