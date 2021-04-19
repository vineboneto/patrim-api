import { PatrimonyPostgresRepository, PrismaHelper } from '@/infra/db/postgres-prisma'
import * as Helper from '@/tests/infra/db/postgres-prisma/helper'

import faker from 'faker'

const makeSut = (): PatrimonyPostgresRepository => new PatrimonyPostgresRepository()

describe('PatrimonyPostgresRepository', () => {
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
    test('Should return patrimony on add success', async () => {
      const sut = makeSut()
      const { id: placeId } = await Helper.makePlace()
      const { id: ownerId } = await Helper.makeOwner()
      const { id: categoryId } = await Helper.makeCategory()
      const data = await sut.add({
        number: faker.datatype.number().toString(),
        brand: faker.random.word(),
        description: faker.random.words(),
        categoryId,
        ownerId,
        placeId
      })
      expect(data).toBeTruthy()
      expect(data.category.id).toBe(categoryId)
      expect(data.place.id).toBe(placeId)
      expect(data.owner.id).toBe(ownerId)
    })
  })

  describe('update()', () => {
    test('Should return patrimony on update success', async () => {
      const sut = makeSut()
      const { id, description, owner, place, category } = await Helper.makePatrimony()
      const data = await sut.update({
        id,
        brand: 'new_brand',
        number: 'new_number',
        ownerId: owner.id,
        placeId: place.id,
        categoryId: category.id
      })
      expect(data.brand).toBe('new_brand')
      expect(data.number).toBe('new_number')
      expect(data.description).toBe(description)
      expect(data.owner.id).toBe(owner.id)
      expect(data.place.id).toBe(place.id)
      expect(data.category.id).toBe(category.id)
    })
  })

  describe('loadByPatrimonyId()', () => {
    test('Should return patrimony on success', async () => {
      const sut = makeSut()
      const { owner, id, number } = await Helper.makePatrimony()
      const patrimony = await sut.loadByOwnerId({ ownerId: owner.id })
      expect(patrimony).toEqual({
        id,
        number
      })
    })
  })

  describe('checkByOwnerId()', () => {
    test('Should return true if exists patrimony', async () => {
      const sut = makeSut()
      const { owner } = await Helper.makePatrimony()
      const exists = await sut.checkByOwnerId({ ownerId: owner.id })
      expect(exists).toBe(true)
    })

    test('Should return false if not exists patrimony', async () => {
      const sut = makeSut()
      const exists = await sut.checkByOwnerId({ ownerId: faker.datatype.number() })
      expect(exists).toBe(false)
    })
  })

  describe('checkByNumber()', () => {
    test('Should return true if exists number patrimony', async () => {
      const sut = makeSut()
      const { number } = await Helper.makePatrimony()
      const exists = await sut.checkByNumber(number)
      expect(exists).toBe(true)
    })

    test('Should return false if not exists number patrimony', async () => {
      const sut = makeSut()
      const exists = await sut.checkByNumber(faker.datatype.number().toString())
      expect(exists).toBe(false)
    })
  })

  describe('checkByOwnerId()', () => {
    test('Should return true if exists patrimony', async () => {
      const sut = makeSut()
      const { category } = await Helper.makePatrimony()
      const exists = await sut.checkByCategoryId({ categoryId: category.id })
      expect(exists).toBe(true)
    })

    test('Should return false if not exists patrimony', async () => {
      const sut = makeSut()
      const exists = await sut.checkByCategoryId({ categoryId: faker.datatype.number() })
      expect(exists).toBe(false)
    })
  })

  describe('checkByPlaceId()', () => {
    test('Should return true if exists patrimony', async () => {
      const sut = makeSut()
      const { place } = await Helper.makePatrimony()
      const exists = await sut.checkByPlaceId({ placeId: place.id })
      expect(exists).toBe(true)
    })

    test('Should return false if not exists patrimony', async () => {
      const sut = makeSut()
      const exists = await sut.checkByPlaceId({ placeId: faker.datatype.number() })
      expect(exists).toBe(false)
    })
  })
})
