<template>
    <div class="post">
        <div class="post__head">
                <div class="user-img"></div>
                <div class="post-wrapper">
                    <div class="text-line text-line-19 profile-name"></div>
                    <div class="text-line post-time"></div>                
                </div>
        </div>
        <div class="post__body">
            <div class="post__text">
                <div class="text-line text-line1"></div> 
                <div class="text-line text-line2"></div> 
                <div class="text-line text-line3"></div>
                <div class="text-line text-line4"></div>                                 
            </div>
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
.post {
    padding-bottom: 10px;
    min-height: 300px;
}
.post__head {
    display: grid;
    grid-template-columns: 55px auto -webkit-max-content;
    grid-template-columns: 55px auto max-content;
    margin-bottom: 20px;
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
.text-line-19 {
    height: 19px;
    margin-bottom: 10px;
}
.profile-name {
    width: 100px;
}
.post-time {
    width: 200px;
}
.text-line2 {
    width: 90%;
}
.text-line3 {
    width: 97%;
}
.text-line4 {
    width: 55%;
}
</style>