import 'mocha'
import {equal, deepEqual} from 'assert'
import { scoresForAnswers, scoresForQuestions, scoresForQuiz, averageScore } from './functions'


const quiz = {
  id:2,
  question: [
    {
      id:1,
      answer: [{
        id:1,
        correct:false,
        text:'answer 1'
      },{
        id:2,
        correct:true,
        text:'answer 2'
      },{
        id:3,
        correct:true,
        text:'answer 3'
      },{
        id:4,
        correct:true,
        text:'answer 4'
      }]
    },{
      id:2,
      answer: [{
        id:6,
        correct:false,
        text:'answer 1'
      },{
        id:7,
        correct:true,
        text:'answer 2'
      },{
        id:8,
        correct:false,
        text:'answer 3'
      },{
        id:9,
        correct:true,
        text:'answer 4'
      }]
    }
  ]
}

const quizResponse = {
  1:[2,3],
  2:[6]
}


describe('scoresForAnswers()', () => {

  it('should give 1 for right and -1 for wrong if we have two answers and either only one of them is right', () => {
    const answers=[{
      id: 1,
      correct: false,
      text: 'answer 1'
    },{
      id: 2,
      correct: true,
      text: 'answer 2'
    }]
    deepEqual(scoresForAnswers(answers), {right:1, wrong:-1})
  })

  it('should give 0 as value for wrong if all answers are true', () => {
    const answers=[{
      id: 1,
      correct: true,
      text: 'answer 1'
    },{
      id: 2,
      correct: true,
      text: 'answer 2'
    }]
    equal(scoresForAnswers(answers).wrong, 0)
  })

  it('should give around 0.33 as value for right if three answers are true', () => {
    const answers=[{
      id: 1,
      correct: true,
      text: 'answer 1'
    },{
      id: 2,
      correct: true,
      text: 'answer 2'
    },{
      id:3,
      correct:false,
      text: 'answer 3'
    },{
      id:4,
      correct:true,
      text: 'answer 4'
    }]
    equal(Math.round(scoresForAnswers(answers).right*100)/100, 0.33)
  })

  it('should give 0 as value for right if all answers are false', () => {
    const answers=[{
      id: 1,
      correct: false,
      text: 'answer 1'
    },{
      id: 2,
      correct: false,
      text: 'answer 2'
    }]
    equal(scoresForAnswers(answers).right, 0)
  })
})

describe('scoresForQuestions()', () => {
  it('should give {1:0.67,2:0} for the example models', () => {
    deepEqual(scoresForQuestions(quiz.question,quizResponse), {1:0.67, 2:0})
  })
})

describe('scoresForQuiz()', () => {
  it('should give 0.67 for the example models', () =>{
    equal(scoresForQuiz(quiz,quizResponse), 0.67)
  })
})
