<template>
  <div class="chat__wrapper" v-if="isActive" @click="resetNewIncomingMessagesCount()">
      <div :class="'chat__header' + ((newIncomingMessagesCount>0) ? ' blinking' : '')" @click="toggleChat()">
          <div class="chat__contact-info">
              <UIProfileImg imgURL="https://demo.hasthemes.com/adda-preview/adda/assets/images/profile/profile-small-37.jpg" :status="1" :imgSize="30" statusBorderColor="#d3d3d3" />
              <div class="chat__contact-name"><div>Jméno kontaktu</div></div>
              <div class="chat__new-msg-count-wrapper"><div v-if="newIncomingMessagesCount>0" class="chat__new-msg-count">{{newIncomingMessagesCount}}</div></div>
          </div>
          <div class="chat__close-btn"><button @click="deactivateChat()"><i class="las la-times"></i></button></div>
      </div>
      <div class="chat__body" v-show="isChatMaximized">
        <div class="chat__content">
            <ChatMessage v-for="(message, index) in messages" :key="index" :message="message"/>
            <ChatTypingDots v-if="areTypingDotsActive" contactName="Jméno kontaktu"/>
        </div>
        <div class="chat__prepared-messages" style="padding: 5px;" v-if="preparedMessages">
            <div v-if="showPreparedMessagesInput">
                <small>Vyber odpověď:</small><br/>
                <button 
                        v-for="(preparedMessage, index) in preparedMessages" :key="index"
                        @click="choosePreparedMessage(preparedMessage)">
                    {{preparedMessage.text}}
                </button>
            </div>
            <div v-else>
                <i>Vyčkej na reakci ...</i>
            </div>    
        </div>
        <div class="chat__input" v-else><textarea v-model="newMessage" placeholder="Aa" @keydown.enter.prevent="sendMessage()"></textarea><UIButton text="Odeslat" @click.native="sendMessage()" /></div>
      </div>
  </div>    
</template>

<script>
import UIButton from "~/components/ui/UIButton";
import UIProfileImg from "~/components/ui/UIProfileImg";
import ChatMessage from "~/components/chat/ChatMessage";
import ChatTypingDots from "~/components/chat/ChatTypingDots";
export default {
    components: {
        UIButton,
        UIProfileImg,
        ChatMessage,
        ChatTypingDots
    },
    props: {
        isActive: Boolean
    },
    data() {
        return {
            chatUserId: 58,
            isChatMaximized: true,
            areTypingDotsActive: false,
            newIncomingMessagesCount: 0,
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
                },
                {
                    userId: 58,  
                    time: '15.9.2020',
                    text: 'Jak se vede?'  
                } 
            ],
            preparedMessages: [
                {
                    text: "My se známe?",
                    incomingAnswer: {
                        text: 'Ano, nepamatuješ se?',
                        preparedMessages: [
                            {
                                text: "Ne",
                                incomingAnswer: {
                                    text: 'Potkali jsme se přece na oslavě Martinových narozenin.',
                                    preparedMessages: [
                                        {
                                            text: "To není možné. Já jsem tam nebyl."
                                        }
                                    ]
                                }
                            },
                            {
                                text: "Ano"
                            }
                        ]
                    }
                },
                {
                    text: "Mám se dobře, díky a ty?"
                }                
            ],
        showPreparedMessagesInput: true
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
            if(this.isActive) { 
                /* bez timeoutu nescrolovalo úplně dolů */
                setTimeout(() => { 	
                    let chatBody = this.$el.querySelector(".chat__content");
                    chatBody.scrollTop = chatBody.scrollHeight;
                },1);                
            }
        },
        sendMessage() {
            if(this.newMessage) {
                this.messages.push({
                    userId: 0,
                    time: Date.now(),
                    text: this.newMessage
                });
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
            }, randomTimeBeforeTyping);

            setTimeout(() => {
                vm.areTypingDotsActive=false;
                vm.showPreparedMessagesInput=true;
                vm.messages.push({
                    userId: this.chatUserId,  
                    time: Date.now(),
                    text: reply  
                });
                vm.newIncomingMessagesCount++;
            },randomTime(randomTimeBeforeTyping/1000, 15));
        },
        choosePreparedMessage(preparedMessage) {
            this.newMessage = preparedMessage.text;
            this.sendMessage();

            if(preparedMessage.incomingAnswer) {
                this.showPreparedMessagesInput = false;
                this.getReply(preparedMessage.incomingAnswer.text);
                this.preparedMessages = preparedMessage.incomingAnswer.preparedMessages;
            } else {
                this.preparedMessages = null; 
            }
        },
        replaceSmileys(value) {
            const map = {
                "<3": "\u2764\uFE0F",
                "</3": "\uD83D\uDC94",
                ":D": "\uD83D\uDE00",
                ":)": "\uD83D\uDE03",
                ";)": "\uD83D\uDE09",
                ":(": "\uD83D\uDE12",
                ":p": "\uD83D\uDE1B",
                ";p": "\uD83D\uDE1C",
                ":'(": "\uD83D\uDE22",
                ":P": "\ud83d\ude0b",
                ":-*": "\ud83d\ude18",
            }; 
            function escapeSpecialChars(regex) {
                return regex.replace(/([()[{*+.$^\\|?])/g, '\\$1');
            } 
            for (var i in map) {
                const regex = new RegExp(escapeSpecialChars(i), 'gim');
                value = value.replace(regex, map[i]);
            }
            return value;                                  
        },
        resetNewIncomingMessagesCount() {
            this.newIncomingMessagesCount = 0;
        },
        getCurrentTimestamp() {

        }                                  
    },
    watch: {
        isActive() {
           /* při aktivování chatu, vždy maximalizuj */ 
           this.isChatMaximized=true;
           this.scrollToEnd();
        },
        messages() {
            /* při aktualizaci zpráv */
            this.scrollToEnd();
        },
        newMessage(value) {
            this.newMessage = this.replaceSmileys(value);
        }
    },
    mounted() {
        this.scrollToEnd();
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
    max-height: 350px;
    overflow-y: scroll; 
}
.chat__input {
    display: flex;
    padding: 10px;   
    textarea {
        width: 100%;
        background: $input-color;
        border-radius: 5px;
        margin-right: 10px;
        padding: 5px;
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
    button {
        padding: 5px; 
        border: 1px solid grey; 
        margin-right: 5px; 
        border-radius: 10px;
    }
}
</style>