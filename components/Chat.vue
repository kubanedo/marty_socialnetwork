<template>
  <div class="chat__wrapper" v-if="isActive">
      <div class="chat__header" @click="toggleChat()">
          <div class="chat__contact-info">
              <UIProfileImg imgURL="https://demo.hasthemes.com/adda-preview/adda/assets/images/profile/profile-small-37.jpg" status="1" imgSize="30" statusBorderColor="#d3d3d3" />
              <div class="chat__contact-name"><div>Jméno kontaktu</div></div>
          </div>
          <div class="chat__close-btn"><button @click="deactivateChat()"><i class="las la-times"></i></button></div>
      </div>
      <div class="chat__body" v-show="isChatMaximized">
        <div class="chat__content">
            <!--<div class="chat__message chat__message--outgoing"><div class="message__body" @mouseover="hoverOver" @mouseleave="hoverLeave">Já nevím co tu kecám<div class="message__time"><small>10:15</small></div></div></div> -->
            <div v-for="(message, index) in messages" :key="index" :class="'chat__message chat__message--' + ((message.userId == 0) ? 'outgoing' : 'incoming')">
                <UIProfileImg v-if="!message.userId == 0" class="mr-5" imgURL="https://demo.hasthemes.com/adda-preview/adda/assets/images/profile/profile-small-37.jpg" imgSize="25" />
                <div class="message__body">{{message.text}}</div>
            </div>
        </div>
        <div class="chat__input"><textarea v-model="newMessage" placeholder="Aa" @keyup.enter="sendMessage()"></textarea><UIButton text="Odeslat" @click.native="sendMessage()" /></div>
      </div>
  </div>    
</template>

<script>
import UIButton from "~/components/ui/UIButton";
import UIProfileImg from "~/components/ui/UIProfileImg";
export default {
    components: {
        UIButton,
        UIProfileImg
    },
    props: {
        isActive: Boolean
    },
    data() {
        return {
            isChatMaximized: true,
            newMessage: '',
            messages: [
                {
                    userId: 58,  
                    time: '14.9.2020',
                    text: 'Já nevím co tu kecám'  
                },
                {
                    userId: 0,  
                    time: '15.9.2020',
                    text: 'Prd kecáš'  
                }               
            ]
        }
    },
    methods: {
        toggleChat() {
            this.isChatMaximized = !this.isChatMaximized;
            this.scrollToEnd();
        },
        deactivateChat() {
            this.$store.state.isChatActive = false;
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
            /*let el = event.target.querySelector('.message__time');
            el.style="display: none";*/
        },
        sendMessage() {
            this.messages.push({
                userId: 0,
                time: '16.9.2019',
                text: this.newMessage
            });
            this.newMessage = '';
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
    display: flex;
    padding: 10px;   
    textarea {
        width: 100%;
        border: 1px solid grey;
        border-radius: 5px;
        margin-right: 10px;
        padding: 5px;
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
    }
    &--incoming .message__body {
        background: silver;
    }  
    .message__time {
        display: none;
    }      
}
.mr-5 {
    margin-right: 5px;
}
</style>