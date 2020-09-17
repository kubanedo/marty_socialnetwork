<template>
    <div class="user__img" :style="{ backgroundImage: 'url(' + imgURL + ')', width: imgSize + 'px', height: imgSize + 'px' }">
        <div v-if="status==1" :class="'user__status status--' + status" :style="{width: imgSize * 0.33 + 'px', height: imgSize * 0.33 + 'px', border: imgSize * 0.067 + 'px solid ' + statusBorderColor}"></div>
    </div>
</template>

<script>
export default {
    props: {
        imgURL: { 
            type: String,
            required: true
        },
        imgSize: { 
            type: Number,
            default: 45
        },
        status: { 
            type: Number,
            default: 0
        },
        statusBorderColor: {
            type: String,
            default: 'white'
        }
    }
}
</script>

<style>
.user__img {
  position: relative;
  display: block;  
  background-color: silver;  
  border-radius: 50%;
  background-size: contain;
  background-position: center;
}
.user__status {
    position: absolute;
    background-color: grey;
    border-radius: 50%;
    right: 0;
    bottom: -3px;
}
.status--1 {
    background-color: green;
}
</style>