import { LoadAccountByToken } from '@/domain/usecases'

export interface LoadAccountByTokenRepository {
  loadByToken (accessToken: string, role?: string): Promise<LoadAccountByTokenRepository.Model>
}

export namespace LoadAccountByTokenRepository {
  export type Model = LoadAccountByToken.Model
}
