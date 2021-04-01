import { PrismaHelper, LogPostgresRepository } from '@/infra/db/postgres-prisma'

import { PrismaClient } from '@prisma/client'
import faker from 'faker'

let prismaClient: PrismaClient

const makeSut = (): LogPostgresRepository => new LogPostgresRepository()

describe('LogPostgresRepository', () => {
  beforeAll(() => {
    PrismaHelper.connect()
  })

  afterAll(async () => {
    await prismaClient.$executeRaw('DELETE FROM "LogError";')
    PrismaHelper.disconnect()
  })

  beforeEach(async () => {
    prismaClient = await PrismaHelper.getConnection()
    await prismaClient.$executeRaw('ALTER SEQUENCE "LogError_id_seq" RESTART WITH 1;')
    await prismaClient.$executeRaw('DELETE FROM "LogError";')
  })

  test('Should save logError on success', async () => {
    const sut = makeSut()
    const stack = faker.random.words()
    await sut.logError(stack)
    const { _all } = await prismaClient.logError.count({
      select: {
        _all: true
      }
    })
    expect(_all).toBe(1)
  })
})
