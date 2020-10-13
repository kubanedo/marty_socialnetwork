<template>
    <span>
        <UiTooltip :text="tooltipText">
            <span v-if="postedBy=='me'">
                <button class="privacyBtn" @click="changeSettings"><i :class="'las la-' + icon"></i></button>
            </span>
            <span v-else>
                <i :class="'las la-' + icon"></i>
            </span>                  
        </UiTooltip>
    </span>    
</template>

<script>
import UITooltip from "~/components/ui/UITooltip";
export default {
    props: {
        privacySetting: String,
        postedBy: String,
        postID: String
    },
    data() {
        return {
            currentSetting: this.privacySetting,
            tooltipText: '',
            icon: ''
        }
    },
    components: {
        UITooltip
    },
    methods: {
        changeSettings() {
          if(this.currentSetting=='friends') {
              this.currentSetting='all'
          } else {
              this.currentSetting='friends'
          }
          this.setTextAndIcon(); 
          this.$emit('updatePrivacySetting', this.currentSetting) 
        },
        setTextAndIcon() {
            if(this.currentSetting=='friends') {
                this.tooltipText = "Přátelé";
                this.icon = "user-friends";
            } else {
                this.tooltipText = "Všichni";
                this.icon = "globe";           
            }            
        }
    },
    mounted() {
        this.setTextAndIcon();
    }
}
</script>

<style lang="scss" scoped>
@import "~/assets/variables.scss";
.privacyBtn {
    display: inline-block;
    width: 22px;
    border-radius: 50%;
    margin-left: -4px;
    &:hover {
        background-color: $grey-color;
    }
}
</style>