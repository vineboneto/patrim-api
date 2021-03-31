import { LoadAccountByToken } from '@/domain/usecases'
import { Decrypter, LoadAccountByTokenRepository } from '@/data/protocols'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository,
    private readonly decrypter: Decrypter
  ) {}

  async load (accessToken: string, role?: string): Promise<LoadAccountByToken.Result> {
    await this.decrypter.decrypt(accessToken)
    const account = await this.loadAccountByTokenRepository.loadByToken(accessToken, role)
    return account
  }
}
