type MovieType = {
  readonly movieID: number
  readonly realeaseDate: string
  readonly adult: number
  readonly backdropPath: string
  readonly genreIDs: number[]
  readonly originalLanguage: string
  readonly originalTitle: string
  readonly overview: string
  readonly populatiry: number
  readonly posterPath: string
  readonly title: string
  readonly video: number
  readonly voteAverage: number
  readonly voteCount: number
}

export type {
  MovieType
}