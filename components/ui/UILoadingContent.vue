<template>
    <div class="loading-content">
        <div v-if="title" class="text-line text-line-big"></div>
        <div v-for="(item, index) in numberOfLines" :key="index" :class="'text-line' + randomWidthClass()"></div>           
    </div>  
</template>

<script>
export default {
    props: {
        title: {
            type: Boolean,
            default: true
        },
        numberOfLines: {
            type: Number,
            default: 7
        }
    },
    methods: {
        randomWidthClass() {
            return " text-line" + Math.floor(Math.random() * this.numberOfLines + 1);
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~/assets/loading-animation.scss";
.loading-content {
    min-height: 150px;
}
.text-line {
    height: 16px;
    width: 100%;
    margin-bottom: 5px;
    @extend .animated-background;
}
.text-line-big {
    height: 20px;
    max-width: 200px;
    margin-bottom: 20px;
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