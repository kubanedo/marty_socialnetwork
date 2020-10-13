<template>
  <div>
        <div class="report__header">
            <h2>Nahlásit příspěvek</h2>
            <UICloseBtn @click.native="closeWindow" />
        </div>
      Vyberte důvod nahlášení příspěvku:<br/><br/>
      <button class="report__reason" v-for="(reason, index) in reasons" :key="index" @click="closeWindow">{{reason}}</button>
  </div>
</template>

<script>
import UICloseBtn from "~/components/ui/UICloseBtn";
export default {
    components: {
        UICloseBtn
    },
    data() {
        return {
            reasons: ['Nahota','Násilí','Obtěžování', 'Sebevražda nebo sebepoškozování', 'Nepravdivé zprávy', 'Spam', 'Neoprávněný prodej', 'Nenávistný obsah', 'Terorismus']
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
    .report__header {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid $grey-color;
      padding-bottom: 10px;
      margin-bottom: 20px;
    }
    button.report__reason {
      background: $grey-color;
      border-radius: 20px;
      padding: 10px 20px;
      margin-right: 10px;
      margin-bottom: 10px;
      
      &:hover {
          background: lighten($grey-color, 0.9);
      }
    }
</style>