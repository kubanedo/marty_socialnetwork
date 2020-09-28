<template>
<div>
    <div class="contact__wrapper" v-for="(contact, contactId) in contacts" :key="contactId" 
        @click="openChat({
            contactId: contactId,
            first_name: contact.first_name,
            last_name: contact.last_name
            })">
        <div><UIProfileImg :imgURL="'http://jakubnedorost.cz/marty/images/profiles/' + contactId + '/profileimg.jpg'" :status="contact.status"/></div>
        <div class="contact__name"><div>{{contact.first_name + " " + contact.last_name}}</div></div>
    </div>
</div>    
</template>

<script>
import axios from 'axios'
import UIProfileImg from '~/components/ui/UIProfileImg'

export default {
    components: {
        UIProfileImg
    },
    data() {
        return {
            contacts: []
        }
    },
    methods: {
        openChat(contactId) {
            this.$store.commit('openChat', contactId);
        }
    },
    mounted() {
      axios.get('http://jakubnedorost.cz/marty/json-cors.php?f=profiles')
        .then(response => {
          this.contacts = response.data[0];
        })
        .catch(error => console.log(error))        
    }   
}
</script>

<style lang="scss" scoped>
.contact__wrapper {
    cursor: pointer;
    display: flex;
    padding: 5px;
    border-radius: 5px;

    &:hover {
        background: #f7f7f7;
    }
}
.contact__name {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-weight: bold;
    margin-left: 10px;
}
</style>