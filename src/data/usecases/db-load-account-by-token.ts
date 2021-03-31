import { LoadAccountByToken } from '@/domain/usecases'
import { LoadAccountByTokenRepository } from '@/data/protocols'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository) {}

  async load (accessToken: string, role?: string): Promise<LoadAccountByToken.Result> {
    const account = await this.loadAccountByTokenRepository.loadByToken(accessToken, role)
    return account
  }
}
