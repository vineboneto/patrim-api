import { Authentication } from '@/domain/usecases'
import { Encrypter, HashComparer, LoadAccountByEmailRepository } from '@/data/protocols'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter
  ) {}

  async auth (authentication: Authentication.Params): Promise<Authentication.Result> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authentication.email)
    if (account) {
      await this.hashComparer.comparer(authentication.password, account.password)
      await this.encrypter.encrypt(account.id.toString())
    }
    return null
  }
}
