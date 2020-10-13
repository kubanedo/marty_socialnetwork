<template>
  <div class="footer">© 2020 <strong>Internet Mall, a.s.</strong> · <a href="#">Více o aplikaci</a></div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import "~/assets/variables.scss";
.footer {
    font-size: 11px;
    position: fixed;
    bottom: 0; 
    padding-bottom: 20px;
    padding-top: 10px;
    background: linear-gradient(0deg, rgba($page-background, 1) 70%, transparent 100%);

    a {
        text-decoration: none;
    }
}
</style>