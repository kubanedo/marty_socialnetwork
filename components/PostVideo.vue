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

<style>

</style>