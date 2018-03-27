import {
  JsonController, Authorized, CurrentUser, Post, Param, BadRequestError, HttpCode, NotFoundError, ForbiddenError, Get,
  Body, Patch
} from 'routing-controllers'
import { Response} from './entities'
import {scoresForQuiz,averageScore} from '../lib/functions'
export const baseUrl = 'http://localhost:4008'
import * as request from 'superagent'

@JsonController()
export default class ResponseController {

  @Post('/responses')
  @HttpCode(201)
  async createGame(
    @Body() {courseId, quizId, studentId, quizResponse}
  ) {
    var quiz
    await request
      .get(`${baseUrl}/quizzes/${quizId}`)
      .then(result => {
        quiz=result.body
      })
      .catch(err => {
        console.log(err)
        throw new BadRequestError(`Quiz does't exist`)
      })
     const score = scoresForQuiz(quiz,quizResponse)
     const maxScore = quiz.question.length

     const entity = await Response.create({quizId, studentId, courseId, quizResponse, score, maxScore})
                                  .save()

    const response = await Response.findOneById(entity.id)
    if (!response) throw new BadRequestError(`Response does not exist`)

    return response
  }

  @Get('/results/quiz=:quizId/course=:courseId')
  async getResults(
    @Param('quizId') quizId: number,
    @Param('courseId') courseId: number
  ) {
    const responseList = await Response.find({courseId,quizId})
    if (responseList.length===0) throw new NotFoundError('No result')
    const averagePercent = (averageScore(responseList)*100)/responseList[0].maxScore
    return {
      quizId,
      courseId,
      numberOfTakers:responseList.length,
      average:Math.round(averagePercent*100)/100
    }
  }
}
