<template>
  <div class="loading-messages">
      <div class="loading__messages-img">
          <div class="user-img"></div>
      </div>
      <div class="loading__messages-info">      
        <div class="text-line profile-name"></div> 
        <div class="text-line"></div> 
        <div class="text-line text-line2"></div>
      </div>
  </div>    
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
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
.loading-messages {
    display: flex;
    padding: 10px;
    margin: 0 10px 0 10px;
}
.loading__messages-img {
    margin-right: 10px;
}
.loading__messages-info {
    width: 100%;
}
.user-img {
    display: block;
    border-radius: 50%;
    height: 45px;
    width: 45px;
    @extend .animated-background;   
}
.text-line {
    height: 16px;
    width: 100%;
    margin-bottom: 5px;
    @extend .animated-background;
}
.profile-name {
    width: 100px;
}
.text-line2 {
    width: 60%;
}
</style>