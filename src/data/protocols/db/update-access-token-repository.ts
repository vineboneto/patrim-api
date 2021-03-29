export interface UpdateAccessTokenRepository {
  update (id: number, token: string): Promise<void>
}
