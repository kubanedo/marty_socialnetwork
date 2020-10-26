<template>
  <div class="messages__wrapper">
            <h3>Zprávy</h3>
            <div v-if="contentLoading">
                <LoadingDropdownContent v-for="item in 3" :key="item" />
            </div>
            <div v-else>
                <div v-for="(latestMessage, contactId) in latestMessages" :key="contactId" class="latest-message"
                        @click="openChat(contactId)">
                    <div class="latest-message__img"><UIProfileImg :userID="contactId" /></div>
                    <div class="latest-message__info">
                        <strong>{{contactId}}</strong><br/>
                        <span v-if="latestMessage.userId=='me'">Já: </span>{{shortenMessage(latestMessage.text)}} <br/>
                        <small><TimeAgo :time="latestMessage.time"/></small>
                    </div>
                </div>
            </div>    
  </div>
</template>

<script>
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
            latestMessages: {},
            contentLoading: true
        }
    },
    methods: {
        loadLatestMessages() {
            axios.get('http://jakubnedorost.cz/marty/api/?type=messages&latest=1')
                .then(response => {
                    if(response.data) {
                        this.latestMessages = response.data;
                    }
                })
                .catch(error => console.log(error)) 
                .finally(() => {
                    this.contentLoading = false;  
                })    
        },
        shortenMessage(message) {
            if(message.length > 30) {
                message = message.slice(0, 30) + '...';
            }
            return message;
        },
        openChat(contactId) {
            this.$store.commit('openChat', contactId);
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
    &:hover {
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
</style>