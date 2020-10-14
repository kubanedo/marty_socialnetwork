<template>
  <div>
        <div class="quiz__header">
            <div class="quiz__questionmark rotate-scale-up"><div>?</div></div>
            <UICloseBtn class="quiz__close-btn" @click.native="closeWindow" />
        </div>
        <div class="quiz__content">
            <h2>{{quizData.question}}</h2>
            <button v-for="(answer, index) in quizData.answers" :key="index" 
                    :class="(buttonsState[index]) ? buttonsState[index] : ''" 
                    @click="checkAnswer(index)" 
                    :disabled="isQuestionAnswered">
            {{answer}}</button>
            {{result}}
        </div>
  </div>
</template>

<script>
import UICloseBtn from "~/components/ui/UICloseBtn";
export default {
    components: {
        UICloseBtn
    },
    props: {
        modalData: {
            type: Object,
            required: true
        }
    },    
    data() {
        return {
            quizData: this.modalData.quizData,  
            rightAnswerPosition: this.modalData.quizData.right_answer_position,
            points: this.modalData.quizData.max_points,
            rightAnswer: '',
            result: '',
            isQuestionAnswered: false,
            buttonsState: {}     
        }
    },
    methods: {
        closeWindow() {
            this.$emit('closeWindow');
        }, 
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
                    isCorrect: true,
                    points: this.points
                };
                this.buttonsState = {
                    [index]: ['animate', 'correct', 'chosen']
                }
                this.$store.state.loggedUser.points += this.points;
            } else {
                this.result = {
                    isCorrect: false,
                    points: this.points/2
                };
                this.buttonsState = {
                    [index]: ['animate', 'not-correct', 'chosen'],
                    [this.rightAnswerPosition]: 'correct'
                }                
                this.$store.state.loggedUser.points += -this.points/2;
            }
            this.isQuestionAnswered = true;
        }           
    }
}
</script>

<style lang="scss" scoped>
@import "~/assets/variables.scss";
    .quiz__header {
      position: relative;  
      display: flex;
      justify-content: flex-end;
      border-bottom: 1px solid $grey-color;
      padding-bottom: 10px;
      margin-bottom: 20px;
    }
    .quiz__questionmark {
      position: absolute; 
      background: $primary-color;
      width: 70px;
      height: 70px;
      left: 50%;
      top: -40px;
      margin-left: -35px;
      color: white;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      border-radius: 50%;
      font-weight: bold;
      font-size: 40px;
      box-shadow: 0px 1px 15px 5px rgba(51, 51, 51, 0.2);  
    }
    .quiz__content {
        h2 {
            text-align: center;
            margin-bottom: 10px;
        }
        button {
            background-color: grey;
            color: white;
            width: 100%;
            font-size: 18px;
            border-radius: 5px;
            padding: 5px 10px;
            margin-bottom: 10px;

            &:hover {
                background-color: lighten(grey, 5);
            }
            &.animate {
                transition: background-color ease-in-out 2s, transform ease-in-out 2s;                
            }
            &.correct {
                background-color: green;
            }
            &.not-correct {
                background-color: red;
            }
            &.chosen {
                transform: scale(1.1)
            }            
        }
    }
    .rotate-scale-up {
        animation: rotate-scale-up 0.65s linear both;
    }
    @keyframes rotate-scale-up {
        0% {
            transform: scale(1) rotateZ(0);
        }
        50% {
            transform: scale(1.5) rotateZ(180deg);
        }
        100% {
            transform: scale(1) rotateZ(360deg);
        }
    }

</style>