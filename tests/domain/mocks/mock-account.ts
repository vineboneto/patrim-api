import { AddAccount, Authentication, CheckAccessData, LoadAccountByToken } from '@/domain/usecases'

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

export const mockCheckAccessDataParams = (): CheckAccessData.Params => ({
  accountId: faker.datatype.number(),
  dataAccess: [
    {
      databaseName: faker.database.column(),
      id: faker.datatype.number()
    }
  ]
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

export class CheckAccessDataSpy implements CheckAccessData {
  result = true
  params: CheckAccessData.Params

  async checkAccess (params: CheckAccessData.Params): Promise<boolean> {
    this.params = params
    return this.result
  }
}
