<template>
  <div v-click-outside="closeDropdown">
      <div @click="showDropdown=!showDropdown"><slot/></div>
      <div v-show="showDropdown" class="dropdown-menu">
          <div class="dropdown-menu__content">
              <component :is="dropName" @unreadCount="unreadCount($event)" @closeDropdown="closeDropdown"></component>
          </div>
      </div>
  </div>
</template>

<script>
import Messages from "~/components/dropdowns/Messages";
import Notifications from "~/components/dropdowns/Notifications";
export default {
    props: {
        dropdownName: {
            type: String,
            required: true
        }    
    },
    components: {
        Messages,
        Notifications
    },
    data() {
        return {
            dropName: this.dropdownName,
            showDropdown: false,
            unreadChatsCount: 0
        }
    },
    methods: {
        closeDropdown() {
            this.showDropdown = false;
        },
        unreadCount(value) {
            this.$emit('unreadCount', value);
        }        
    }
}
</script>

<style lang="scss" scoped>
@import "~/assets/variables.scss";
.dropdown-menu {
    position: absolute;
    background: white;
    border-radius: 5px;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
    width: 70%;
    max-width: 360px;
    z-index: 3;
    margin-top: 5px;
    margin-left: -10px;
    @media screen and (min-width: 550px) {
        margin-left: 8px;
    }
    &:before {
        content: " ";
        position: absolute;
        top: -12px;
        left: 20px;
        margin-left: -7px;
        border-width: 6px;
        border-style: solid;
        border-color: transparent transparent white transparent;   
    }
}
.dropdown-menu__content {
    overflow-y: scroll;
    max-height: 300px;
}
</style>