import { AccountPostgresRepository, PrismaHelper } from '@/infra/db/postgres-prisma'
import { mockAddAccountParams } from '@/tests/domain/mocks'

import { PrismaClient } from '@prisma/client'

let prismaClient: PrismaClient

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
      const sut = new AccountPostgresRepository()
      const addAccountParams = mockAddAccountParams()
      const isValid = await sut.add(addAccountParams)
      expect(isValid).toBe(true)
    })
  })
})
