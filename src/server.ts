import express from 'express'
import * as bodyParser from 'body-parser'
import router from './routes'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

export const app = express()
const address = '0.0.0.0:3000'

app.use(cors()).use(bodyParser.json()).use(helmet())

if (process.env.ENV === 'dev') app.use(morgan('dev'))

app.use('/', router)

app.listen(3000, function () {
  console.log(`starting app on: ${address}`)
})
