<template>
<div>
        <div class="card card--title">
            <h2>Nastavení profilu</h2>
        </div>    
        <div class="card">       
Jméno<br/> 
<input v-model="userInfo.first_name">  <br/><br/> 
Příjmení<br/> 
<input v-model="userInfo.last_name">  <br/><br/>           
Motto <br/> 
<textarea v-model="userInfo.about_info.motto"></textarea>  <br/> <br/>       
Pohlaví<br/> 
<input type="radio" v-model="userInfo.sex" value="m"> Muž
<input type="radio" v-model="userInfo.sex" value="f"> Žena<br/> <br/>        
Datum narození<br/> 
<input type="date" v-model="userInfo.about_info.day_of_birth">  <br/> <br/> 
Žije ve městě<br/> 
<input v-model="userInfo.about_info.current_town">  <br/><br/> 
Studuje<br/> 
<input v-model="userInfo.about_info.study">  <br/><br/> 
<UIButton text="Uložit nastavení" @click.native="saveSettings()"/>
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
    methods: {
      saveSettings() {
        console.log(this.userInfo);
        this.$store.commit('changeUserInfo', this.userInfo);

          this.$toast('Nastavení uloženo',
              { icon: 'las la-save' }
          ); 
      }
    },
    mounted() {
      let loggedUser = this.$store.getters.getMyUserData;
      this.userInfo = {
        ...this.userInfo,
        first_name: loggedUser.first_name,
        last_name: loggedUser.last_name,
        sex: loggedUser.sex,
        about_info: (loggedUser.about_info ? loggedUser.about_info : {})
      };
    },
    head () {
        return {
          title: 'Nastavení'
        }
    }    
}
</script>

<style lang="scss" scoped>
input, textarea {
  border: 1px solid #000;
}
</style>