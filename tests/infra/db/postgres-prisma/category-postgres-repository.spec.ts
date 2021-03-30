import { mockAddCategoryParams } from '@/../tests/domain/mocks'
import { PrismaHelper, CategoryPostgresRepository } from '@/infra/db/postgres-prisma/'
import { PrismaClient } from '@prisma/client'

let prismaClient: PrismaClient

describe('CategoryPostgresRepository', () => {
  beforeAll(() => {
    PrismaHelper.connect()
  })

  afterAll(async () => {
    await prismaClient.$executeRaw('DELETE FROM "Sector";')
    PrismaHelper.disconnect()
  })

  beforeEach(async () => {
    prismaClient = await PrismaHelper.getConnection()
    await prismaClient.$executeRaw('ALTER SEQUENCE "Sector_id_seq" RESTART WITH 1;')
    await prismaClient.$executeRaw('DELETE FROM "Sector";')
  })

  describe('addCategory()', () => {
    test('Should return false on fail', async () => {
      const sut = new CategoryPostgresRepository()
      jest.spyOn(prismaClient.category, 'create').mockResolvedValueOnce(null)
      const result = await sut.addCategory(mockAddCategoryParams())
      expect(result).toBeFalsy()
    })

    test('Should return true on successs', async () => {
      const sut = new CategoryPostgresRepository()
      const result = await sut.addCategory(mockAddCategoryParams())
      expect(result).toBeTruthy()
    })
  })

  describe('checkByName()', () => {
    test('Should return false if category name do not exist', async () => {
      const sut = new CategoryPostgresRepository()
      const result = await sut.checkByName(mockAddCategoryParams.name)
      expect(result).toBeFalsy()
    })

    test('Should return true if category name already exists', async () => {
      const sut = new CategoryPostgresRepository()
      const param = mockAddCategoryParams()
      await sut.addCategory(param)
      const result = await sut.checkByName(param.name)
      expect(result).toBeTruthy()
    })
  })
})
