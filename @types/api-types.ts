export interface PostOauthTokenRequest {
  grantType: 'client_credentials' | 'authorization_code' | 'refresh_token'
  scope: string
  code?: string
  redirectUrl?: string
  refreshToken?: string
  state?: string
}

export interface PostOauthTokenResponse {
  accessToken: string;
  token?: string;
  expireIn: number;
  refreshToken?: string;
}
