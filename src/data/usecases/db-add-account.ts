import { AddAccount } from '@/domain/usecases'
import { AddAccountRepository, CheckAccountByEmailRepository } from '@/data/protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly addAccountRepository: AddAccountRepository,
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository
  ) {}

  async add (account: AddAccount.Params): Promise<AddAccount.Result> {
    await this.checkAccountByEmailRepository.checkByEmail(account.email)
    const isValid = await this.addAccountRepository.add(account)
    return isValid
  }
}
