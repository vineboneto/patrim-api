import { PrismaHelper, LogPostgresRepository } from '@/infra/db/postgres-prisma'
import * as Helper from '@/tests/infra/db/postgres-prisma/helper'
import { PrismaClient } from '@prisma/client'
import faker from 'faker'

let prismaClient: PrismaClient

const makeSut = (): LogPostgresRepository => new LogPostgresRepository()

describe('LogPostgresRepository', () => {
  beforeAll(() => {
    PrismaHelper.connect()
  })

  afterAll(async () => {
    await Helper.deleteAll()
    PrismaHelper.disconnect()
  })

  beforeEach(async () => {
    prismaClient = PrismaHelper.getConnection()
    await Helper.deleteAll()
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
