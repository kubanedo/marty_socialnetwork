<template>
  <div class="notifications__wrapper">
            <h3>Upozornění</h3>
            <div v-for="notification in notifications" :key="notification.notif_id" class="notification" @click="goTo(notification.post_id)">
                <div class="notification__img"><UIProfileImg :userID="notification.user_id" /></div>
                <div class="notification__info">
                    <strong>{{notification.user_id}}</strong> {{(notification.type=="like" ? 'lajknul/a' : (notification.type=="comment" ? 'okomentoval/a' : 'reagoval/a na') )}}
                    {{(notification.what="post" ? 'příspěvek' : (notification.what=="comment" ? 'komentář' : '') )}} <br/>
                    <i>{{notification.excerpt}}...</i><br/>
                    <TimeAgo :time="notification.time"/>
                </div>
            </div>
  </div>
</template>

<script>
import UIProfileImg from '~/components/ui/UIProfileImg'
import TimeAgo from "~/components/TimeAgo";
export default {
    components: {
        UIProfileImg,
        TimeAgo
    },
    computed: {
        notifications() {
            return this.$store.state.notifications
        }
    },
    methods: {
        goTo(where) {
            this.$router.push('/post/' + where);
            this.$emit('closeDropdown');
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~/assets/variables.scss";
.notifications__wrapper {
    h3 {
        padding: 15px 20px 10px 20px;
    }
}
.notification {
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
.notification__img {
    margin-right: 10px;
}
</style>