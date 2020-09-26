<template>
  <div class="tooltip__wrapper" @mouseover="hover=true" @mouseleave="hover=false">
      <slot />
      <div v-if="hover" :class="'tooltip__content ' + position">
          {{text}}
      </div>        
  </div>        
</template>

<script>
export default {
    props: {
        text: String,
        position: {
            type: String,
            default: 'top'
        }
    },
    data() {
        return {
            hover: false,
        }
    }
}
</script>

<style lang="scss" scoped>
    .tooltip__wrapper {
        position: relative;
    }
    .tooltip__content {
        position: absolute;
        display: inline;
        font-size: 12px;
        display: block;
        padding: 5px;
        border-radius: 2px;
        background: black;
        color: white;
        z-index: 10;

        &.top {
            top: -7px;
            right: 50%;
            transform: translate(50%, -100%);

            &::after {
                content: " ";
                position: absolute;
                top: 98%; /* At the bottom of the tooltip */
                left: 50%;
                margin-left: -5px;
                border-width: 5px;
                border-style: solid;
                border-color: black transparent transparent transparent;
            }                      
        }
        &.bottom {
            bottom: -7px;
            right: 50%;
            transform: translate(50%, 100%); 

            &::after {
                content: " ";
                position: absolute;
                bottom: 98%;  /* At the top of the tooltip */
                left: 50%;
                margin-left: -5px;
                border-width: 5px;
                border-style: solid;
                border-color: transparent transparent black transparent;
            }           
        }
        &.right {
            bottom: 50%;
            right: -7px;
            transform: translate(100%, 50%);  

            &::after {
                content: " ";
                position: absolute;
                top: 50%;
                right: 98%; /* To the left of the tooltip */
                margin-top: -5px;
                border-width: 5px;
                border-style: solid;
                border-color: transparent black transparent transparent;
            }                      
        } 
        &.left {
            bottom: 50%;
            left: -7px;
            transform: translate(-100%, 50%);

            &::after {
            content: " ";
            position: absolute;
            top: 50%;
            left: 98%; /* To the right of the tooltip */
            margin-top: -5px;
            border-width: 5px;
            border-style: solid;
            border-color: transparent transparent transparent black;
            }            
        }                          
    }
</style>