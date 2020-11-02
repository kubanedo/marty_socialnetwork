<template>
<div>
  <LoadingChat v-if="isLoading"/>  
  <div v-else class="chat__wrapper" @click="resetNewIncomingMessagesCount()">
      <div :class="'chat__header' + ((newIncomingMessagesCount>0) ? ' blinking' : '')" @click="toggleChat()">
          <div class="chat__contact-info">
              <UIProfileImg :userID="contactId" :status="contactData.status" :imgSize="30" statusBorderColor="#d3d3d3" />
              <div class="chat__contact-name"><div>{{contactData.first_name + ' ' + contactData.last_name}}</div></div>
              <div class="chat__new-msg-count-wrapper"><div v-if="newIncomingMessagesCount>0" class="chat__new-msg-count">{{newIncomingMessagesCount}}</div></div>
          </div>
          <div class="chat__close-btn"><button @click="deactivateChat()"><i class="las la-times"></i></button></div>
      </div>
      <div class="chat__body" v-show="isChatMaximized">
        <div class="chat__content">
            <ChatMessage v-for="(message, index) in messages" :key="index" :message="message"/>
            <div v-if="!(Array.isArray(messages) && messages.length)" class="text-center"><small><i class="las la-envelope-open"></i> Zatím jste si nepsali.</small></div>
            <ChatTypingDots v-if="areTypingDotsActive" :contactName="contactData.first_name"/>
        </div>
        <div class="chat__prepared-messages" v-if="preparedMessages">
            <div v-if="showPreparedMessagesInput">
                <strong><small>Vyber odpověď:</small></strong><br/>
                <button 
                        v-for="(preparedMessage, index) in preparedMessages" :key="index"
                        @click="choosePreparedMessage(preparedMessage)">
                    {{preparedMessage.text}}
                </button>
            </div>
            <div v-else>
                <strong><i>Vyčkej na reakci ...</i></strong>
            </div>    
        </div>
        <div class="chat__input" v-else>
            <UIInput ref="addMessage" v-model="newMessage" placeholder="Aa" @keydown.enter.prevent.native="sendMessage()" />
            <UIButton text="Odeslat" @click.native="sendMessage()" />
        </div>
      </div>
  </div>
</div>      
</template>

<script>
import axios from 'axios'
import UIButton from "~/components/ui/UIButton";
import UIProfileImg from "~/components/ui/UIProfileImg";
import UIInput from "~/components/ui/UIInput";
import UILoader from "~/components/ui/UILoader";
import ChatMessage from "~/components/chat/ChatMessage";
import ChatTypingDots from "~/components/chat/ChatTypingDots";
import LoadingChat from "~/components/chat/LoadingChat";

import focusInput from '~/mixins/focusInput.js'

export default {
    mixins: [focusInput],    
    components: {
        UIButton,
        UIProfileImg,
        UIInput,
        UILoader,
        ChatMessage,
        ChatTypingDots
    },
    props: {
        contactId: String
    },
    data() {
        return {
            isLoading: true,
            contactData: {},
            isChatMaximized: true,
            areTypingDotsActive: false,
            newIncomingMessagesCount: 0,
            newMessage: '',
            messages: [],
            preparedMessages: null,
            showPreparedMessagesInput: true,
            incomingMsgTone: new Audio('swiftly.mp3')
        }
    },
    methods: {
        toggleChat() {
            this.isChatMaximized = !this.isChatMaximized;
            this.scrollToEnd();
        },
        deactivateChat() {
            this.$store.commit('closeChat');
            this.$destroy();
        },
        scrollToEnd() {
                /* bez timeoutu nescrolovalo úplně dolů */
                let vm = this;
                setTimeout(() => { 	
                    let chatBody = vm.$el.querySelector(".chat__content");
                    if(chatBody!==undefined) {
                        chatBody.scrollTop = chatBody.scrollHeight;
                    }
                },1);                
        },
        sendMessage() {
            if(this.newMessage) {
                let newMessageObj = {
                    userId: 'me',
                    time: Date.now(),
                    text: this.newMessage
                };
                this.messages.push(newMessageObj);
                this.updateChatInStore(newMessageObj, 'message');
                this.newMessage = '';
            }
        },
        getReply(reply) {
            const vm = this;
            const randomTime = (minTimeInSec, maxTimeInSecs) => { 
               let randomTime = Math.floor(Math.random() * maxTimeInSecs) * 1000;
               return (randomTime > (minTimeInSec * 1000)) ? randomTime : (minTimeInSec * 1000);
            }  
            let randomTimeBeforeTyping = randomTime(3, 7);  
            setTimeout(() => {
                vm.areTypingDotsActive=true;
                vm.scrollToEnd();
            }, randomTimeBeforeTyping);

            setTimeout(() => {
                vm.areTypingDotsActive=false;
                vm.showPreparedMessagesInput=true;
                let newMessageObj = {
                    userId: this.contactId,  
                    time: Date.now(),
                    text: reply  
                }
                vm.messages.push(newMessageObj);
                vm.updateChatInStore(newMessageObj, 'message');
                vm.newIncomingMessagesCount++;
                vm.updateChatInStore(vm.newIncomingMessagesCount, 'newMessagesCount');
                vm.incomingMsgTone.volume = 0.1;
                vm.incomingMsgTone.play();
            },randomTime(randomTimeBeforeTyping/1000, 15));
        },
        choosePreparedMessage(preparedMessage) {
            this.newMessage = preparedMessage.text;
            this.sendMessage();

            if(preparedMessage.incomingAnswer) {
                this.showPreparedMessagesInput = false;
                this.getReply(preparedMessage.incomingAnswer.text);
                let updatedPreparedMessages = preparedMessage.incomingAnswer.preparedMessages;
                this.preparedMessages = updatedPreparedMessages;
                this.updateChatInStore(updatedPreparedMessages, 'preparedMessages');
            } else {
                this.preparedMessages = null;
                this.updateChatInStore(null, 'preparedMessages');
            }
        },
        resetNewIncomingMessagesCount() {
            this.newIncomingMessagesCount = 0;
            this.updateChatInStore(0, 'newMessagesCount');
        },
        loadChatMessages() {
            axios.get('https://jakubnedorost.cz/marty/api/?type=messages&contact_id=' + this.contactId)
                .then(response => {
                    const chatData = response.data;
                    if(chatData) {
                        let messages = chatData.old_messages;
                        this.messages = (messages) ? [...messages] : [];

                        let preparedMessages = chatData.preparedMessages;
                        this.preparedMessages = (preparedMessages) ? [...preparedMessages] : null;
                    } else {
                        this.messages = [];
                        this.preparedMessages = null;
                    }

                    this.focusInput('addMessage');
                    this.scrollToEnd();
                })
                .catch(error => console.log(error))
                .finally(() => {
                    this.getChangesFromStore(); 
                    this.isLoading = false;
                })
        },
        updateChatInStore(value, type) {
            let chatData = {
                contact_id: this.contactId
            };
            if(type=='message') {
                chatData['newMessage'] = value;
            } else if(type=='newMessagesCount') {
                chatData['newMessagesCount'] = value;                
            } else {
                chatData['preparedMessagesUpdate'] = value;                 
            }
            this.$store.commit('updateChat', chatData);
        },
        getChangesFromStore() {
            let storeData = this.$store.state.chats[0][this.contactId];
            if(storeData!==undefined) {
                this.messages = [...this.messages, ...storeData.old_messages];
                this.preparedMessages = storeData.preparedMessages;
                if(storeData.new_messages_count) {
                    this.newIncomingMessagesCount = storeData.new_messages_count;
                } else {
                    this.newIncomingMessagesCount = 0;                
                }   
            }
        },
        getContactData() {
            axios.get('https://jakubnedorost.cz/marty/api/?type=profiles-basic&profile_id=' + this.contactId)
                .then(response => {
                    this.contactData = response.data;
                })
                .catch(error => console.log(error))
        }    
    },
    watch: {
        isActive() {
           /* při aktivování chatu, vždy maximalizuj */ 
           this.isChatMaximized=true;
           this.scrollToEnd();
        },
        contactId() {
           /* při změně uživatele chatu, vždy maximalizuj */ 
           this.isChatMaximized=true;
           /* a aktualizuj zprávy */
           this.loadChatMessages();
           this.getContactData();
           this.newIncomingMessagesCount = 0;
        },
        messages() {
            /* při aktualizaci zpráv */
            this.scrollToEnd();
        }
    },
    mounted() {
            this.loadChatMessages();  
            this.getContactData();        
    }
}
</script>

<style lang="scss" scoped>
@import "~/assets/variables.scss";
.chat__header {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    background: #d3d3d3;
    padding: 10px;
    box-shadow: 0px 1px 15px 0px rgba(51, 51, 51, 0.2);
    border-top-left-radius: 5px;
    border-top-right-radius: 5px; 

    &.blinking {
        color: white;
        animation: blinking-bg 1s infinite;
    }
}
@keyframes blinking-bg {
    0%, 49% {
        background-color: lighten($primary-color, 5%);
    }
    50%, 100% {
        background-color: lighten($primary-color, 2%);
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
    max-height: 280px;
    min-height: 200px;
    overflow-y: scroll; 
}
.chat__input {
    display: flex;
    padding: 10px;   
    textarea {
        margin-right: 10px;
    }
}
.chat__new-msg-count-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.chat__new-msg-count {
    background: red;
    color: white;
    border-radius: 50%;
    padding: 0 5px;
    font-size: 10px;
    margin-left: 5px;
}
.chat__prepared-messages {
    box-shadow: 0px 1px 15px 0px rgba(51, 51, 51, 0.2);
    padding: 5px;
    button {
        padding: 5px; 
        border: 1px solid grey; 
        margin-right: 5px; 
        border-radius: 10px;
    }
}
</style>