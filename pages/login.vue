<template>
  <div class="login__page">
    <div class="login__wrapper">
      <h1>#fejkbuk</h1>
      <p>Přihlašte se do naší nepravé sociální sítě a ověřte si, že víte, jak se na sociálních sítích správně chovat. Za každou správně provedenou akci/odpovězenou otázku, získáte určitý počet bodů. Za špatně provedené akce či odpovězené otázky je odebrána polovina bodů, které bylo možno získat. Provedete všechny úkoly a získáte největší počet bodů?</p>
      <div class="login__form">
          <div class="login__newgame" v-if="!showloadGameInput">
            <label>Křestní jméno</label><br/>
            <input type="text" v-model="first_name"/><br/>
            <label>Příjmení</label><br/>
            <input type="text" v-model="last_name"/><br/>
            <label>Pohlaví</label><br/>
            <input type="radio" v-model="sex" value="m"> Muž
            <input type="radio" v-model="sex" value="f"> Žena<br/><br/>
            <UIButton text="Registrovat a přihlásit se" @click.native="logIn()" /><br/>
            <div @click="showloadGameInput=true">Už jsem registrován/a, chci načíst rozehranou hru</div><br/>
          </div>  
          <div class="login__loadgame" v-else>
            <p>Níže zadejte kód rozehrané hry, který vám byl zaslán na email.</p>
            <label>Kód rozehrané hry</label><br/>
            <input type="text" v-model="gameId"/><br/>
            <UIButton text="Přihlásit se" @click.native="loadGame()" />
            <div @click="showloadGameInput=false">Začít hrát novou hru</div>
            <div v-if="$route.query['game-not-found']===null">
              Hra nenalezena
            </div>  
          </div>  
        <button @click="$router.push('/')">zpět</button>
      </div>
    </div>
  </div>
</template>

<script>
import UIButton from "~/components/ui/UIButton";
export default {
  layout: 'login',
  components: {
    UIButton
  },
  data() {
    return {
      showloadGameInput: false,
      first_name: '',
      last_name: '',
      sex: '',
      gameId: ''
    }
  },
  methods: {
    logIn() {
      if(this.first_name && this.last_name && this.sex) {
        let generatedGameId = this.createGameId();
        this.$store.commit('login', {
          game_id: generatedGameId,
          first_name: this.first_name,
          last_name: this.last_name,
          sex: this.sex
        });
        localStorage.setItem("gameID", generatedGameId);
        this.$store.dispatch('saveGame');
        this.$router.push('/')
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
    } 
  },
  mounted() {
    console.log(this.$route.query['game-not-found']);
    console.log('routequery', this.$route.query['logged-out']);
    if(this.$route.query['logged-out']!==undefined && this.$route.query['logged-out']==null) {
        this.$store.commit('resetState'); 
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
h1 {
  color: white;
  font-size: 62px;
  text-align: center;
}
label {
  display: inline-block;
  margin-top: 5px;
  font-weight: bold;
}
input {
  border: 1px black solid;
  border-radius: 5px;
  background: white;
}
.login__page {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.login__wrapper {
  color: white;
  max-width: 600px;
  width: 95%;
  margin: 0 auto;
}
.login__form {
  margin-top: 10px;
}
</style>