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

  describe('logError()', () => {
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

  describe('', () => {
    test('Should save swapPatrimony on success', async () => {
      const sut = makeSut()
      const { id: newOwnerId } = await Helper.makeOwner()
      const { id: oldOwnerId } = await Helper.makeOwner()
      const { id: patrimonyId } = await Helper.makePatrimony()
      const { id: userId } = await Helper.makeUser()
      await sut.logSwap({
        newOwnerId,
        oldOwnerId,
        patrimonyId,
        accountId: userId
      })
      const { _all } = await prismaClient.swapPatrimony.count({
        select: {
          _all: true
        }
      })
      expect(_all).toBe(1)
    })
  })
})
