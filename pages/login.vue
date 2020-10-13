<template>
  <div>
    <p>Přihlašte se do naší nepravé sociální sítě a ověřte si, že víte, jak se na sociálních sítích správně chovat. Za každou správně provedenou akci/odpovězenou otázku, získáte určitý počet bodů. Za špatně provedené akce či odpovězené otázky je odebrána polovina bodů, které bylo možno získat. Provedete všechny úkoly a získáte největší počet bodů?</p>
    Křestní jméno
    <input type="text" v-model="first_name"/><br/>
    Příjmení
    <input type="text" v-model="last_name"/><br/>
    Pohlaví
    <input type="radio" v-model="sex" value="m"> Muž
    <input type="radio" v-model="sex" value="f"> Žena<br/>
    <UIButton text="Přihlásit se" @click.native="logIn()" />
    <button @click="$router.push('/')">zpět</button>
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
      first_name: '',
      last_name: '',
      sex: ''
    }
  },
  methods: {
    logIn() {
      this.$store.commit('login', {
        game_instance_id: this.createGameInstanceID(),
        first_name: this.first_name,
        last_name: this.last_name,
        sex: this.sex
      });
      this.$router.push('/')
    },
    createGameInstanceID() {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for ( var i = 0; i < 12; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;      
    } 
  }
}
</script>

<style lang="scss" scoped>
input {
  border: 1px black solid;
}
</style>