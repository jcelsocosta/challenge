import cors from 'cors'

const optionsCors: cors.CorsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
  allowedHeaders: ['x-requested-with, content-type', 'authorization', 'origin', 'accept', 'x-access-token'],
  credentials: true,
  maxAge: 86400,
  preflightContinue: true
}

export default optionsCors
