<template>
<div>
    <div class="contact__wrapper" v-for="(contact, index) in contacts" :key="index" @click="openChat(contact.userId)">
        <div class="contact__img profile-img" :style="{ backgroundImage: 'url(' + contact.profileImg + ')' }">
            <div v-if="contact.status==1" :class="'contact__status status--' + contact.status"></div>
        </div>
        <div class="contact__name"><div>{{contact.userName}}</div></div>
    </div>
</div>    
</template>

<script>
export default {
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
        openChat(id) {
            console.log(id);
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
.contact__img {
    position: relative;
}
.contact__status {
    position: absolute;
    width: 15px;
    height: 15px;
    background-color: grey;
    border: 3px solid white;
    border-radius: 50%;
    right: 0;
    bottom: -3px;
}
.status--1 {
    background-color: green;
}
.contact__name {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-weight: bold;
    margin-left: 10px;
}
</style>