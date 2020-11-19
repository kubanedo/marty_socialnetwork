<template>
  <div>
        <div class="quiz__header">
            <div :class="'quiz__questionmark' + (isQuestionAnswered ? '' : ' rotate-scale-up')"><div>?</div></div>
            <UICloseBtn class="quiz__close-btn" @click.native="closeWindow" />
        </div>
        <div class="quiz__content">
            <h2>{{quizData.question}}</h2>
            <button v-for="(answer, index) in shuffledAnswers" :key="index" 
                    :class="(buttonsState[index]) ? buttonsState[index] : ''" 
                    @click="checkAnswer(index, answer)" 
                    :disabled="isQuestionAnswered">
            {{answer}}</button>
             <div v-if="isQuestionAnswered && quizData.right_answer_comment" class="result-comment">
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
            shuffledAnswers: [...this.modalData.quizData.answers],
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
            this.rightAnswer = this.shuffledAnswers[+this.rightAnswerPosition-1];
            this.shuffleAnswers(this.shuffledAnswers);
            this.rightAnswerPosition = this.shuffledAnswers.indexOf(this.rightAnswer);
        },
        shuffleAnswers(array) {
            array.sort(() => Math.random() - 0.5);
        },
        checkAnswer(index, answer) {
            if(this.rightAnswerPosition==index) {
                this.result = {
                    isCorrect: true,
                    points: this.points
                };
                this.buttonsState = {
                    [index]: ['animate', 'correct', 'chosen']
                }
                this.$store.commit('changePoints', this.points);                
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
                this.$store.commit('changePoints', -this.points/2);
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
            this.$store.commit('makeQuizAnswered', { 
                quiz_id: this.quizData.quiz_id, 
                orig_answered_position: this.quizData.answers.indexOf(answer),
                was_correct: this.result.isCorrect
            });
        },
        wasAnsweredFromStore() {
            let answeredQuizData = this.$store.getters.getAnsweredQuiz(this.quizData.quiz_id);
            if(answeredQuizData!==undefined) {
                let originalAnswer = this.quizData.answers[answeredQuizData.orig_answered_position];
                let originalAnswerCurrentPosition = this.shuffledAnswers.indexOf(originalAnswer);
                let wasCorrect = (answeredQuizData.orig_answered_position===this.quizData.right_answer_position) ? true : false;

                if(wasCorrect) {
                    this.buttonsState = {
                        [this.rightAnswerPosition]: ['correct']
                    }
                    this.result = {
                        isCorrect: true,
                        points: this.points
                    }                
                } else {
                    this.buttonsState = {
                        [originalAnswerCurrentPosition]: ['not-correct'],
                        [this.rightAnswerPosition]: ['correct']                    
                    }
                    this.result = {
                        isCorrect: false,
                        points: this.points/2
                    }                                
                }                 
                this.isQuestionAnswered = true;
            }            
        }           
    },
    mounted() {
        this.prepareQuestion();
        this.wasAnsweredFromStore();
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
                font-weight: bold;
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