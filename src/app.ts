import 'reflect-metadata'
import {createKoaServer} from "routing-controllers"
import ResponseController from './responses/controller'
import ResponseControllerB from './responses/controller2'



export default createKoaServer({
  cors: true,
  controllers: [
    ResponseControllerB,
    ResponseController
  ]
})
