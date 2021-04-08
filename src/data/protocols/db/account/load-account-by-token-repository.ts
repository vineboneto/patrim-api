import { LoadAccountByToken } from '@/domain/usecases'

export interface LoadAccountByTokenRepository {
  loadByToken (accessToken: string, role?: string): Promise<LoadAccountByTokenRepository.Result>
}

export namespace LoadAccountByTokenRepository {
  export type Result = LoadAccountByToken.Result
}
