<template>
  <div style="display: inline-block;">
      <div @click="showQuestion" class="quiz__open-question-btn">?</div>
      <div v-if="isQuestionVisible" class="quiz__overlay" @click.self.prevent="closeQuestion()">
          <div class="quiz__content">
              <button @click="closeQuestion()"><i class="las la-times"></i></button><br/>
              <div class="quiz__question">{{question}}</div>
              <button v-for="(answer, index) in answers" :key="index" @click="checkAnswer(index)" :disabled="disableAnswering">{{answer}}</button>
              <div v-if="!(result.wasAnsweredCorrectly==='')" :class="'quiz__result' + ((result.wasAnsweredCorrectly) ? ' correct' : ' incorrect')">
                {{result.text}}
              </div>
          </div>    
      </div>       
  </div>    
</template>

<script>
export default {
  props: {
    quizAction: Object
  },
  data() {
    return {
      isQuestionVisible: false,
      question: this.quizAction.question,
      answers: this.quizAction.answers,
      rightAnswerPosition: this.quizAction.right_answer_position,
      points: this.quizAction.max_points,
      rightAnswer: '',
      result: '',
      disableAnswering: false
    }
  },
  methods: {
    showQuestion() {
      // get the right answer value and store it
      this.rightAnswer = this.answers[+this.rightAnswerPosition-1];
      // shuffle answers
      this.shuffleAnswers(this.answers);
      // get the position of right answer
      this.rightAnswerPosition = this.answers.indexOf(this.rightAnswer);

      //show questions and answer
      this.isQuestionVisible=!this.isQuestionVisible;
    },
    closeQuestion() {
      this.isQuestionVisible=false;
    },
    shuffleAnswers(array) {
      array.sort(() => Math.random() - 0.5);
    },
    checkAnswer(index) {
      if(this.rightAnswerPosition==index) {
        this.result = {
          wasAnsweredCorrectly: true,
          text: "Správná odpověď! Získáváš " + this.points + " bodů."
        };
        this.$store.state.loggedUser.points += this.points;
      } else {
        this.result = {
          wasAnsweredCorrectly: false,
          text: "Špatná odpověď :(. Bylo ti odebráno " + this.points/2 + " bodů."
        };
        this.$store.state.loggedUser.points += -this.points/2;
      }
      this.disableAnswering = true;
    }
  }

}
</script>

<style lang="scss" scoped>
@import "~/assets/variables.scss";
    .quiz__open-question-btn {
      cursor: pointer;
      background: $primary-color;
      border-radius: 50%;
      color: white;
      font-weight: bold;
      height: 20px;
      width: 20px;
      text-align: center;
    }
    .quiz__overlay {
      display: flex;
      color: white;
      justify-content: center;
      flex-direction: column;
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0,0,0,0.5);
      z-index: 12;      
    }
    .quiz__content {
      text-align: center;
      position: relative;  
      padding: 20px;
      margin: 0 auto;
      width: 100%;
      max-width: 80%;
    } 
    button {
      padding: 10px;
    }  
    .quiz__question {
      font-size: 20px;
      background: white;
      color: black; 
    }
    .quiz__result.correct {
      color: green;
    }    
    .quiz__result.incorrect {
      color: red;
    }
</style>