import { AddAccount, Authentication, CheckAccountById, LoadAccountByToken } from '@/domain/usecases'

import faker from 'faker'

export const mockAddAccountParams = (): AddAccount.Params => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAuthenticationParams = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAuthenticationModel = (): Authentication.Model => ({
  accessToken: faker.datatype.uuid(),
  name: faker.name.findName()
})

export const mockLoadAccountByTokenRepositoryModel = (): LoadAccountByToken.Model => ({
  id: faker.datatype.number()
})

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

export class CheckAccountByIdSpy implements CheckAccountById {
  id: string
  result = true
  async checkById (id: string): Promise<CheckAccountById.Result> {
    this.id = id
    return this.result
  }
}
