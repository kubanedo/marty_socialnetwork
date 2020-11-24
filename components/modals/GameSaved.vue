<template>
  <div>
        <div class="saved__header">
            <h2>Hra uložena!</h2>
            <UICloseBtn @click.native="closeWindow" />
        </div>
      <p class="text-center"><strong>Hra byla uložena</strong>. Pokud budete chtít příště navázat, kde jste skončili, budete pořebovat <strong>ID hry</strong>.</p>
      <p class="text-center">
          ID této hry:<br/> <i><strong ref="gameid">{{gameId}}</strong></i><button class="copy grey" @click="copyToClipboard('gameid')"><i class="las la-clipboard"></i> Zkopírovat</button>
      </p>
      <p class="text-center">ID hry si někam uložte nebo si ho můžete nechat poslat na e-mail.</p>
      <strong>Na jaký e-mail chcete poslat ID této hry?</strong><br/>
      <div class="flex">
        <div class="w100"> 
            <input type="email" :class="'w100' + (!emailValid ? ' red' : '')" v-model="email" placeholder="Váš e-mail" @blur="isEmailValid()"/>
        </div>
        <button class="send-mail grey" @click="sendEmail">Odeslat e-mail</button> 
      </div>
      <small class="notvalid-msg" v-if="(!emailValid)">Zadán nevalidní e-mail.</small> 
      <hr class="divider"/>
      <div class="text-center">
            <p>Pokud máte ID hry uloženo na e-mailu či jinde. Můžete se v klidu odhlásit.</p>
            <UiButton @click.native="logOut()"><i class="las la-sign-out-alt"></i> Odhlásit se</UiButton> 
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
    data() {
        return {
            email: '',
            reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
            emailValid: true,
            gameId: this.$store.state.loggedUser.game_id
        }
    },
    methods: {
        isEmailValid() {
            this.emailValid = (this.reg.test(this.email)) ? true : false;
        },        
        sendEmail() {  
            if(this.emailValid && this.email !== "") {
                axios.post(process.env.apiUrl + "/send_gameid_email.php", {
                    email: this.email, 
                    game_id: this.gameId})
                .then(response => console.log(response))  

                //this.closeWindow();
                this.$toast(
                    "E-mail s ID hry odeslán.",
                    { icon: 'las la-envelope' }
                );
            }            
        },
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
        },
        logOut() {
            localStorage.removeItem('gameID');
            this.$router.push('/login?logged-out');         
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
</style>