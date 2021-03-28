import { AddAccountRepository } from '@/data/protocols'

export class AddAccountRepositorySpy implements AddAccountRepository {
  params: AddAccountRepository.Params
  result = true
  async add (account: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    this.params = account
    return this.result
  }
}
