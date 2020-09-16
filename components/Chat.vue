<template>
  <div class="chat__wrapper" v-if="isActive">
      <div class="chat__header" @click="toggleChat()">
          <div class="chat__contact-info">
              <div class="profile-img" style="background-image: url(&quot;https://demo.hasthemes.com/adda-preview/adda/assets/images/profile/profile-small-37.jpg&quot;);"></div>
              <div class="chat__contact-name"><div>Jméno kontaktu</div></div>
          </div>
          <div class="chat__close-btn"><button @click="deactivateChat()"><i class="las la-times"></i></button></div>
      </div>
      <div class="chat__body" v-show="isChatOpened">
        <div class="chat__content">
            <div class="chat__message chat__message--outgoing"><div class="message__body" @mouseover="hoverOver" @mouseleave="hoverLeave">Já nevím co tu kecám<div class="message__time"><small>10:15</small></div></div></div>
            <div class="chat__message chat__message--incoming"><div class="profile-img" style="background-image: url(&quot;https://demo.hasthemes.com/adda-preview/adda/assets/images/profile/profile-small-37.jpg&quot;);"></div><div class="message__body">To nevím nevím nevím nevím prostě nevííííííííííím</div></div>
            <div class="chat__message chat__message--outgoing"><div class="message__body">Já nevím co tu kecám</div></div>
            <div class="chat__message chat__message--incoming"><div class="profile-img" style="background-image: url(&quot;https://demo.hasthemes.com/adda-preview/adda/assets/images/profile/profile-small-37.jpg&quot;);"></div><div class="message__body">To nevím nevím nevím nevím prostě nevííííííííííím</div></div>
        </div>
        <div class="chat__input"><input type="text" /><UIButton text="Odeslat" /></div>
      </div>
  </div>    
</template>

<script>
import UIButton from "~/components/ui/UIButton";
export default {
    components: {
        UIButton
    },
    props: {
        isActive: Boolean
    },
    data() {
        return {
            isChatOpened: true,
            isChatActive: true
        }
    },
    methods: {
        toggleChat() {
            this.isChatOpened = !this.isChatOpened;
            this.scrollToEnd();
        },
        activateChat() {
            this.isChatActive = true;
        },
        deactivateChat() {
            this.isChatActive = false;
        },
        scrollToEnd() {
            if(this.isChatOpened) {   	
                /*let chatBody = this.$el.querySelector(".chat__content");
                chatBody.scrollTop = chatBody.scrollHeight;*/
            }
        },
        hoverOver(event) {
            let el = event.target.querySelector('.message__time');
            console.log(el);
            el.style="display: block";
        },
        hoverLeave(event) {
            let el = event.target.querySelector('.message__time');
            el.style="display: none";
        }                                  
    },
    mounted() {
        this.scrollToEnd();
    }
}
</script>

<style lang="scss">
.chat__header {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    background: #d3d3d3;
    padding: 10px;
    box-shadow: 0px 1px 15px 0px rgba(51, 51, 51, 0.2);
    border-top-left-radius: 5px;
    border-top-right-radius: 5px; 

    .profile-img {
        width: 30px;
        height: 30px;
    }
}
.chat__contact-info {
    display: flex;
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
    max-height: 350px;
    overflow-y: scroll; 
}
.chat__input {
    padding: 10px;   
    input {
        width: 100%;
        border: 1px solid #000;
    }
}
.chat__message {
    display: flex;

    &--outgoing {
        justify-content: flex-end;
    }
    &--incoming {
        justify-content: flex-start;
    }    
    .message__body {
        max-width: 70%;
        padding: 10px;
        border-radius: 5px;
        margin-bottom: 10px;        
    }

    &--outgoing .message__body {
        background: orange;
        text-align: right;
    }
    &--incoming .message__body {
        background: silver;
    }  
    .profile-img {
        width: 25px;
        height: 25px;
        margin-right: 5px;
    }
    .message__time {
        display: none;
    }      
}
</style>