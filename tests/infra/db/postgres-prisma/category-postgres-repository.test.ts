import { PrismaHelper, CategoryPostgresRepository } from '@/infra/db/postgres-prisma/'
import { mockAddCategoriesParams, mockAddCategoryParams } from '@/tests/domain/mocks'

import { PrismaClient } from '@prisma/client'

let prismaClient: PrismaClient

const makeSut = (): CategoryPostgresRepository => new CategoryPostgresRepository()

describe('CategoryPostgresRepository', () => {
  beforeAll(() => {
    PrismaHelper.connect()
  })

  afterAll(async () => {
    await prismaClient.$executeRaw('DELETE FROM "Category";')
    PrismaHelper.disconnect()
  })

  beforeEach(async () => {
    prismaClient = await PrismaHelper.getConnection()
    await prismaClient.$executeRaw('ALTER SEQUENCE "Category_id_seq" RESTART WITH 1;')
    await prismaClient.$executeRaw('DELETE FROM "Category";')
  })

  describe('addCategory()', () => {
    test('Should return false on fail', async () => {
      const sut = makeSut()
      jest.spyOn(prismaClient.category, 'create').mockResolvedValueOnce(null)
      const result = await sut.addCategory(mockAddCategoryParams())
      expect(result).toBeFalsy()
    })

    test('Should return true on success', async () => {
      const sut = makeSut()
      const result = await sut.addCategory(mockAddCategoryParams())
      expect(result).toBeTruthy()
    })
  })

  describe('checkByName()', () => {
    test('Should return false if category name do not exist', async () => {
      const sut = makeSut()
      const result = await sut.checkByName(mockAddCategoryParams.name)
      expect(result).toBeFalsy()
    })

    test('Should return true if category name already exists', async () => {
      const sut = makeSut()
      const param = mockAddCategoryParams()
      await sut.addCategory(param)
      const result = await sut.checkByName(param.name)
      expect(result).toBeTruthy()
    })
  })

  describe('loadAll()', () => {
    test('Should return all categories on success', async () => {
      const sut = makeSut()
      await prismaClient.category.createMany({
        data: mockAddCategoriesParams()
      })
      const categories = await sut.loadAll()
      expect(categories).toBeTruthy()
      expect(categories.length).toBe(3)
    })
  })
})
