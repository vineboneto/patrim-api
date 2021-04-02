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

export const mockAuthenticationModel = (): Authentication.Result => ({
  accessToken: faker.datatype.uuid(),
  name: faker.name.findName()
})

export const mockLoadAccountByTokenRepositoryModel = (): LoadAccountByToken.Result => ({
  id: faker.datatype.number()
})
