import { request, RequestAPIType, ResponseAPIType } from "../service/request"

class MovieController {
  async listMoviesByPagination(page: number): Promise<ResponseAPIType> {
    const req: RequestAPIType = {
      method: 'GET',
      url: '/listMoviesByPagination',
      params: {
        page
      }
    }
    return await request(req)
  }

  async reIndexMovie(index: string): Promise<ResponseAPIType> {
    const req: RequestAPIType = {
      method: 'POST',
      url: '/reIndexMovie',
      data: {
        index
      }
    }
    return await request(req)
  }
}

const movieController = new MovieController()

export { movieController }
