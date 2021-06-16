import { PrismaHelper, CheckAccessDataPostgres } from '@/infra/db/postgres-prisma'
import * as Helper from '@/tests/infra/db/postgres-prisma/helper'

import faker from 'faker'

const makeSut = (): CheckAccessDataPostgres => new CheckAccessDataPostgres()

describe('CheckDataAccess', () => {
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

  describe('checkAccessId', () => {
    test('Should return true if have access to data', async () => {
      const sut = makeSut()
      const { id, userId } = await Helper.makePatrimony()
      const isValid = await sut.checkAccess({ accountId: userId, databaseName: 'patrimony', id })
      expect(isValid).toBe(true)
    })

    test('Should return false if do not have access to data', async () => {
      const sut = makeSut()
      const { id } = await Helper.makePatrimony()
      const isValid = await sut.checkAccess({ id, accountId: faker.datatype.number(), databaseName: 'patrimony' })
      expect(isValid).toBe(false)
    })
  })
})
