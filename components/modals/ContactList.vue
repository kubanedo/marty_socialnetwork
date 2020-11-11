<template>
  <div>
        <div class="friendlist__header">
            <h2>Všechny kontakty</h2>
            <div><UICloseBtn @click.native="closeWindow" /></div>
        </div>
        <Contacts @chatOpened="closeWindow"/>
  </div>
</template>

<script>
import UICloseBtn from "~/components/ui/UICloseBtn";
import Contacts from "~/components/Contacts";
import UILoadingContent from '~/components/ui/UILoadingContent'
export default {
    components: {
        UICloseBtn,
        Contacts,
        UILoadingContent
    },
    props: {
        modalData: {
            type: Object
        }
    },
    methods: {
        closeWindow() {
            this.$emit('closeWindow');
        }            
    }
}
</script>

<style lang="scss" scoped>
@import "~/assets/variables.scss";
    .friendlist {
        max-height: 500px;
        overflow-y: auto;
    }
    h2 {
        font-size: 18px;
        line-height: 1.1;
    }
    .friendlist__header {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid $grey-color;
      padding-bottom: 10px;
      margin-bottom: 20px;
    }
    .friendlist-item {
        margin-bottom: 10px;
        &:last-child {
            margin-bottom: 0;
        }
    }
</style>