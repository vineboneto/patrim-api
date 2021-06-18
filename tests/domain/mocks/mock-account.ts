import { AddAccount, Authentication, LoadAccountByToken } from '@/domain/usecases'

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
  result = {
    accessToken: faker.datatype.uuid(),
    name: faker.name.findName()
  }

  async auth (authentication: Authentication.Params): Promise<Authentication.Model> {
    this.params = authentication
    return this.result
  }
}

export class LoadAccountByTokenSpy implements LoadAccountByToken {
  accessToken: string
  role: string
  result = {
    id: faker.datatype.number()
  }

  async load (accessToken: string, role?: string): Promise<LoadAccountByToken.Model> {
    this.accessToken = accessToken
    this.role = role
    return this.result
  }
}
