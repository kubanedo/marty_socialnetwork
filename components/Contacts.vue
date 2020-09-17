<template>
<div>
    <div class="contact__wrapper" v-for="(contact, index) in contacts" :key="index" @click="toggleChatActivness()">
        <UIProfileImg :imgURL="contact.profileImg" :status="contact.status"/>
        <div class="contact__name"><div>{{contact.userName}}</div></div>
    </div>
</div>    
</template>

<script>
import UIProfileImg from '~/components/ui/UIProfileImg'
export default {
    components: {
        UIProfileImg
    },
    data() {
        return {
            contacts: [
                {
                    userId: 0,
                    profileImg: 'https://demo.hasthemes.com/adda-preview/adda/assets/images/profile/profile-small-37.jpg',
                    userName: 'Danda Panda',
                    status: 0
                },
                {
                    userId: 1,
                    profileImg: 'https://demo.hasthemes.com/adda-preview/adda/assets/images/profile/profile-small-6.jpg',
                    userName: 'Cindy Pindy',
                    status: 1
                }                
            ]
        }
    },
    methods: {
        toggleChatActivness() {
            this.$store.commit('toggleChatActivness');
        }
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