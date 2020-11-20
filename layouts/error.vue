<template>
  <div class="main-wrapper">
    <div class="container">
      <div class="card text-center">
          <div class="circle-icon">
              <i class="las la-frown"></i>
          </div>                 

          <h1 v-if="error.statusCode === 404">
            {{pageNotFound}}
          </h1>
          <h1 v-else>
            {{otherError}}
          </h1>
          <NuxtLink to="/">
            <UIButton class="mt-10"><i class="las la-arrow-left"></i> Vrátit se na úvodní stránku</UIButton>
          </NuxtLink>
       </div>
    </div>    
  </div>
</template>

<script>
import UIButton from "~/components/ui/UIButton";
export default {
  layout: 'empty',
  components: {
    UIButton
  },
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: (this.error.message=="This page could not be found") ? 'Stránka nenalezena' : this.error.message,
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
.container {
  max-width: 600px;
}
.circle-icon {
  font-size: 50px;
  height: 70px;
  width: 70px;
}
</style>
