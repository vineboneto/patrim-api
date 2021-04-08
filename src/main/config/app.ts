import setupRoutes from '@/main/config/routes'
import setupMiddlewares from '@/main/config/middlewares'

import express from 'express'

const app = express()
/*
  Chamar Routes por ultimo
*/
setupMiddlewares(app)
setupRoutes(app)

export default app
