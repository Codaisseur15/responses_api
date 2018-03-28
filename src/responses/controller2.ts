import {
  JsonController, Authorized, CurrentUser, Post, Param, BadRequestError, HttpCode, NotFoundError, ForbiddenError, Get,
  Body, Patch, Delete
} from 'routing-controllers'
import { Response } from './entities'
export const baseUrl='http://localhost:4008'

@JsonController()
export default class ResponseControllerB {

  @Get('/responses')
  async allResponses() {
  const responses = await Response.find()
  return { responses }
  }

  @Get('/responses/:id')
  getResponse(
    @Param('id') id: number
  ) {
    return Response.findOneById(id)
  }

  @Delete('/responses/:id([0-9]+)')
    @HttpCode(201)
    async deleteResponse(
      @Param('id') id: number
    ) {
      const response = await Response.findOneById(id)
      await response.remove()

      return {
        message: "You succesfully deleted the response"
      }
    }

  @Delete('/responses/courses/:courseId([0-9]+)')
  @HttpCode(201)
     async deleteCourse(
       @Param('courseId') courseId: number
     ){

       const courses= await Response.find({courseId})
       await  courses.map(course => course.remove())

       }

   @Delete('/responses/quizzes/:quizId([0-9]+)')
   @HttpCode(201)
      async deleteStudent(
        @Param('quizId') quizId: number
      ){
        const quizzes= await Response.find({quizId})
        await  quizzes.map(quiz => quiz.remove())
      }







}
