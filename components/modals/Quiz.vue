<template>
  <div>
        <div class="quiz__header">
            <div class="quiz__questionmark rotate-scale-up"><div>?</div></div>
            <UICloseBtn class="quiz__close-btn" @click.native="closeWindow" />
        </div>
        <div class="quiz__content">
            <h2>{{quizData.question}}</h2>
            <button v-for="(answer, index) in answers" :key="index" 
                    :class="(buttonsState[index]) ? buttonsState[index] : ''" 
                    @click="checkAnswer(index)" 
                    :disabled="isQuestionAnswered">
            {{answer}}</button>
             <div v-if="result && quizData.right_answer_comment" class="result-comment">
                 <small><i class="las la-sms"></i> <strong>Komentář ke správné odpovědi:</strong></small><br/>
                 {{quizData.right_answer_comment}}
             </div>           
        </div>
  </div>
</template>

<script>
import UICloseBtn from "~/components/ui/UICloseBtn";
import UIHtmlToast from "~/components/ui/UIHtmlToast";
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
            answers: [...this.modalData.quizData.answers],
            rightAnswer: null,
            result: null,
            isQuestionAnswered: false,
            buttonsState: {}     
        }
    },
    methods: {
        closeWindow() {
            this.$emit('closeWindow');
        }, 
        prepareQuestion() {
            this.rightAnswer = this.answers[+this.rightAnswerPosition-1];
            this.shuffleAnswers(this.answers);
            this.rightAnswerPosition = this.answers.indexOf(this.rightAnswer);
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
                this.$toast.success({
                    component: UIHtmlToast, 
                    props: {
                        html_content: `Správně! Do konta bylo připsáno <strong>${this.points} bodů</strong>.`
                        }
                    },
                    { icon: 'las la-coins' }
                ); 
            } else {
                this.result = {
                    isCorrect: false,
                    points: this.points/2
                };
                this.buttonsState = {
                    [index]: ['animate', 'not-correct', 'chosen'],
                    [this.rightAnswerPosition]: ['animate','correct']
                }                
                this.$store.state.loggedUser.points += -this.points/2;
                this.$toast.error({
                    component: UIHtmlToast, 
                    props: {
                        html_content: `Špatně! Z konta bylo odepsáno <strong>${this.points/2} bodů</strong>.`
                        }
                    },
                    { icon: 'las la-coins' }
                );               
            }
            this.isQuestionAnswered = true;
        }           
    },
    mounted() {
        this.prepareQuestion();
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
            background-color: darken($page-background, 3);
            color: black;
            width: 100%;
            font-size: 18px;
            border-radius: 5px;
            padding: 5px 10px;
            margin-bottom: 10px;
            &:active {
                transform: scale(0.97);
            }

            &:hover:enabled {
                background-color: $page-background;
            }
            &.animate {
                transition: background-color ease-in-out 2s, transform ease-in-out 2s, color ease-in-out 2s;                
            }
            &.correct {
                color: white;
                background-color: #4caf50;
                transform: scale(1.025);
            }
            &.not-correct {
                color: white;
                background-color: #ff5252;
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
    .result-comment {
      border-radius: 5px; 
      border: 1px dotted black; 
      color: black;
      padding: 10px 20px;
      margin-top: 20px;  
    }
</style>