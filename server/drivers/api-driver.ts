import fetch, { RequestInit, Response } from 'node-fetch'

export class ApiDriver {
  constructor (private baseUrl: string) {
  }

  public async request (path: string, init?: RequestInit) {
    try {
      const res = await fetch(this.baseUrl + '/' + path, init)
      if (!res.ok) {
        const body: any = await res.json()
        throw new ApiError(res, body.error_code, body.error_message)
      }
      return res
    } catch (err) {
      throw err
    }
  }
}

export class ApiError extends Error {
  constructor (private res: Response, errorCode: string, error_message: string) {
    super()
  }

  get httpStatus (): number {
    return this.res.status
  }

  get errorCode (): string {
    return this.errorCode
  }

  get errorMessage (): string {
    return this.errorMessage
  }

  public toString (): string {
    return `${this.errorCode}: ${this.errorMessage} ${super.toString()}`
  }
}
