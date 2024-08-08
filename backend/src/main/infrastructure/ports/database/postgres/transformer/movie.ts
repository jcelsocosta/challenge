import { MovieModel } from "../model/movie";

function toTransformerMovieModel(data: any): MovieModel {
  return new MovieModel(
    data.id,
    data.release_date,
    data.adult == true ? 1 : 2,
    data.backdrop_path,
    data.genre_ids,
    data.original_language,
    data.original_title,
    data.overview,
    data.popularity,
    data.poster_path,
    data.title,
    data.video == true ? 1 : 2,
    data.vote_average,
    data.vote_count
  )
}

export {
  toTransformerMovieModel
}