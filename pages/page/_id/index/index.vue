<template>
    <PostsLoop :filterByAuthor="$route.params.id" />  
</template>

<script>
import PostsLoop from "~/components/PostsLoop";
export default {
    components: {
        PostsLoop
    }
}
</script>

<style>

</style>