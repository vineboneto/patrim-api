import { AddAccount } from '@/domain/usecases'

export class AddAccountSpy implements AddAccount {
  params: AddAccount.Params
  result = true
  async add (account: AddAccount.Params): Promise<AddAccount.Result> {
    this.params = account
    return this.result
  }
}
