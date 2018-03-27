import 'reflect-metadata'
import {createKoaServer} from "routing-controllers"
import ResponseController from './responses/controller'
import setupDb from './db'

const port = process.env.PORT || 4001

const app = createKoaServer({
  controllers: [
    ResponseController
  ]
})

setupDb()
  .then(_ => {
    app.listen(port, () => console.log(`Listening on port ${port}`))
  })
  .catch(err => console.error(err))
