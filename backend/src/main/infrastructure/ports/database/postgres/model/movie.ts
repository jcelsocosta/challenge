import { Column, Entity,  PrimaryColumn } from 'typeorm';

@Entity({ name: 'movies'})
class MovieModel {
  @PrimaryColumn({name: 'movie_id', type: 'int'})
  readonly movieID: number
  @Column({ name: 'release_date', type: 'varchar', nullable: true })
  readonly realeaseDate: string
  @Column({name: 'adult', type: 'int', nullable: true})
  readonly adult: number
  @Column({ name: 'backdrop_path', type: 'varchar', nullable: true})
  readonly backdropPath: string
  @Column({name: 'genre_ids', type: 'int', array: true, nullable: true})
  readonly genreIDs: number[]
  @Column({name: 'original_language', type: 'varchar', nullable: true})
  readonly originalLanguage: string
  @Column({name: 'original_title', type: 'varchar', nullable: true})
  readonly originalTitle: string
  @Column({name: 'overview', type: 'text', nullable: true})
  readonly overview: string
  @Column({name: 'popularity', type:'float', nullable: true})
  readonly populatiry: number
  @Column({name: 'poster_path', type: 'varchar', nullable: true})
  readonly posterPath: string
  @Column({name: 'title', type: 'varchar', nullable: true})
  readonly title: string
  @Column({name: 'video', type:'int', nullable: true})
  readonly video: number
  @Column({name: 'vote_average', type: 'float', nullable: true})
  readonly voteAverage: number
  @Column({name: 'vote_count', type: 'int',nullable: true})
  readonly voteCount: number

  constructor(movieID: number, realeaseDate: string, adult: number, backdropPath: string,
    genreIDs: number[], originalLanguage: string, originalTitle: string,
    overview: string, populatiry: number, posterPath: string, title: string,
    video: number, voteAverage: number, voteCount: number) {
    this.movieID = movieID
    this.realeaseDate = realeaseDate
    this.adult = adult
    this.backdropPath = backdropPath
    this.genreIDs = genreIDs
    this.originalLanguage = originalLanguage
    this.originalTitle = originalTitle
    this.overview = overview
    this.populatiry = populatiry
    this.posterPath = posterPath
    this.title = title
    this.video = video
    this.voteAverage = voteAverage
    this.voteCount = voteCount
  }
}

export {
  MovieModel
}