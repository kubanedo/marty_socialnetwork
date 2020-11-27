<template>
  <div class="messages__wrapper">
            <h3>Zprávy<span v-if="unreadChatsCount"> ({{unreadChatsCount}})</span></h3>
            <div v-if="contentLoading">
                <LoadingDropdownContent v-for="item in 3" :key="item" />
            </div>
            <div v-else>
                <div v-for="(latestMessage) in latestMessages" :key="latestMessage.chat_id" :class="'latest-message' + (latestMessage.new_messages_count ? ' unread' :  '' )"
                        @click="openChat(latestMessage.chat_id)">
                    <div class="latest-message__img"><UIProfileImg :userID="latestMessage.chat_id" /></div>
                    <div class="latest-message__info">
                        <strong>{{latestMessage.chat_id}}</strong><span class="latest-message__new-count" v-if="latestMessage.new_messages_count">{{latestMessage.new_messages_count}}</span><br/>
                        <span v-if="latestMessage.userId=='me'">Já: </span>{{shortenMessage(latestMessage.text)}} <br/>
                        <small><TimeAgo :time="latestMessage.time"/></small>
                    </div>
                </div>
            </div>    
  </div>
</template>

<script>
const compareTimestamp = ( a, b ) => {
  if ( a.time < b.time ){
    return 1;
  }
  if ( a.time > b.time ){
    return -1;
  }
  return 0;
}

import axios from 'axios'
import TimeAgo from "~/components/TimeAgo";
import UIProfileImg from '~/components/ui/UIProfileImg'
import LoadingDropdownContent from '~/components/dropdowns/LoadingDropdownContent'
export default {
    components: {
        UIProfileImg,
        TimeAgo,
        LoadingDropdownContent
    },
    data() {
        return {
            latestMessagesFromApi: [],
            contentLoading: true
        }
    },
    computed: {
        latestMessages() {
            let notUpdatedMessagesFromApi = this.latestMessagesFromApi.filter((item) => !this.chatIdsFromStore.includes(item.chat_id));
            let latestFromStore = this.getLatestFromStore();
            return[...latestFromStore, ...notUpdatedMessagesFromApi]
        },
        chatIdsFromStore() {
            return (this.$store.state.chats[0] ? Object.keys(this.$store.state.chats[0]) : []);
        },
        unreadChatsCount() {
            return this.latestMessages.filter((item) => item.new_messages_count > 0).length;
        }
    },
    watch: {
        unreadChatsCount(value) {
            this.$emit('unreadCount', value);
        }
    },
    methods: {
        loadLatestMessages() {
            axios.get('http://jakubnedorost.cz/marty/api/?type=messages&latest=1')
                .then(response => {
                    if(response.data) {
                        this.latestMessagesFromApi = response.data;
                    }
                })
                .catch(error => console.log(error)) 
                .finally(() => {
                    this.contentLoading = false;  
                })    
        },
        getLatestFromStore() {
            let latestFromStore = [];
            if(this.$store.state.chats[0]) {
                let chats = this.$store.state.chats[0];
                Object.keys(chats).forEach((userId) => {
                    let userMsgs = chats[userId].old_messages;
                    let latestMessage = {
                        ...userMsgs[userMsgs.length-1],
                        new_messages_count: (chats[userId].new_messages_count) ? (chats[userId].new_messages_count) : 0,
                        chat_id: userId
                        }
                    latestFromStore.push(latestMessage)
                });
            }
            latestFromStore.sort(compareTimestamp);
            return latestFromStore;
        },        
        shortenMessage(message) {
            if(message && message.length > 30) {
                message = message.slice(0, 30) + '...';
            }
            return message;
        },
        openChat(contactId) {
            this.$store.commit('openChat', contactId);
            this.$emit('closeDropdown');
        }  
    },
    mounted() {
        this.loadLatestMessages();
    }
}
</script>

<style lang="scss" scoped>
@import "~/assets/variables.scss";
.messages__wrapper {
    h3 {
        padding: 15px 20px 10px 20px;
    }
}
.latest-message {
    display: flex;
    cursor: pointer;
    padding: 10px;
    margin: 0 10px 0 10px;
    border-radius: 5px;
    &.unread, &:hover {
        background-color: $grey-color;
    }
    &:nth-last-child(1) {
        border-bottom: 0;
        margin-bottom: 20px;
    }
}
.latest-message__img {
    margin-right: 10px;
}
.latest-message__new-count {
    display: inline-block;
    background: red;
    color: white;
    border-radius: 50%;
    padding: 0 6px;
    font-size: 10px;
    margin-left: 5px;
}
</style>