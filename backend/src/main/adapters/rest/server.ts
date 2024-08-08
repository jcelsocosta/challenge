import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import optionsCors from './cors'

import { AppRouter } from './router/_index'

const PORT = 4001

const app = express()

app.use(cors(optionsCors))
app.options('*', cors(optionsCors))
app.use(morgan('dev'))
app.use(express.json())

app.use(new AppRouter().getRouter())

function initRest(): void {
  app.listen(PORT, () => {
    console.log(`Server on ${PORT}`)
  })
}

export default initRest
