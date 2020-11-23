<template>
<div>
   <div v-if="!contactsLoading"> 
        <div v-if="placement!=='sidebar'" class="search-icon-input">
            <div class="search-icon"><i class="las la-search"></i></div>
            <input type="text" v-model="search" placeholder="Najít přítele ..." class="nice-input mb-10"/>
            <div class="search-delete smaller-onclick" v-if="search.length > 0" @click="search = ''"><i class="las la-times"></i></div>
        </div>
        <div class="contact__wrapper" v-for="contact in contactLoop" :key="contact.profile_id"
            @click="openChat(contact.profile_id)">
            <div><UIProfileImg :userID="contact.profile_id" :status="contact.status" imgBorderColor="#f1f1f1"/></div>
            <div class="contact__name"><div>{{contact.first_name + " " + contact.last_name}}</div></div>
        </div>
        <div v-if="search.length > 0 && filteredContacts.length==0" class="text-center mt-10">
            <div class="circle-icon">
                <i class="las la-frown"></i>
            </div>                    
            Nic nenalezeno.        
        </div>
        <button class="grey w100 mt-10" v-if="placement=='sidebar' && filteredContacts.length > 3" @click="openContactList()">Zobrazit všechny kontakty</button>
        <div class="text-center" v-if="!contacts.length">
            <div class="circle-icon">
                <i class="las la-frown"></i>
            </div>                    
            Žádné kontakty.
        </div>    
   </div> 
   <UILoadingContent v-else :title="false" :numberOfLines="3" />
</div>    
</template>

<script>
import axios from 'axios'
import UIProfileImg from '~/components/ui/UIProfileImg'
import UILoadingContent from '~/components/ui/UILoadingContent'

export default {
    components: {
        UIProfileImg,
        UILoadingContent
    },
    props: {
        placement: {
            type: String
        }
    },
    data() {
        return {
            contacts: [],
            search: '',
            contactsLoading: true
        }
    },
    computed: {
        myFriends() {
            return this.$store.getters.getMyFriends;
        },
        contactLoop() {
            if(this.contacts.length) {
                if(this.placement=='sidebar') {
                    return this.contacts.slice(0,3);
                } else {
                    return this.filteredContacts;
                }
            } else {
                return []
            }
        },
        filteredContacts() {
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
            this.$emit('chatOpened');
        },
        openContactList() {
            this.$store.state.modalWindow = {
                modalName: 'ContactList',
                modalWidth: 350
            };            
        },
        getContacts() {
            let friends = this.myFriends;
            if(friends.length) {
                axios.get(process.env.apiUrl + '/?type=profiles-basic&profile_ids=' + friends.join())
                    .then(response => {
                        let data = response.data;
                        this.contactsLoading = false;

                        this.contacts = (data!==null) ? [...data] : [];                 
                    })
                    .catch(error => console.log(error))  
            } else {
                this.contactsLoading = false;
                this.contacts = [];
            }              
        }
    },
    watch: {
        myFriends() {
            this.getContacts();
        }
    },
    mounted() {
            this.getContacts();     
    }   
}
</script>

<style lang="scss" scoped>
@import "~/assets/variables.scss";
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
.nice-input {
    border: 1px solid darken($page-background, 10);
    width: 100%;
    padding: 5px 10px;
    border-radius: 5px;
}

.search-icon-input {
    position: relative;
    input {
        background: white;
        padding-left: 40px;
        padding-right: 30px;
    }
    .search-icon {
        color: darken($page-background, 10);
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-65%);
        font-size: 20px;
    }
    .search-delete {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-65%);        
    }
}
</style>