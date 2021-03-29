import { UpdateAccessTokenRepository } from './../protocols/db/update-access-token-repository'
import { Authentication } from '@/domain/usecases'
import { Encrypter, HashComparer, LoadAccountByEmailRepository } from '@/data/protocols'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async auth (authentication: Authentication.Params): Promise<Authentication.Result> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authentication.email)
    if (account) {
      const isValid = await this.hashComparer.comparer(authentication.password, account.password)
      if (isValid) {
        const accessToken = await this.encrypter.encrypt(account.id.toString())
        await this.updateAccessTokenRepository.update(account.id, accessToken)
      }
    }
    return null
  }
}
