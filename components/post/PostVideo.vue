<template>
  <div class="embed-wrapper">
    <div class="embed">
        <iframe scrolling="no" :src="embedURL" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen=""></iframe>
    </div>
  </div>  
</template>

<script>
export default {
    props: {
        embedURL: String
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