<template>
  <div class="embed-wrapper">
    <div class="embed">
        <iframe v-observe-visibility="{
                callback: visibilityChanged,
                intersection: {
                    rootMargin: '1000px 0px 1000px 0px',
                    threshold: 0.9,
                },
            }" scrolling="no" :src="embedLink" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen=""></iframe>
    </div>
  </div>  
</template>

<script>
import VueObserveVisibility from 'vue-observe-visibility'
export default {
    props: {
        embedURL: String
    },
    data() {
        return {
             embedLink: this.embedURL
        }
    },
    methods: {
        visibilityChanged(isVisible) {
            /*stops playing video, if video is out of viewport */
            if(!isVisible) {
                this.embedLink = this.embedURL + '?not-visible';
            } else {
                this.embedLink = this.embedURL;
            }
        }
    }
}
</script>

<style scoped>
.embed-wrapper {
    max-width: 800px;
    max-height: 450px;
    height: 100%;
    width: 100%;
    overflow: hidden;
    margin: 0 auto;
}
.embed {
    background: black;
    position: relative;
    overflow: hidden;
    padding-top: 56.25%;
}
.embed iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
    overflow: hidden;
}
</style>