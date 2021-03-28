import { AddAccount } from '@/domain/usecases'
import { AddAccountRepository, CheckAccountByEmailRepository } from '@/data/protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly addAccountRepository: AddAccountRepository,
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository
  ) {}

  async add (account: AddAccount.Params): Promise<AddAccount.Result> {
    const exists = await this.checkAccountByEmailRepository.checkByEmail(account.email)
    let isValid = false
    if (!exists) {
      isValid = await this.addAccountRepository.add(account)
    }
    return isValid
  }
}
