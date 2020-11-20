<template>
<div>
        <div class="card card--title">
            <h2>Nastavení profilu</h2>
        </div>    
        <div class="card"> 
<div class="input-wrapper">                
  <label>Jméno</label> 
  <input v-model="userInfo.first_name">
</div>
<div class="input-wrapper"> 
  <label>Příjmení</label> 
  <input v-model="userInfo.last_name">
</div> 
<div class="input-wrapper">          
  <label>Motto</label> 
  <textarea class="w100" v-model="userInfo.about_info.motto"></textarea>
</div> 
<div class="input-wrapper">     
  <label>Pohlaví</label>
  <input type="radio" v-model="userInfo.sex" value="m"> Muž
  <input type="radio" v-model="userInfo.sex" value="f"> Žena
</div>       
<div class="input-wrapper">
  <label>Datum narození</label>
  <input type="date" v-model="userInfo.about_info.day_of_birth">
</div>
<div class="input-wrapper">
  <label>Žije ve městě</label> 
  <input v-model="userInfo.about_info.current_town">
</div> 
<div class="input-wrapper">
  <label>Studuje</label>
  <input v-model="userInfo.about_info.study">
</div>
<UIButton class="mt-10" text="Uložit nastavení" @click.native="saveSettings()"/>
        </div>        
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
        userInfo: {
          first_name: '',
          last_name: '',
          about_info: {},
          sex: ''
        }
      }
    },
    computed: {
      myUserData() {
          return this.$store.getters.getMyUserData
      }
    },
    methods: {
      saveSettings() {
        console.log(this.userInfo);
        this.$store.commit('changeUserInfo', this.userInfo);

          this.$toast('Nastavení uloženo',
              { icon: 'las la-save' }
          ); 
      },
      getMyUserData() {
        let loggedUser = this.$store.getters.getMyUserData;
        this.userInfo = {
          ...this.userInfo,
          first_name: loggedUser.first_name,
          last_name: loggedUser.last_name,
          sex: loggedUser.sex,
          about_info: (loggedUser.about_info ? loggedUser.about_info : {})
        };        
      }
    },
    watch: {
      myUserData() {
        this.getMyUserData();
      }
    },
    mounted() {
      this.getMyUserData();
    },
    head () {
        return {
          title: 'Nastavení'
        }
    }    
}
</script>

<style lang="scss" scoped>
</style>