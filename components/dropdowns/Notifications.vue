<template>
  <div class="notifications__wrapper">
            <h3>Upozornění</h3>
            <div v-for="item in 10" :key="item" class="notification">
                <div class="notification__img"><UIProfileImg userID="me" /></div>
                <div class="notification__info">
                    <strong>Jméno kontaktu</strong> okomentoval<br/>
                    Já: Výcuc z poslední zprávy... <br/>
                    před 3 dny
                </div>
            </div>
  </div>
</template>

<script>
import UIProfileImg from '~/components/ui/UIProfileImg'
export default {
    components: {
        UIProfileImg
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