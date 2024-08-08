import { ErrorHandle, ErrorUseCaseOutput } from "../../core/error/error"

class ListMoviesByPaginationUseCaseInput {
  readonly page: number
  readonly limit: number

  constructor(page: number, limit: number) {
    this.page = page
    this.limit = limit
  }
}

class ListMoviesByPaginationUseCaseOutput extends ErrorUseCaseOutput {
  readonly data: any
  
  constructor(data: any, error: ErrorHandle | null) {
    super(error)
    this.data = data
  }
}

class ReIndexMovieUseCaseInput {
  readonly index: string

  constructor(index: string) {
    this.index = index
  }
}

class ReIndexMovieUseCaseOutput extends ErrorUseCaseOutput {
  readonly message: string | null
  
  constructor(message: string | null, error: ErrorHandle | null) {
    super(error)
    this.message = message
  }
}

export {
  ListMoviesByPaginationUseCaseInput,
  ListMoviesByPaginationUseCaseOutput,
  ReIndexMovieUseCaseInput,
  ReIndexMovieUseCaseOutput
}