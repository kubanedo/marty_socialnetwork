<template>
  <div class="main-wrapper">
    <div class="container grid">
      <h1 v-if="error.statusCode === 404">
        {{pageNotFound}}
      </h1>
      <h1 v-else>
        {{otherError}}
      </h1>
      <NuxtLink to="/">
        Vrátit se na úvodní stránku
      </NuxtLink>
    </div>    
  </div>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: (this.error.message) ? this.error.message : 'Stránka nenalezena',
      otherError: 'Nastala chyba'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
