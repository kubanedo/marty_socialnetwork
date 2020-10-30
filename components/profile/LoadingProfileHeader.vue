<template>
    <div class="profile__header-wrapper">
        <div class="profile__header">

        </div> 
        <div class="profile__header-menu">
            <div class="container">
              <ul>
                 <li></li>
                 <li></li>   
                 <li></li>
                 <li></li>                         
              </ul>    
            </div>
        </div>
    </div>   
</template>

<script>
export default {
      
}
</script>

<style lang="scss" scoped>
@import "~/assets/variables.scss";
@import "~/assets/loading-animation.scss";

.profile__header {
  position: relative;
  background-color: grey;
  background-size: cover;
  background-position: center center;
  @extend .animated-background;
      min-height: 280px;
}
.profile__header-wrapper {
  position: relative;
  max-width: 1040px;
  width: 95%;
  margin: 0 auto;
  border-radius: 5px;
  margin-bottom: 30px;
  box-shadow: 0px 1px 15px 0px rgba(51, 51, 51, 0.2);
}
.profile__header-menu {
  margin-bottom: 20px;
  background: white;

  .container {
    max-width: 1040px;
    margin: 0 auto;
  }

  ul {
    position: relative;
    left: 220px;    
    display: inline-flex;
    margin-bottom: 0;
    list-style: none;     
      li {
          @extend .animated-background;
          height: 14px;
          width: 80px; 
      padding: 10px 20px;
      padding-bottom: 14px;
            border-top: 4px solid white;
            display: block;  
            margin-right: 20px;          
      }
  }
}
</style>