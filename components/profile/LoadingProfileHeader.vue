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
@keyframes placeHolderShimmer{
    0%{
        background-position: -468px 0
    }
    100%{
        background-position: 468px 0
    }
}

.animated-background {
    animation-duration: 1.25s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: placeHolderShimmer;
    animation-timing-function: linear;
    background: #F6F6F6;
    background: linear-gradient(to right, #F6F6F6 8%, #F0F0F0 18%, #F6F6F6 33%);
    background-size: 800px 104px;
    height: 96px;
    position: relative;
}
.profile__header {
  position: relative;
  min-height: 280px;
  @extend .animated-background;
  background-size: 1200px 104px;   
}
.profile__header-menu {
  margin-bottom: 20px;
  background: white;

  ul {
    display: flex;
    padding-left: 0;
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
            margin-right: 10px;          
      }
  }
}
</style>