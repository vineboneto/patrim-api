import { AddAccount, Authentication, LoadAccountByToken } from '@/domain/usecases'
import { mockAuthenticationModel, mockLoadAccountByTokenRepositoryModel } from '@/tests/domain/mocks'

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
  async auth (authentication: Authentication.Params): Promise<Authentication.Model> {
    this.params = authentication
    return this.result
  }
}

export class LoadAccountByTokenSpy implements LoadAccountByToken {
  accessToken: string
  role: string
  result = mockLoadAccountByTokenRepositoryModel()

  async load (accessToken: string, role?: string): Promise<LoadAccountByToken.Model> {
    this.accessToken = accessToken
    this.role = role
    return this.result
  }
}
