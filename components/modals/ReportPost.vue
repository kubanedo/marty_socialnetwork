<template>
  <div>
        <div class="report__header">
            <h2>Nahlásit příspěvek</h2>
            <UICloseBtn @click.native="closeWindow" />
        </div>
      <div class="alert">
          <i class="las la-exclamation-triangle"></i> Pokud příspěvek nahlásíte, nebudete tuto akci moci vzít zpět!
      </div>        
      Vyberte důvod nahlášení příspěvku:<br/><br/>
      <button class="report__reason" v-for="(reason, index) in reasons" :key="index" @click="reportPost()">{{reason}}</button>
  </div>
</template>

<script>
import UICloseBtn from "~/components/ui/UICloseBtn";
export default {
    components: {
        UICloseBtn
    },
    props: {
        modalData: {
            type: Object,
            required: true
        }
    },       
    data() {
        return {
            reasons: ['Nahota','Násilí','Obtěžování', 'Sebevražda nebo sebepoškozování', 'Nepravdivé zprávy', 'Spam', 'Neoprávněný prodej', 'Nenávistný obsah', 'Terorismus']
        }
    },
    methods: {
        reportPost() {
            this.$store.commit('reportPost', this.modalData.post_id);        
            this.closeWindow();
            this.$toast.success(
                "Příspěvek reportován!",
                { icon: 'las la-exclamation-triangle' }
            );            
        },
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
    .alert {
        border-radius: 5px;
        margin-bottom: 20px;
        color: #856404;
        padding: 10px;
        background-color: #fff3cd;
        border-color: #ffeeba;
    }
</style>