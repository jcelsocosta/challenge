import axios from 'axios'

enum TimeoutEnum {
  default = 5000
}

type RequestAPIType = {
  readonly method: string
  readonly url: string
  readonly timeout?: number
  readonly data?: any
  readonly params?: any
  readonly headers?: any
}

type ResponseAPIType = {
  data: any,
  error: any
}

async function request(req: RequestAPIType): Promise<ResponseAPIType> {
  try {
    const response = await axios({
      method: req.method,
      url: `http://backend:4001${req.url}`,
      responseType: 'json',
      timeout: req.timeout || TimeoutEnum.default,
      params: req.params,
      headers: req.headers,
      data: req.data
    })

    const output: ResponseAPIType = {
      data: response.data.data,
      error: response.data.error
    }
    
    return output
    
  } catch (err: any) {
    const output: ResponseAPIType = {
      data: null,
      error: 'Error de conexão'
    }

    return output
  }
}

export {
  request
}

export type {
  RequestAPIType,
  ResponseAPIType
}