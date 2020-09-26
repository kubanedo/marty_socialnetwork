<template>
  <div
    :class="'chat__message chat__message--' + ((message.userId == 0) ? 'outgoing' : 'incoming')"
  >
    <UIProfileImg
      v-if="!message.userId == 0"
      class="mr-5"
      imgURL="https://demo.hasthemes.com/adda-preview/adda/assets/images/profile/profile-small-37.jpg"
      :imgSize="25"
    />
    <UiTooltip :text="message.time" :position="((message.userId == 0) ? 'left' : 'right')" class="message__body-wrapper">
      <div class="message__body">
        {{message.text}}
      </div>
    </UiTooltip>
  </div>
</template>

<script>
import UIProfileImg from "~/components/ui/UIProfileImg";
import UITooltip from '~/components/ui/UITooltip';
export default {
    props: {
        message: Object
    },
    components: {
        UIProfileImg,
        UITooltip
    }    
};
</script>

<style lang="scss" scoped>
@import "~/assets/variables.scss";
.chat__message {
    display: flex;

    &--outgoing {
        justify-content: flex-end;
    }
    &--incoming {
        justify-content: flex-start;
    }    
    &--outgoing .message__body {
        background: $message-other-color;
        color: white;
    }
    &--incoming .message__body{
        background: $message-grey-color;
    }      
}
.message__body-wrapper {
  max-width: 70%;
}
.message__body {
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;       
}
.message__time {
  display: block;
  opacity: 0.9;
  font-size: 10px;
}
.mr-5 {
    margin-right: 5px;
}
</style>