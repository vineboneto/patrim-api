import { AccountPostgresRepository, PrismaHelper } from '@/infra/db/postgres-prisma'
import { mockAddAccountParams } from '@/tests/domain/mocks'

import { PrismaClient } from '@prisma/client'
import faker from 'faker'

let prismaClient: PrismaClient

const makeSut = (): AccountPostgresRepository => {
  return new AccountPostgresRepository()
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
  })

  describe('checkByEmail()', () => {
    test('Should return an true if email exists', async () => {
      const sut = makeSut()
      const { name, password, email } = mockAddAccountParams()
      await prismaClient.user.create({
        data: {
          name,
          email,
          password
        }
      })
      const exists = await sut.checkByEmail(email)
      expect(exists).toBe(true)
    })

    test('Should return an false if email not exists', async () => {
      const sut = makeSut()
      const exists = await sut.checkByEmail(faker.internet.email())
      expect(exists).toBe(false)
    })
  })
})
