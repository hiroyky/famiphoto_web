import axios, { AxiosError } from 'axios'

export async function Login (req: {userId: string, password: string}) {
  try {
    await axios.post('/auth/login', {
      userId: req.userId,
      password: req.password,
    })
  } catch (err) {
    throw ApiError.createInstanceIfApiError(err)
  }
}

export async function Logout () {
  try {
    await axios.post('/auth/logout', {})
  } catch (err) {
    throw ApiError.createInstanceIfApiError(err)
  }
}

export class ApiError extends Error {
  public httpStatus: number
  public errorCode: string
  public errorMessage: string

  constructor (data: any) {
    super()
    this.httpStatus = data.httpStatus
    this.errorCode = data.errorCode
    this.errorMessage = data.errorMessage
  }

  public toString (): string {
    return `${this.httpStatus} ${this.errorCode}: ${this.errorMessage} ${super.toString()}`
  }

  static createInstanceIfApiError (err: unknown) {
    if (!axios.isAxiosError(err)) {
      return false
    }
    if (!err.response || !err.response.data) {
      return false
    }
    const data = err.response.data
    if (data.errorMessage && data.httpStatus && data.errorCode) {
      return new ApiError(data)
    }
    return err
  }
}
