import { Response } from 'express'

class ResponseEntity {
  private res: Response
  private data: any

  constructor(res: Response, data: any) {
    this.res = res
    this.data = data
  }

  public response(): Response {
    if (this.data.error) {
      return this.res.status(this.data.error.getCode).send(this.data)
    } else {
      return this.res.status(this.res.statusCode).send(this.data)
    }
  }
}

export { ResponseEntity }
