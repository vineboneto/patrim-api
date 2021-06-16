import {
  AddAccountRepository,
  LoadAccountByEmailRepository,
  CheckAccountByEmailRepository,
  UpdateAccessTokenRepository,
  LoadAccountByTokenRepository,
  Decrypter,
  CheckAccessDataRepository
} from '@/data/protocols'
import { mockAddAccountParams } from '@/tests/domain/mocks'

import faker from 'faker'

export const mockAddAccountRepositoryParams = (): AddAccountRepository.Params => mockAddAccountParams()

export class AddAccountRepositorySpy implements AddAccountRepository {
  params: AddAccountRepository.Params
  result = true
  async add (account: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    this.params = account
    return this.result
  }
}

export class LoadAccountByEmailRepositorySpy implements LoadAccountByEmailRepository {
  email: string
  account = {
    id: faker.datatype.number(10),
    name: faker.name.findName(),
    password: faker.internet.password()
  }

  async loadByEmail (email: string): Promise<LoadAccountByEmailRepository.Model> {
    this.email = email
    return this.account
  }
}

export class CheckAccountByEmailRepositorySpy implements CheckAccountByEmailRepository {
  email: string
  result = false

  async checkByEmail (email: string): Promise<boolean> {
    this.email = email
    return await this.result
  }
}

export class UpdateAccessTokenRepositorySpy implements UpdateAccessTokenRepository {
  id: number
  token: string

  async updateAccessToken (id: number, token: string): Promise<void> {
    this.id = id
    this.token = token
    return Promise.resolve()
  }
}

export class LoadAccountByTokenRepositorySpy implements LoadAccountByTokenRepository {
  token: string
  role: string
  result = {
    id: faker.datatype.number()
  }

  async loadByToken (accessToken: string, role?: string): Promise<LoadAccountByTokenRepository.Model> {
    this.token = accessToken
    this.role = role
    return this.result
  }
}

export class DecrypterSpy implements Decrypter {
  token: string
  role: string
  tokenDecrypted = faker.datatype.uuid()

  async decrypt (token: string): Promise<string> {
    this.token = token
    return this.tokenDecrypted
  }
}

export class CheckAccessDataRepositorySpy implements CheckAccessDataRepository {
  params: CheckAccessDataRepository.Params
  result = true
  callsCount = 0

  async checkAccess (params: CheckAccessDataRepository.Params): Promise<boolean> {
    this.callsCount++
    this.params = params
    return this.result
  }
}
