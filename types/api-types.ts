export interface PostOauthTokenRequest {
  grantType: 'client_credentials' | 'authorization_code' | 'refresh_token'
  scope?: string
  code?: string
  redirectUri?: string
  refreshToken?: string
  state?: string
}

export interface PostOauthTokenResponse {
  accessToken: string;
  token?: string;
  expireIn: number;
  refreshToken?: string;
}

export interface AuthorizationCodeResponse {
  accessToken: string;
  expireIn: number;
  refreshToken: string;
}
