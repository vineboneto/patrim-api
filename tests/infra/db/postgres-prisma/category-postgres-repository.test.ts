import { PrismaHelper, CategoryPostgresRepository } from '@/infra/db/postgres-prisma/'
import { mockAddCategoriesParams, mockAddCategoryParams } from '@/tests/data/mocks'
import * as Helper from '@/tests/infra/db/postgres-prisma/helper'

import { PrismaClient } from '@prisma/client'
import faker from 'faker'

let prismaClient: PrismaClient

const makeSut = (): CategoryPostgresRepository => new CategoryPostgresRepository()

describe('CategoryPostgresRepository', () => {
  beforeAll(() => {
    PrismaHelper.connect()
  })

  afterAll(async () => {
    await prismaClient.$executeRaw('DELETE FROM "Category";')
    await prismaClient.$executeRaw('ALTER SEQUENCE "Category_id_seq" RESTART WITH 1;')
    PrismaHelper.disconnect()
  })

  beforeEach(async () => {
    prismaClient = PrismaHelper.getConnection()
    await prismaClient.$executeRaw('DELETE FROM "Category";')
  })

  describe('add()', () => {
    test('Should return true on add success', async () => {
      const sut = makeSut()
      const result = await sut.add(mockAddCategoryParams())
      expect(result).toBeTruthy()
    })
  })

  describe('update()', () => {
    test('Should return true on update success', async () => {
      const sut = makeSut()
      const { id } = await Helper.makeCategory()
      const result = await sut.update({
        id: id.toString(),
        name: 'new_name'
      })
      const { name } = await Helper.findCategoryById(id)
      expect(result).toBeTruthy()
      expect(name).toBe('new_name')
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
      const { name } = await Helper.makeCategory()
      const result = await sut.checkByName(name)
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

    test('Should return empty array if categories not exists', async () => {
      const sut = makeSut()
      const categories = await sut.loadAll()
      expect(categories).toEqual([])
    })
  })

  describe('checkById()', () => {
    test('Should return category on success', async () => {
      const sut = makeSut()
      const { id } = await Helper.makeCategory()
      const result = await sut.checkById(id.toString())
      expect(result).toBe(true)
    })

    test('Should return false if category not exists', async () => {
      const sut = makeSut()
      const result = await sut.checkById(faker.datatype.number().toString())
      expect(result).toBe(false)
    })

    test('Should return false if category id is not number', async () => {
      const sut = makeSut()
      const result = await sut.checkById(faker.random.word())
      expect(result).toBe(false)
    })
  })

  describe('delete()', () => {
    test('Should return category on delete success', async () => {
      const sut = makeSut()
      const { id, name } = await Helper.makeCategory()
      const categoryDeleted = await sut.delete(id.toString())
      const searchCategoryDeleted = await Helper.findCategoryById(id)
      expect(categoryDeleted).toEqual({ id: id.toString(), name })
      expect(searchCategoryDeleted).toBeFalsy()
    })
  })
})
