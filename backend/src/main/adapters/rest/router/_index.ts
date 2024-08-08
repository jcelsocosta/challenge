import { Router } from 'express'
import { MovieRouter } from './movie'

class AppRouter {
  private appRouter: Router

  constructor() {
    this.appRouter = Router()
  }

  getRouter(): Router {
    this.appRouter.use(new MovieRouter().getRouter())

    return this.appRouter
  }
}

export { AppRouter }
