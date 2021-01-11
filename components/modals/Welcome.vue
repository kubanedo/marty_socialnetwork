<template>
  <div>
        <div class="saved__header">
            <h2>Vítej <i>{{wholeUsername}}</i> ve hře!</h2>
            <UICloseBtn @click.native="closeWindow" />
        </div>
      <p>
          Cílem hry je získat, co největší skóre. Po celém #fejkbuku jsou schované kvízové otázky, které vždy nalezneš pod tímto tlačítkem: <span class="quiz__btn">?</span>. Za správnou odpověď ti bude do konta připsán plný počet bodů, za špatnou poloviční počet odepsán.
      </p>
      <p>
          Rozehranou hru si můžeš vždy uložit a to pod položkou "Uložit hru" v pravém menu v záhlaví. Menu otevřeš kliknutím na profilový obrázek se jménem. Tam také nalezneš informace o tom, jak následně pokračovat v rozehraé hře až budeš chtít pokračovat.
      </p>
      <hr class="divider"/>
      <div class="text-center">
            <UiButton @click.native="closeWindow">Rozumím. Jde se na to!</UiButton> 
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import UIButton from "~/components/ui/UIButton";
import UICloseBtn from "~/components/ui/UICloseBtn";
export default {
    components: {
        UICloseBtn,
        UIButton
    },
    props: {
        modalData: {
            type: Object,
            required: true,
        }
    }, 
    computed: {
     wholeUsername() {
         return this.$store.getters.getMyWholeName();
     }
    },   
    data() {
        return {
            gameId: this.$store.state.loggedUser.game_id
        }
    },
    methods: {
        closeWindow() {
            this.$emit('closeWindow');
        },
        copyToClipboard(ref_name) {
                selectElement(this.$refs[ref_name]);
                document.execCommand('copy');

                function selectElement(element) {
                    if (window.getSelection) {
                        var _range = document.createRange();

                        _range.selectNodeContents(element);

                        window.getSelection().removeAllRanges();
                        window.getSelection().addRange(_range);
                    } else if (document.selection) {
                        letrange = document.body.createTextRange();
                        range.moveToElementText(element);
                    } else {
                        console.error('COULDN\'T SELECT');
                    }
                }; 
                this.$toast(
                    "ID hry zkopírováno do schránky.",
                    { icon: 'las la-clipboard' }
                );                             
        }    
    }   
}
</script>

<style lang="scss" scoped>
@import "~/assets/variables.scss";
    .saved__header {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid $grey-color;
      padding-bottom: 10px;
      margin-bottom: 20px;
    }
    p {
        margin-bottom: 15px;
    }
    button.copy, button.send-mail {
        margin-left: 6px;
        padding: 5px 10px;
    }
    button.send-mail {
        white-space: nowrap;
    }
    .notvalid-msg {
        color: red;
        margin-top: 3px;
        font-size: 11px;
        font-style: italic;
    }
    hr.divider {
        margin: 20px 0 10px;
    }
    .flex {
        display: flex;
    }

    .quiz__btn {
        position: relative;
        display: inline-block;
        z-index: 2;
        background: #800080;
        border-radius: 50%;
        color: white;
        font-weight: bold;
        height: 20px;
        line-height: 1.5;
        width: 20px;
        text-align: center;        
    }
</style>