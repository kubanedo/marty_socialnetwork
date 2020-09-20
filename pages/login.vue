<template>
  <div>
    Křestní jméno
    <input type="text" v-model="first_name"/>
    Příjmení
    <input type="text" v-model="last_name"/>
    Pohlaví
    <input type="radio" v-model="sex" value="m"> Muž
    <input type="radio" v-model="sex" value="f"> Žena
    <UIButton text="Přihlásit se" @click.native="logIn()" />
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
        first_name: this.first_name,
        last_name: this.last_name,
        sex: this.sex
      });
      this.$router.push('/')
    }  
  }
}
</script>

<style>

</style>