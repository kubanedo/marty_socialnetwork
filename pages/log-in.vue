<template>
  <div>
    Křestní jméno
    <input type="text" v-model="firstName"/>
    Příjmení
    <input type="text" v-model="lastName"/>
    Pohlaví
    <input type="radio" v-model="sex" value="m"> Muž
    <input type="radio" v-model="sex" value="f"> Žena
    <UIButton text="Přihlásit se" @click.native="logIn()" />
  </div>
</template>

<script>
import UIButton from "~/components/ui/UIButton";
export default {
  components: {
    UIButton
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      sex: ''
    }
  },
  methods: {
    logIn() {
      this.$store.commit('login', {
        firstName: this.firstName,
        lastName: this.lastName,
        sex: this.sex
      });
      this.$router.push('/')
    }  
  }
}
</script>

<style>

</style>