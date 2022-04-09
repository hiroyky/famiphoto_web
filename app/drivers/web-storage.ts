export class WebStorage {
  public setAccessToken (accessToken: string) {
    localStorage.setItem('accessToken', accessToken)
  }

  public getAccessToken () {
    return localStorage.getItem('accessToekn')
  }

  public setRefreshToken (refreshToken: string) {
    localStorage.setItem('refreshToken', refreshToken)
  }

  public getRefreshToken () {
    return localStorage.getItem('refreshToken')
  }
}
