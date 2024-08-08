import { MovieUseCase } from "../../domain/usecase/movie"
import { ListMoviesByPaginationUseCaseInput, ListMoviesByPaginationUseCaseOutput, ReIndexMovieUseCaseInput, ReIndexMovieUseCaseOutput } from "../../domain/usecase/ucio/movie"
import { appDataSource } from "../../infrastructure/ports/database/postgres/config/config"
import { MovieModel } from "../../infrastructure/ports/database/postgres/model/movie"

class MovieController {
  private static instance: MovieController
  private usecase: MovieUseCase

  constructor() {
    const repositoryMovie = appDataSource.getRepository(MovieModel)
    this.usecase = new MovieUseCase(repositoryMovie)
  }

  public static getInstance(): MovieController {
    if (!this.instance) {
      return new MovieController()
    }

    return new MovieController()
  }

  async listMoviesByPagination(input: ListMoviesByPaginationUseCaseInput): Promise<ListMoviesByPaginationUseCaseOutput> {
    return await this.usecase.listMoviesByPagination(input)
  }

  async loadMoviesFromAPI(): Promise<void> {
    await this.usecase.loadMoviesFromAPI()
  }

  async reIndexMovie(input: ReIndexMovieUseCaseInput): Promise<ReIndexMovieUseCaseOutput> {
    return await this.usecase.reIndexMovie(input)
  }
}

export {
  MovieController
}