import { Repository } from "typeorm"
import { listMooviesFromAPI } from "../../infrastructure/ports/api/themoviedb"
import { appDataSource } from "../../infrastructure/ports/database/postgres/config/config"
import { execQuery } from "../../infrastructure/ports/database/postgres/config/execQuery"
import { MovieModel } from "../../infrastructure/ports/database/postgres/model/movie"
import { toTransformerMovieModel } from "../../infrastructure/ports/database/postgres/transformer/movie"
import { generateErrorMessage } from "../../infrastructure/validate/messageValidate"
import { isStringEmpty } from "../../infrastructure/validate/validate"
import { InternalServerError, PreConditionServerError } from "../core/error/error"
import { ListMoviesByPaginationUseCaseInput, ListMoviesByPaginationUseCaseOutput,
  ReIndexMovieUseCaseInput, ReIndexMovieUseCaseOutput } from "./ucio/movie"

const ARRAY_INDEX = ['release_date', 'popularity', 'vote_average']

class MovieUseCase {
  private movieRepository: Repository<MovieModel>

  constructor(movieRepository: Repository<MovieModel>) {
    this.movieRepository = movieRepository
  }

  async listMoviesByPagination(input: ListMoviesByPaginationUseCaseInput): Promise<ListMoviesByPaginationUseCaseOutput> {
    try {
      if (input.limit && input.limit > 15) {
        const error = new PreConditionServerError(generateErrorMessage('The maximun limit is 15.'))
        console.error(error.logErrorMessage())
        return new ListMoviesByPaginationUseCaseOutput(null, error)
      }

      const data = await this.movieRepository.find({
        skip: (input.page - 1) * input.limit,
        take: input.limit,
        order: { realeaseDate: 'DESC'}
      })

      return new ListMoviesByPaginationUseCaseOutput(data, null)
    } catch (err: any) {
      const error = new InternalServerError(err.message)
      console.error(error.logErrorMessage())
      return new ListMoviesByPaginationUseCaseOutput(null, error)
    }
  }

  async loadMoviesFromAPI(): Promise<void> {
    const queryRunner = appDataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      let page = 500

      const existMovies = await this.movieRepository.exists()

      if (existMovies) {
        return
      }

      for (let index = 1; index <= page; index++) {
        const { data, error } = await listMooviesFromAPI('popular','en_US', index)

        if (error) {
          const err = new InternalServerError(error.status_message)
          console.log(err.logErrorMessage())
          return
        }
  
        if (data && data.results && data.results.length > 0) {
          const moviesModel: MovieModel[] = []
          for (let index = 0; index < data.results.length; index++) {
            const element = data.results[index];
            const movieModel = toTransformerMovieModel(element)
            
            moviesModel.push(movieModel)
          }
  
          await queryRunner.manager.save(moviesModel)
        }
        console.log(`Load movies from themoviesdb API page: ${index} of ${page}`)
      }

      console.log('Data Loaded Successfully.')
     
      await queryRunner.commitTransaction()
      return
    } catch (err: any) {
      const error = new InternalServerError(err.message)
      console.error(error.logErrorMessage())
      await queryRunner.rollbackTransaction()
      return
    } finally {
      await queryRunner.release()
    }
  }

  async reIndexMovie(input: ReIndexMovieUseCaseInput): Promise<ReIndexMovieUseCaseOutput> {
    try {

      if (isStringEmpty(input.index)) {
        const error = new PreConditionServerError(generateErrorMessage('Report the index.'))
        console.error(error.logErrorMessage())
        return new ReIndexMovieUseCaseOutput(null, error)
      }

      if (!(ARRAY_INDEX).includes(input.index)) {
        const error = new PreConditionServerError(generateErrorMessage('Index is not valid.'))
        console.error(error.logErrorMessage())
        return new ReIndexMovieUseCaseOutput(null, error)
      }

      for (let index = 0; index < ARRAY_INDEX.length; index++) {
        const queryTextDropIndex = `
          drop index if exists idx_${ARRAY_INDEX[index]};
        ` 
        execQuery(queryTextDropIndex)
      }
      

      const queryText = `
        create index if not exists idx_${input.index} on movies (${input.index})
      `

      execQuery(queryText)
      return new ReIndexMovieUseCaseOutput(null, null)
    } catch (err: any) {
      const error = new InternalServerError(err.message)
      console.error(error.logErrorMessage())
      return new ReIndexMovieUseCaseOutput(null, error)
    }
  }
 }

export {
  MovieUseCase
}