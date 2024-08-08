import { Request, Response, Router } from 'express';
import { HTTPCodeEnum } from '../../../domain/core/enum/error';
import { ListMoviesByPaginationUseCaseInput, ReIndexMovieUseCaseInput } from '../../../domain/usecase/ucio/movie';
import { MovieController } from '../../controller/movie';
import { ResponseEntity } from '../response/response';

class MovieRouter {
  readonly router: Router
  private controller: MovieController

  constructor() {
    this.router = Router()
    this.controller = MovieController.getInstance()
  }

  public getRouter(): Router {
    this.router.get('/listMoviesByPagination', async (req: Request, res: Response): Promise<void> => {
      const page = req.query.page || 1
      const limit = req.query.limit || 15

      const input = new ListMoviesByPaginationUseCaseInput(Number(page), Number(limit))

      const output = await this.controller.listMoviesByPagination(input)

      new ResponseEntity(res, output).response()
    })

    this.router.post('/reIndexMovie', async (req: Request, res: Response): Promise<void> => {
      const { index } = req.body

      const input = new ReIndexMovieUseCaseInput(index)

      const output = await this.controller.reIndexMovie(input)

      new ResponseEntity(res, output).response()
    })

    return this.router
  }
}

export {
  MovieRouter
}