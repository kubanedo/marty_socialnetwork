<template>
  <div class="login__page">      
    <h1>#fejkbuk</h1>
    <div class="login__wrapper card">
      <p>Přihlašte se do naší nepravé sociální sítě a ověřte si, že víte, jak se na sociálních sítích správně chovat. Za každou správně provedenou akci/odpovězenou otázku, získáte určitý počet bodů. Za špatně provedené akce či odpovězené otázky je odebrána polovina bodů, které bylo možno získat. Provedete všechny úkoly a získáte největší počet bodů?</p>
      <div class="login__form">
          <div v-if="alertMsg" class="alert"><i class="las la-exclamation-triangle"></i> {{alertMsg}}</div>        
          <div class="login__newgame" v-if="!showloadGameInput">

            <div class="input-wrapper">
              <label>Křestní jméno</label>
              <input type="text" class="w100" v-model="first_name" @keydown.enter.prevent="logIn()"/>
            </div>
            <div class="input-wrapper">
              <label>Příjmení</label>
              <input type="text" class="w100" v-model="last_name" @keydown.enter.prevent="logIn()"/>
            </div> 
            <div class="input-wrapper">             
              <label>Pohlaví</label>
              <input type="radio" v-model="sex" value="m"> Muž
              <input type="radio" v-model="sex" value="f"> Žena
            </div>

            <UIButton text="Registrovat a přihlásit se" @click.native="logIn()" /><br/>
            <div @click="showloadGameInput=true" class="click underline-hover text-center mt-20">Už jsem registrován/a, chci načíst rozehranou hru</div><br/>

          </div>  
          <div class="login__loadgame" v-else>
            <div v-if="$route.query['game-not-found']===null" class="alert">
              <i class="las la-frown"></i> Hra nenalezena. Máte správné ID hry?
            </div>               
            <p>Níže zadejte kód rozehrané hry, který vám byl zaslán na email.</p>             
            <div class="input-wrapper">
              <label>Kód rozehrané hry</label>
              <input type="text" class="w100" v-model="gameId"/>
            </div>
            <UIButton text="Přihlásit se" @click.native="loadGame()" />
            <div @click="showloadGameInput=false" class="click underline-hover text-center mt-20">Začít hrát novou hru</div>
          </div>  
      </div>
    </div>
  </div>
</template>

<script>
import UIButton from "~/components/ui/UIButton";
export default {
  layout: 'empty',
  components: {
    UIButton
  },
  data() {
    return {
      showloadGameInput: false,
      first_name: '',
      last_name: '',
      sex: '',
      gameId: '',
      alertMsg: ''
    }
  },
  methods: {
    logIn() {
      if(this.first_name && this.last_name && this.sex) {
        let generatedGameId = this.createGameId();
        this.$store.commit('login', {
          game_id: generatedGameId,
          first_name: this.capitalize(this.first_name),
          last_name: this.capitalize(this.last_name),
          sex: this.sex
        });
        localStorage.setItem("gameID", generatedGameId);
        this.$store.dispatch('saveGame');
        this.$router.push('/');
        this.$store.state.modalWindow = {
            modalName: 'Welcome',
        };        
      } else {
        let unfilledFields = [];
          if(!this.first_name) {
            unfilledFields.push('křestní jméno')
          }
          if(!this.last_name) {
            unfilledFields.push('příjmení')
          } 
          if(!this.last_name) {
            unfilledFields.push('pohlaví')
          }
          
          if(unfilledFields.length == 1 ) {
            this.alertMsg = `Nebylo vyplněné pole ${unfilledFields[0]}. Prosím o vyplnění před pokračováním.`;
          } else {
            this.alertMsg = `Nebylo vyplněné pole ${unfilledFields.join(', ')}. Prosím o vyplnění před pokračováním.`;
          }

      }
    },
    loadGame() {
      if(this.gameId) {
        this.$store.dispatch('loadGame', this.gameId);
      }
    },
    createGameId() {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for ( var i = 0; i < 36; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;      
    },
    capitalize(value) {
      return value[0].toUpperCase() + value.slice(1);
    }  
  },
  mounted() {
    if(this.$route.query['logged-out']!==undefined && this.$route.query['logged-out']==null) {
        this.$store.commit('resetState'); 
    }
    if(this.$route.query['load-game']) {
        this.showloadGameInput = true;
        this.gameId = this.$route.query['load-game']; 
    }  
  },
  head () {
      return {
        title: 'Přihlásit se'
      }
  }   
}
</script>

<style lang="scss" scoped>
@import "~/assets/variables.scss";
h1 {
  font-size: 52px;
  color: $primary-color;
  text-align: center;
  margin-bottom: 15px;
}
.login__page {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.login__wrapper {
  max-width: 500px;
  width: 95%;
  margin: 0 auto;
}
.login__form {
  margin-top: 30px;
}
</style>