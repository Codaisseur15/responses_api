import {
  JsonController, Authorized, CurrentUser, Post, Param, BadRequestError, HttpCode, NotFoundError, Get, Delete, HeaderParam
} from 'routing-controllers'
import { Response } from './entities'
export const baseUrl='http://localhost:4008'

@JsonController()
export default class ResponseControllerB {

  @Get('/responses')
  async allResponses(
    @HeaderParam("x-user-role") userRole : string,
    @HeaderParam("x-user-id") userId : number,
  ) {
  if (userRole !== 'teacher' && userId === null) throw new NotFoundError('You are not authorised')

  const responses = await Response.find()
  return { responses }
  }

  @Get('/responses/:id')
  getResponse(
    @Param('id') id: number,
    @HeaderParam("x-user-role") userRole : string,
    @HeaderParam("x-user-id") userId : number,
  ) {
    if (userRole !== 'teacher' && userId === null) throw new NotFoundError('You are not authorised')

    return Response.findOneById(id)
  }

  @Delete('/responses/:id([0-9]+)')
    @HttpCode(201)
    async deleteResponse(
      @Param('id') id: number,
      @HeaderParam("x-user-role") userRole : string,
      @HeaderParam("x-user-id") userId : number,
    ) {
      if (userRole !== 'teacher' && userId === null) throw new NotFoundError('You are not authorised')

      const response = await Response.findOneById(id)
      if (!response) throw new NotFoundError ('Response not found')
      await response.remove()

      return {
        message: "You succesfully deleted the response"
      }
    }

  @Delete('/responses/courses/:courseId([0-9]+)')
  @HttpCode(201)
     async deleteCourse(
       @Param('courseId') courseId: number,
       @HeaderParam("x-user-role") userRole : string,
       @HeaderParam("x-user-id") userId : number,
     ){

      if (userRole !== 'teacher' && userId === null) throw new NotFoundError('You are not authorised')

      const courses= await Response.find({courseId})
      await courses.forEach(course => course.remove())

       return {
           message: "You succesfully deleted all responses related to the removed course"
       }

       }

   @Delete('/responses/quizzes/:quizId([0-9]+)')
   @HttpCode(201)
      async deleteQuiz(
        @Param('quizId') quizId: number,
        @HeaderParam("x-user-role") userRole : string,
        @HeaderParam("x-user-id") userId : number,

      ){
        if (userRole !== 'teacher' && userId === null) throw new NotFoundError('You are not authorised')

        const quizzes= await Response.find({quizId})
        await  quizzes.forEach(quiz => quiz.remove())
        return {
            message: "You succesfully deleted all responses related to the removed quiz"
        }
      }







}
