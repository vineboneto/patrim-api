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

  describe('delete()', () => {
    test('Should return patrimony deleted on success', async () => {
      const sut = makeSut()
      const { id, number } = await Helper.makePatrimony()
      const patrimony = await sut.delete({ id })
      const searchPatrimonyDeleted = await Helper.findPatrimonyById(id)
      expect(patrimony.id).toBe(id)
      expect(patrimony.number).toBe(number)
      expect(searchPatrimonyDeleted).toBeFalsy()
    })
  })

  describe('loadByOwnerId()', () => {
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

  describe('loadById()', () => {
    test('Should return patrimony on success', async () => {
      const sut = makeSut()
      const patrimonyModel = await Helper.makePatrimony()
      const patrimony = await sut.loadById({ id: patrimonyModel.id })
      expect(patrimony).toEqual(patrimonyModel)
    })
  })

  describe('loadAll()', () => {
    test('Should return all patrimonies if take and skip is NaN', async () => {
      const sut = makeSut()
      const patrimonies = await Helper.makeManyPatrimonies()
      const dataResponse = await sut.loadAll({ skip: Number('adfavzv'), take: Number('adfasdf') })
      expect(dataResponse).toEqual(patrimonies)
      expect(dataResponse.length).toBe(3)
    })

    test('Should return the correctly number of patrimonies if take and skip not undefined', async () => {
      const sut = makeSut()
      const patrimonies = await Helper.makeManyPatrimonies()
      const dataResponse = await sut.loadAll({ skip: 0, take: 3 })
      expect(dataResponse[0]).toEqual(patrimonies[0])
      expect(dataResponse[1]).toEqual(patrimonies[1])
      expect(dataResponse[2]).toEqual(patrimonies[2])
      expect(dataResponse[3]).toBe(undefined)
      expect(dataResponse.length).toBe(3)
    })

    test('Should return empty array if load patrimonies is empty', async () => {
      const sut = makeSut()
      const dataResponse = await sut.loadAll({ skip: NaN, take: NaN })
      expect(dataResponse).toEqual([])
    })
  })

  describe('loadNumberById()', () => {
    test('Should return number patrimony on success', async () => {
      const sut = makeSut()
      const { id, number } = await Helper.makePatrimony()
      const patrimonyNumber = await sut.loadNumberById(id)
      expect(patrimonyNumber).toEqual({ number })
    })

    test('Should return null on fails', async () => {
      const sut = makeSut()
      const patrimonyNumber = await sut.loadNumberById(faker.datatype.number())
      expect(patrimonyNumber).toBe(null)
    })
  })

  describe('checkById', () => {
    test('Should return true if id exists', async () => {
      const sut = makeSut()
      const { id } = await Helper.makePatrimony()
      const result = await sut.checkById({ id })
      expect(result).toBe(true)
    })

    test('Should return false if id not exists', async () => {
      const sut = makeSut()
      const result = await sut.checkById({ id: faker.datatype.number() })
      expect(result).toBe(false)
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
