import { AccountPlacePostgresRepository, PrismaHelper } from '@/infra/db/postgres-prisma'
import * as Helper from '@/tests/infra/db/postgres-prisma/helper'

const makeSut = (): AccountPlacePostgresRepository => new AccountPlacePostgresRepository()

describe('AccountPlacePostgresRepository', () => {
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

  describe('add()', () => {
    test('Should return data on success', async () => {
      const sut = makeSut()
      const { userId, placeId } = await Helper.makeUserPlace()
      const data = await sut.add({
        accountId: userId,
        placeId
      })
      expect(data.id).toBeTruthy()
      expect(data.accountId).toBe(userId)
      expect(data.placeId).toBe(placeId)
    })
  })
})
