<template>

    <div>


      <ScoreBoard />

      <template v-if="this.question">

        <h1 v-html="this.question">
        </h1>

        <template v-for="(answer, index) in this.answers" v-bind:key="index">      
          <input 
          :disabled="this.answerSubmitted"
          type="radio" 
          name="options" 
          :value="answer"
          v-model="this.chosen_answer">

          <label v-html="answer"></label><br>
        </template>
        <button v-if="!this.answerSubmitted" @click="this.submitAnswer()" class="send" type="button">Send</button>

        <section class="result" v-if="this.answerSubmitted">
          <template v-if="this.chosen_answer == this.correctAnswer">
            <h4>&#9989; Congratulations, the answer "{{this.correctAnswer}}" is correct.</h4>
          </template>
          <template v-else>
            <h4>&#10060;  I'm sorry, you picked the wrong answer. The correct is "{{this.correctAnswer}}".</h4>
          </template>
          <button @click="this.getNewQuestion()" class="send" type="button">Next question</button>
        </section>
      </template>



      

    </div>
</template>

<script lang="ts">

import ScoreBoard from '@/components/ScoreBoard.vue'

export default {

  name: 'App',
  components: {
    ScoreBoard
  },

  data() {
    return {  
        question: undefined,
        incorrectAnswers: undefined,
        correctAnswers: undefined,
        chosen_answer: undefined,
        answerSubmitted: false
      }

  },
  computed: { 
    answers() {
      var answers = JSON.parse(JSON.stringify(this.incorrectAnswers));
      answers.splice(Math.round(Math.random() * answers.length) , 0, this.correctAnswers);
      return answers;
    }
  },
  methods: {
    submitAnswer() {
      if (!this.chosen_answer) {
        alert('Pick one of the options');
      } else {
        this.answerSubmitted = true;
        if (this.chosen_answer == this.correctAnswers) {
          console
        } else {

        }
      }
    }, 

    getNewQuestion() {
      this.answerSubmitted = false;
      this.chosen_answer = undefined;
      this.question = undefined;
      this.axios
    .get('https://opentdb.com/api.php?amount=1')
    .then((response: { data: { results: {
      question: any;
      incorrect_answers: any; correct_answer: any; 
    }[]; }; }) => {
      this.question = response.data.results[0].question;
      this.incorrectAnswers = response.data.results[0].incorrect_answers;
      this.correctAnswers = response.data.results[0].correct_answer;
    })
    }

  },
  created() {
    this.getNewQuestion();
  }
}
</script>

<style lang="scss">

#app {
    font-family: Arial, Helvetica, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smotthing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 60px auto;
    max-width: 960px;

    input[type=radio] {
      margin: 12px 4px;
    }

    button.send {
      margin-top: 12px;
      height: 40px;
      min-width: 120px;
      padding: 0 16px;
      color: #fff;
      background-color: #1867c0;
      border: 1px solid #1867c0;
      cursor: pointer;
    }

  }

/* header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
} */

/* nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
} */

/* @media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
} */
</style>
