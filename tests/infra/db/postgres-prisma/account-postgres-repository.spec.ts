import { AccountPostgresRepository, PrismaHelper } from '@/infra/db/postgres-prisma'
import { AddAccount } from '@/domain/usecases'
import { mockAddAccountParams } from '@/tests/domain/mocks'

import { PrismaClient } from '@prisma/client'
import faker from 'faker'

let prismaClient: PrismaClient

const makeSut = (): AccountPostgresRepository => {
  return new AccountPostgresRepository()
}

const insertAccount = async (account: AddAccount.Params): Promise<void> => {
  await prismaClient.user.create({
    data: {
      name: account.name,
      email: account.email,
      password: account.name
    }
  })
}

describe('AccountPostgresRepository', () => {
  beforeAll(() => {
    PrismaHelper.connect()
  })

  afterAll(async () => {
    await prismaClient.$executeRaw('DELETE FROM "User";')
    PrismaHelper.disconnect()
  })

  beforeEach(async () => {
    prismaClient = await PrismaHelper.getConnection()
    await prismaClient.$executeRaw('ALTER SEQUENCE "User_id_seq" RESTART WITH 1;')
    await prismaClient.$executeRaw('DELETE FROM "User";')
  })

  describe('add()', () => {
    test('Should return true on add success', async () => {
      const sut = makeSut()
      const addAccountParams = mockAddAccountParams()
      const isValid = await sut.add(addAccountParams)
      expect(isValid).toBe(true)
    })

    test('Should return false if add returns false', async () => {
      const sut = makeSut()
      jest.spyOn(prismaClient.user, 'create').mockResolvedValueOnce(null)
      const isValid = await sut.add(mockAddAccountParams())
      expect(isValid).toBe(false)
    })
  })

  describe('checkByEmail()', () => {
    test('Should return an true if email exists', async () => {
      const sut = makeSut()
      const accountParams = mockAddAccountParams()
      await insertAccount(accountParams)
      const exists = await sut.checkByEmail(accountParams.email)
      expect(exists).toBe(true)
    })

    test('Should return an false if email not exists', async () => {
      const sut = makeSut()
      const exists = await sut.checkByEmail(faker.internet.email())
      expect(exists).toBe(false)
    })
  })

  describe('loadByEmail', () => {
    test('Should returns account on loadByEmail success', async () => {
      const sut = makeSut()
      const accountParams = mockAddAccountParams()
      await insertAccount(accountParams)
      const account = await sut.loadByEmail(accountParams.email)
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBeTruthy()
      expect(account.password).toBeTruthy()
    })
  })
})
