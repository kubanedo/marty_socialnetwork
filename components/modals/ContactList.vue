<template>
  <div>
        <div class="contactlist__header">
            <h2>Všechny kontakty</h2>
            <div><UICloseBtn @click.native="closeWindow" /></div>
        </div>
        <div class="contactlist">
            <Contacts @chatOpened="closeWindow"/>
        </div>
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
    .contactlist {
        max-height: 500px;
        overflow-y: auto;
    }
    h2 {
        font-size: 18px;
        line-height: 1.1;
    }
    .contactlist__header {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid $grey-color;
      padding-bottom: 10px;
      margin-bottom: 20px;
    }
</style>