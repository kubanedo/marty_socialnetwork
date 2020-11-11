<template>
<div>
    <input type="text" v-model="search" placeholder="Najít přítele.."/>
    <div class="contact__wrapper" v-for="contact in filteredContacts" :key="contact.contact_id"
        @click="openChat(contact.contact_id)">
        <div><UIProfileImg :userID="contact.contact_id" :status="contact.status" imgBorderColor="#f1f1f1"/></div>
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
            contacts: [],
            search: ''
        }
    },
    computed: {
        myFriends() {
            return this.$store.getters.getMyFriends;
        },
        filteredContacts() {
            console.log(this.contacts.length);
            if(this.contacts.length > 0 && this.search.length > 0) {
                return this.contacts.filter(contact => {
                    let contactWholeName = contact.first_name + " " + contact.last_name;
                    return contactWholeName.toLowerCase().includes(this.search.toLowerCase())
                });
            } else {
                return this.contacts;
            }
        }
    },
    methods: {
        openChat(contactId) {
            this.$store.commit('openChat', contactId);
        }
    },
    mounted() {
      let friends = this.myFriends;
      axios.get('https://jakubnedorost.cz/marty/api/?type=profiles-basic&profile_ids=' + friends.join())
        .then(response => {
          let data = Object.entries(response.data);
          data.forEach((item) => {
              let newItem = {...item[1], contact_id: item[0]};
              this.contacts.unshift(newItem);
          });
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