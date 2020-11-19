<template>
  <div v-if="quizAction.quiz_id" class="quiz__wrapper">
      <div @click="showQuestion" :class="classes">
        <span>?</span>
      </div> 
      <div class="result" v-if="wasAnswered">
        <span v-if="wasCorrect" style="color: green;"><i class="las la-check"></i></span>
        <span v-else style="color: red;"><i class="las la-times"></i></span>
      </div>
  </div>    
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    quizAction: Object
  },
  computed: {
    wasAnswered() {
      return (this.$store.getters.getAnsweredQuiz(this.quizAction.quiz_id) ? true : false);
    },
    wasCorrect() {
      return (this.wasAnswered ? this.$store.getters.getAnsweredQuiz(this.quizAction.quiz_id).was_correct : null);
    },
    classes() {
      let classes = ["quiz__open-question-btn"];
      if(this.wasAnswered) {
        classes.push('answered');
      }
      return classes;
    }    
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
      position: relative;
      display: inline-flex;      
    }
    .quiz__open-question-btn {
      position: relative;
      z-index: 2;
      background: $primary-color;
      cursor: pointer;
      border-radius: 50%;
      color: white;
      font-weight: bold;
      height: 20px;
      line-height: 1.5;
      width: 20px;
      text-align: center;
      &:hover {
        background: darken($primary-color, 5);
      }
    }
    .answered {
      background: darken(grey, 2);
    }
    .result {
      margin-left: -13px;
      background: lighten(silver, 18);
      border-radius: 30px;
      height: 20px;
      line-height: 1.5;
      padding-left: 15px;
      padding-right: 5px;
    }
    .answered-correctly {
      background: green;
      opacity: 0.5;
      &:hover {
        background: green; 
      }     
    }
    .answered-wrongly {
       background: red;
       opacity: 0.5;
      &:hover {
        background: red; 
      }      
    }    
</style>