<template>
  <div contenteditable="true" @input="updateHTML"></div>
</template>

<script>
export default {
  props:['value'],
  mounted() {
    this.$el.innerHTML = this.value;
  },
  methods: {
    updateHTML(e) {
      this.$emit('input', e.target.innerHTML);
    }
  }  
}
</script>

<style lang="scss" scoped>
@import "~/assets/variables.scss";
div {
  background: $input-color;
  width: 100%;
  border-radius: 5px;
  margin-right: 10px;
  padding: 10px;
  color: black;  
}
</style>