<template>
<div>
  <div class="chat__wrapper">
      <div class="chat__header">
          <div class="chat__contact-info">
              <div class="user-img"></div>
              <div class="chat__contact-name"><div class="text-line text-line-name"></div></div>
          </div>
          <div class="chat__close-btn"><button @click="deactivateChat()"><i class="las la-times"></i></button></div>
      </div>
      <div class="chat__body">
        <div class="chat__content">
            <div class="chat__message chat__message--incoming">
                <div class="message__body"></div>
            </div>
            <div class="chat__message chat__message--outgoing">
                <div class="message__body message__body--2"></div>
            </div>
            <div class="chat__message chat__message--incoming">
                <div class="message__body message__body--1"></div>
            </div>
            <div class="chat__message chat__message--outgoing">
                <div class="message__body message__body--3"></div>
            </div>            
        </div>
        <div class="chat__input">

        </div>
      </div>
  </div>
</div>      
</template>

<script>
export default {
    methods: {
         deactivateChat() {
            this.$store.commit('closeChat');
            this.$destroy();
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~/assets/variables.scss";
@import "~/assets/loading-animation.scss";
.user-img {
    display: block;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    @extend .animated-background;
}
.text-line {
    height: 16px;
    width: 100%;
    @extend .animated-background;
}
.text-line-name {
    max-width: 150px;
}
.chat__message {
    display: flex;
}
.chat__message--incoming {
    justify-content: flex-end;
}
.chat__message--outgoing {
    justify-content: flex-start;
}
.message__body {
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
    height: 43px;
    width: 155px;
    @extend .animated-background;
}
.message__body--1 {
    width: 30px;
}
.message__body--2 {
    width: 100px;
}
.message__body--3 {
    width: 80px;
}
.chat__header {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    background: #d3d3d3;
    padding: 10px;
    box-shadow: 0px 1px 15px 0px rgba(51, 51, 51, 0.2);
    border-top-left-radius: 5px;
    border-top-right-radius: 5px; 
}
.chat__contact-info {
    display: flex;
    flex-grow: 1;
}
.chat__close-btn,
.chat__contact-name {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.chat__contact-name {
    font-weight: bold;
    padding-left: 5px;
        width: 50%;
}
.chat__wrapper {
    position: fixed;
    width: 328px;
    bottom: 0;
    right: 20px;
    z-index: 5;
   
}
.chat__body {
    background-color: white;
    box-shadow: 0px 1px 15px 0px rgba(51, 51, 51, 0.2);
}
.chat__content {
    padding: 10px;
    max-height: 280px;
    min-height: 200px;
    overflow-y: scroll; 
}
.chat__input {
    min-height: 65px;
    box-shadow: 0px 1px 15px 0px rgba(51, 51, 51, 0.2);
}
</style>