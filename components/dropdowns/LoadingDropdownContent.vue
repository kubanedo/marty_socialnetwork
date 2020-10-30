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
@import "~/assets/loading-animation.scss";
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