<template>
   <div v-html="html_content"></div>
</template>

<script>
export default {
    props: {
        html_content: {
            type: String,
            required: true
        }
    }
}
</script>

<style>

</style>