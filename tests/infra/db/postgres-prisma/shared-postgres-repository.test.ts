import { PrismaHelper, SharedPostgresRepository } from '@/infra/db/postgres-prisma'
import * as Helper from '@/tests/infra/db/postgres-prisma/helper'

import faker from 'faker'

const makeSut = (): SharedPostgresRepository => new SharedPostgresRepository()

describe('SharedPostgresRepository', () => {
  beforeAll(() => {
    PrismaHelper.connect()
  })

  afterAll(async () => {
    await Helper.deleteAll()
    PrismaHelper.disconnect()
  })

  beforeEach(async () => {
    await Helper.deleteAll()
  })
  describe('checkUserId', () => {
    test('Should return true if category exists of userId', async () => {
      const sut = makeSut()
      const { userId } = await Helper.makeCategory()
      const isValid = await sut.checkUserId({ accountId: userId, database: 'category' })
      expect(isValid).toBe(true)
    })

    test('Should return false if category not exits userId', async () => {
      const sut = makeSut()
      const isValid = await sut.checkUserId({ accountId: faker.datatype.number(), database: 'category' })
      expect(isValid).toBe(false)
    })
  })
})
