import { Authentication } from '@/domain/usecases'
import { LoadAccountByEmailRepository } from '@/data/protocols'

export class DbAuthentication implements Authentication {
  constructor (private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository) {}

  async auth (authentication: Authentication.Params): Promise<Authentication.Result> {
    await this.loadAccountByEmailRepository.loadByEmail(authentication.email)
    return null
  }
}
