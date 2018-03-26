//Given an array of answers, we need to compute the score for a right and wrong answer
export const scoresForAnswers = (answers) => {
  return {
    right: 1/(answers.filter(ans => ans.correct===true)).length,
    wrong: -1/(answers.filter(ans => ans.correct===false)).length
  }
}


//Compute the score for each question in an array of questions
//Max score for a question is 1
export const scoresForQuestions = (questions, quizResponse) => {
  let scores ={}
  questions.map(quest => {
    const scoreForThis = scoresForAnswers(quest.answers)
    const scoreList = quest.answers.map(ans => {
      if (quizResponse[quest.id].includes(ans.id) && ans.correct)
        return scoreForThis.right
      if (quizResponse[quest.id].includes(ans.id) && !ans.correct)
        return scoreForThis.wrong
      if (!quizResponse[quest.id].includes(ans.id))
        return 0
    })
    const score = scoreList.reduce((sum, s) => sum + s, 0)
    return (
      scores[quest.id] = score<0? 0 : score
    )
  })
  return scores
}

//Compute the score for a quiz
//Max score is number of questions
export const scoresForQuiz = (quiz, quizResponse) => {
  const questionsScore = scoresForQuestions(quiz.questions, quizResponse)
  return Object.keys(questionsScore)
        .reduce((sum,k)=> sum+questionsScore[k],0)
}

export const averageScore = (listOfresponses) => {
  return listOfresponses.reduce((sum,res)=> sum + res.score,0)/listOfresponses.length
}
