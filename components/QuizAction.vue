<template>
  <div class="quiz__wrapper">
      <div @click="showQuestion" class="quiz__open-question-btn">?</div>     
  </div>    
</template>

<script>
export default {
  props: {
    quizAction: Object
  },
  methods: {
    showQuestion() {
      this.$store.state.modalWindow = {
          modalName: 'Quiz',
          quizData: {...this.quizAction}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/variables.scss";
    .quiz__wrapper {
      display: inline-block;      
    }
    .quiz__open-question-btn {
      cursor: pointer;
      background: $primary-color;
      border-radius: 50%;
      color: white;
      font-weight: bold;
      height: 20px;
      width: 20px;
      text-align: center;
      &:hover {
        background: darken($primary-color, 5);
      }
    }
</style>