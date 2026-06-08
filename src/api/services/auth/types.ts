export interface ILoginPayload extends Record<string, unknown> {
  email: string
  password: string
}

export interface ITokens {
  refresh_token: string
  access_token: string
  token_type?: string
  expires_in?: number
}
