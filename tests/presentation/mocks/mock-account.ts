import { AddAccount, Authentication } from '@/domain/usecases'
import { mockAuthenticationModel } from '@/tests/domain/mocks'

export class AddAccountSpy implements AddAccount {
  params: AddAccount.Params
  result = true
  async add (account: AddAccount.Params): Promise<AddAccount.Result> {
    this.params = account
    return this.result
  }
}

export class AuthenticationSpy implements Authentication {
  params: Authentication.Params
  result = mockAuthenticationModel()
  async auth (authentication: Authentication.Params): Promise<Authentication.Result> {
    this.params = authentication
    return this.result
  }
}
