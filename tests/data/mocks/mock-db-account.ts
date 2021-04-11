import {
  AddAccountRepository,
  LoadAccountByEmailRepository,
  CheckAccountByEmailRepository,
  UpdateAccessTokenRepository,
  LoadAccountByTokenRepository,
  Decrypter,
  CheckAccountByIdRepository
} from '@/data/protocols'

import faker from 'faker'

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

export class CheckAccountByIdRepositorySpy implements CheckAccountByIdRepository {
  result = true
  id = faker.datatype.number().toString()
  async checkById (id: string): Promise<CheckAccountByIdRepository.Result> {
    this.id = id
    return this.result
  }
}
