export interface UpdateAccessTokenRepository {
  updateAccessToken (id: string | number, token: string): Promise<void>
}
