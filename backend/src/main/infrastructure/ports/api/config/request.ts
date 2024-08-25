import axios from 'axios'

const TIMEOUT_PRIMARY = 5000

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

async function requestAPI(req: RequestAPIType): Promise<ResponseAPIType> {
  try {
    const response = await axios({
      method: req.method,
      url: req.url,
      responseType: 'json',
      timeout: req.timeout || TIMEOUT_PRIMARY,
      params: req.params,
      headers: req.headers,
      data: req.data
    })

    const output: ResponseAPIType = {
      data: response.data,
      error: null
    }
    return output
  } catch (err: any) {
    const output: ResponseAPIType = {
      data: null,
      error: err.response.data
    }
    console.log(err)
    return output
  }
}

export { RequestAPIType, ResponseAPIType, requestAPI }

