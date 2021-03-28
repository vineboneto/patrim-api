import { AddAccount } from '@/domain/usecases'
import { AddAccountRepository } from '@/data/protocols'

export class DbAddAccount implements AddAccount {
  constructor (private readonly addAccountRepository: AddAccountRepository) {}

  async add (account: AddAccount.Params): Promise<AddAccount.Result> {
    await this.addAccountRepository.add(account)
    return null
  }
}
