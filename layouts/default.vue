<template>
  <div>
      <header>
          <div class="container">
            <nav class="header__nav">  
                <ul>
                    <li><nuxt-link to="/">Úvod</nuxt-link></li>
                    <li><nuxt-link to="/messages">Zprávy</nuxt-link></li> 
                    <li><nuxt-link to="/notifications">Upozornění</nuxt-link></li>  
                </ul>
            </nav>
            <div class="header__logo-wrapper">
                <nuxt-link to="/"><h1>fakebook</h1></nuxt-link>
            </div>
            <div class="header__user-panel">
                <HeaderUserPanel />
            </div>            
          </div>     
      </header>     
    <Nuxt />
    <Chat :isActive="isChatActive"/>
  </div>
</template>

<script>
import Chat from "~/components/Chat";
export default {
   components: {
     Chat
   },
  computed: {
      isChatActive() {
          return this.$store.state.isChatActive;
      }        
  }   
}
</script>

<style lang="scss">
@import "~/assets/variables.scss";
body {
    color: #444444;
    line-height: 1.7;
    font-size: 14px;
    font-weight: 400;
    background-color: #f1f1f1; 
    font-family: "Roboto", sans-serif;   
}
a {
   color: $primary-color; 
}
a:hover {
   text-decoration: none; 
}
.container {
    max-width: 1430px;
    width: 95%;
    margin: 0 auto;
}
header {
  width: 100%;
  position: fixed;
  box-shadow: 0 0 8px 1px rgba(0, 0, 0, 0.2);
  padding: 10px;
  background: white;
  z-index: 5;

  .container {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
  }

  .header__nav ul li {
      display: inline-block;
      margin-right: 30px;
  }
  .header__user-panel {
      text-align: right;
  }
  .header__logo-wrapper {
      text-align: center;
  }
}
.main-wrapper {
    padding-top: 110px;
    .homepage-grid {
        display: grid;
        grid-template-columns: 1fr 2fr 1fr;
        gap: 30px;
    }
}
.card, .post {
  background: white;  
  box-shadow: 0px 1px 15px 0px rgba(51, 51, 51, 0.2);
  padding: 20px;
  margin-bottom: 30px; 
  border-radius: 5px; 
}
.card--noshadow {
    box-shadow: unset;
}
.profile-name {
    font-weight: bold;
    font-size: 15px;
    text-decoration: none;
    color: black;
}
</style>
