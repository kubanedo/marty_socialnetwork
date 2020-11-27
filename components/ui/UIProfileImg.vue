<template>
    <div class="user__img" :style="style">
        <div v-if="status==1" :class="'user__status status--' + status" :style="{width: imgSize * 0.33 + 'px', height: imgSize * 0.33 + 'px', border: imgSize * 0.04 + 'px solid ' + statusBorderColor}"></div>
    </div>
</template>

<script>
export default {
    props: {
        imgURL: { 
            type: String,
        },
        userID: {
            type: String,
        },
        imgSize: { 
            type: Number
        },
        imgBorderColor: {
            type: String
        },
        status: { 
            type: Number,
            default: 0
        },
        statusBorderColor: {
            type: String,
            default: 'white'
        }
    },
    data() {
        return {
            imgLink: this.imgURL || 'http://jakubnedorost.cz/marty/images/profiles/' + this.userID + '/profileimg.jpg',
            style: {}
        }
    },
    watch: {
        userID(value) {
            this.imgLink = 'http://jakubnedorost.cz/marty/images/profiles/' + value + '/profileimg.jpg';
        }
    },
    mounted() {
        if(this.userID=='me') {
            this.imgLink = this.$store.state.loggedUser.profileImg
        }
        this.style = { 
                backgroundImage: 'url(' + this.imgLink + ')', 
                width: this.imgSize + 'px', 
                height: this.imgSize + 'px', 
                border: '1px solid ' + this.imgBorderColor 
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
  background-repeat: no-repeat;
  background-position: center;
  width: 45px;
  height: 45px
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