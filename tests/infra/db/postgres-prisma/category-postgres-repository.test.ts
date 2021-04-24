import { PrismaHelper, CategoryPostgresRepository } from '@/infra/db/postgres-prisma'
import * as Helper from '@/tests/infra/db/postgres-prisma/helper'
import { mockCheckCategoryByIdRepositoryParams } from '@/tests/data/mocks'

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

  // describe('update()', () => {
  //   test('Should return true on update success', async () => {
  //     const sut = makeSut()
  //     const { id } = await Helper.makeCategory()
  //     const model = await sut.update({
  //       id: id,
  //       name: 'new_name'
  //     })
  //     const { name } = await Helper.findCategoryById(id)
  //     expect(model).toBeTruthy()
  //     expect(name).toBe('new_name')
  //   })
  // })

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
      const dataResponse = await sut.loadAll({ skip: NaN, take: NaN })
      expect(dataResponse).toEqual(categories)
      expect(dataResponse.length).toBe(3)
    })

    test('Should return the correctly number of categories if take and skip not undefined', async () => {
      const sut = makeSut()
      const categories = await Helper.makeManyCategories()
      const dataResponse = await sut.loadAll({ skip: 0, take: 2 })
      expect(dataResponse[0]).toEqual(categories[0])
      expect(dataResponse[1]).toEqual(categories[1])
      expect(dataResponse[2]).toBe(undefined)
      expect(dataResponse.length).toBe(2)
    })

    test('Should return empty array if load categories is empty', async () => {
      const sut = makeSut()
      const dataResponse = await sut.loadAll({ skip: NaN, take: faker.datatype.number() })
      expect(dataResponse).toEqual([])
    })
  })

  describe('checkByName()', () => {
    test('Should return false if category name do not exist', async () => {
      const sut = makeSut()
      const result = await sut.checkByName({
        name: faker.name.findName(),
        accountId: faker.datatype.number()
      })
      expect(result).toBeFalsy()
    })

    test('Should return true if category name already exists', async () => {
      const sut = makeSut()
      const { name, userId } = await Helper.makeCategory()
      const result = await sut.checkByName({
        name,
        accountId: userId
      })
      expect(result).toBeTruthy()
    })
  })

  describe('checkById()', () => {
    test('Should return true if category exists', async () => {
      const sut = makeSut()
      const { id } = await Helper.makeCategory()
      const result = await sut.checkById({ id })
      expect(result).toBe(true)
    })

    test('Should return false if category not exists', async () => {
      const sut = makeSut()
      const result = await sut.checkById(mockCheckCategoryByIdRepositoryParams())
      expect(result).toBe(false)
    })
  })

  // describe('delete()', () => {
  //   test('Should return category on delete success', async () => {
  //     const sut = makeSut()
  //     const { id, name } = await Helper.makeCategory()
  //     const categoryDeleted = await sut.delete({ id })
  //     const searchCategoryDeleted = await Helper.findCategoryById(id)
  //     expect(categoryDeleted).toEqual({ id: id, name })
  //     expect(searchCategoryDeleted).toBeFalsy()
  //   })
  // })
})
