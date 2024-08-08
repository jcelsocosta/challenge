import HOST from "./config/host";
import { requestAPI, ResponseAPIType } from "./config/request";

async function listMooviesFromAPI(movieType:string, language: string, page: number): Promise<ResponseAPIType> {
  return await requestAPI({
    method: 'GET',
    url: `${HOST.themoviedb_rest.target}/movie/${movieType}?${language}&page=${page}`,
    headers: {
      'Authorization': `Bearer ${process.env.TOKEN_THE_MOVIE_DB}`,
      'accept': 'aplication/json'
    }
  })
}

async function getMovieDetailsByMovieIDFromAPI(movieID:number): Promise<ResponseAPIType> {
  return await requestAPI({
    method: 'GET',
    url: `${HOST.themoviedb_rest.target}/movie/${movieID}?language=en-US`,
    headers: {
      'Authorization': `Bearer ${process.env.TOKEN_THE_MOVIE_DB}`,
      'accept': 'aplication/json'
    }
  })
}

export {
  listMooviesFromAPI,
  getMovieDetailsByMovieIDFromAPI
}