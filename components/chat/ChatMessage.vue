<template>
  <div
    :class="'chat__message chat__message--' + ((message.userId == 'me') ? 'outgoing' : 'incoming')"
  >
    <UIProfileImg
      v-if="!message.userId == 'me'"
      class="mr-5"
      imgURL="https://demo.hasthemes.com/adda-preview/adda/assets/images/profile/profile-small-37.jpg"
      :imgSize="25"
    />
    <UiTooltip :text="dateTime" :position="((message.userId == 'me') ? 'left' : 'right')" class="message__body-wrapper">
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
    },
    data() {
      return {
        dateTime: ''
      }
    },
    methods: {
        processTime() {
          if(typeof this.message.time==='object') {
            this.convertRelativeTimeToTimestamp(this.message.time);
          } else {
            this.convertTimestampToTime(this.message.time);
          }
        },
        convertRelativeTimeToTimestamp(relativeTimeObject) {
          let daysAgo = (relativeTimeObject.daysAgo) ? (relativeTimeObject.daysAgo * 24 * 60 * 60 * 1000) : 0;
          let hoursAgo = (relativeTimeObject.hoursAgo) ? (relativeTimeObject.hoursAgo * 60 * 60 * 1000) : 0;
          let minutesAgo = (relativeTimeObject.minutesAgo) ? (relativeTimeObject.minutesAgo * 60 * 1000) : 0;

          let timestamp = this.$store.state.startTimestamp - (daysAgo + hoursAgo + minutesAgo);
          this.convertTimestampToTime(timestamp);
        },
        convertTimestampToTime(timestamp) {
            let now = new Date();
            let dateNow = now.getDate() + '.' + now.getMonth() + '.' + now.getFullYear();

            timestamp = new Date(timestamp);

            let comparisonDateFromTimestamp = timestamp.getDate() + '.' + timestamp.getMonth() + '.' + timestamp.getFullYear();
            let dateFromTimestamp = timestamp.getDate() + '.' + timestamp.getMonth() + '.' + ((timestamp.getFullYear()==now.getFullYear()) ? '' : timestamp.getYear());
            let timeFromTimestamp = this.with_leading_zeros(timestamp.getHours()) + ":" + this.with_leading_zeros(timestamp.getMinutes());

            if(dateNow === comparisonDateFromTimestamp) {
                this.dateTime = timeFromTimestamp; 
            } else {
                this.dateTime = dateFromTimestamp + " v\xa0" + timeFromTimestamp;
            }
        },
        with_leading_zeros(time) {
            return (time < 10 ? '0' : '') + time;
        } 
    },
    mounted() {
      this.processTime();
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