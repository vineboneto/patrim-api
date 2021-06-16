import { PrismaHelper, CheckAccessDataPostgres } from '@/infra/db/postgres-prisma'
import * as Helper from '@/tests/infra/db/postgres-prisma/helper'

const makeSut = (data: string, field: string): CheckAccessDataPostgres => new CheckAccessDataPostgres(data, field)

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
      const sut = makeSut('patrimony', 'id')
      const { id, userId } = await Helper.makePatrimony()
      const isValid = await sut.checkAccess({ accountId: userId, id: id })
      expect(isValid).toBe(true)
    })
  })
})
