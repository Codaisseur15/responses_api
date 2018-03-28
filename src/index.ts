import 'reflect-metadata'
import {createKoaServer} from "routing-controllers"
import ResponseController from './responses/controller'
import setupDb from './db'
import ResponseControllerB from './responses/controller2'

const port = process.env.PORT || 4001

const app = createKoaServer({
  controllers: [
    ResponseControllerB,
    ResponseController
  ]
})

setupDb()
  .then(_ => {
    app.listen(port, () => console.log(`Listening on port ${port}`))
  })
  .catch(err => console.error(err))
