import { PrismaHelper, CategoryPostgresRepository } from '@/infra/db/postgres-prisma'
import * as Helper from '@/tests/infra/db/postgres-prisma/helper'

import faker from 'faker'

const makeSut = (): CategoryPostgresRepository => new CategoryPostgresRepository()

describe('CategoryPostgresRepository', () => {
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
    test('Should return true on add success', async () => {
      const sut = makeSut()
      const { id: userId } = await Helper.makeUser()
      const model = await sut.add({
        accountId: userId,
        name: faker.name.findName()
      })
      expect(model).toBeTruthy()
    })
  })

  describe('update()', () => {
    test('Should return true on update success', async () => {
      const sut = makeSut()
      const { id, userId } = await Helper.makeCategory()
      const model = await sut.update({
        id: id,
        name: 'new_name',
        accountId: userId
      })
      const { name } = await Helper.findCategoryById(id)
      expect(model).toBeTruthy()
      expect(name).toBe('new_name')
    })
  })

  describe('loadById()', () => {
    test('Should return category on success', async () => {
      const sut = makeSut()
      const data: any = await Helper.makeCategory()
      const category = await sut.loadById({ id: data.id, accountId: data.userId })
      expect(category).toEqual({
        id: data.id,
        name: data.name
      })
    })

    test('Should return null if category not exist', async () => {
      const sut = makeSut()
      const category = await sut.loadById({
        id: faker.datatype.number(),
        accountId: faker.datatype.number()
      })
      expect(category).toBe(null)
    })
  })

  describe('loadNameById()', () => {
    test('Should return name category on success', async () => {
      const sut = makeSut()
      const { id, name } = await Helper.makeCategory()
      const categoryName = await sut.loadNameById(id)
      expect(categoryName).toEqual({ name })
    })

    test('Should return null on fails', async () => {
      const sut = makeSut()
      const categoryName = await sut.loadNameById(faker.datatype.number())
      expect(categoryName).toBe(null)
    })
  })

  describe('loadAll()', () => {
    test('Should return all categories if take and skip is NaN', async () => {
      const sut = makeSut()
      const categories = await Helper.makeManyCategories()
      const dataResponse = await sut.loadAll({ skip: NaN, take: NaN, accountId: categories[0].userId })
      const categoryWithoutUserId = categories.map((category) => ({ id: category.id, name: category.name }))
      expect(dataResponse.model).toEqual(categoryWithoutUserId)
      expect(dataResponse.count).toBe(3)
    })

    test('Should return the correctly number of categories if take and skip not undefined', async () => {
      const sut = makeSut()
      const categories = await Helper.makeManyCategories()
      const dataResponse = await sut.loadAll({ skip: 0, take: 2, accountId: categories[0].userId })
      const categoryWithoutUserId = categories.map((category) => ({ id: category.id, name: category.name }))
      expect(dataResponse.model[0]).toEqual(categoryWithoutUserId[0])
      expect(dataResponse.model[1]).toEqual(categoryWithoutUserId[1])
      expect(dataResponse.model[2]).toBe(undefined)
      expect(dataResponse.count).toBe(3)
      expect(dataResponse.model.length).toBe(2)
    })

    test('Should return empty array if load categories is empty', async () => {
      const sut = makeSut()
      const { id } = await Helper.makeUser()
      const dataResponse = await sut.loadAll({ skip: NaN, take: faker.datatype.number(), accountId: id })
      expect(dataResponse.model).toEqual([])
    })
  })

  describe('delete()', () => {
    test('Should return category on delete success', async () => {
      const sut = makeSut()
      const { id, name, userId } = await Helper.makeCategory()
      const categoryDeleted = await sut.delete({ id, accountId: userId })
      const searchCategoryDeleted = await Helper.findCategoryById(id)
      expect(categoryDeleted).toEqual({ id: id, name })
      expect(searchCategoryDeleted).toBeFalsy()
    })
  })
})
