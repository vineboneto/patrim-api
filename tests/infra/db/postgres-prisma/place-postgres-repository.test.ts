import { PlacePostgresRepository, PrismaHelper } from '@/infra/db/postgres-prisma'
import * as Helper from '@/tests/infra/db/postgres-prisma/helper'
import { mockAddPlaceRepositoryParams } from '@/tests/data/mocks'

import faker from 'faker'

const makeSut = (): PlacePostgresRepository => new PlacePostgresRepository()

describe('PlacePostgresRepository', () => {
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
    test('Should return place on add on success', async () => {
      const sut = makeSut()
      const { id, name } = await sut.add(mockAddPlaceRepositoryParams())
      const place = await Helper.findPlaceById(id)
      expect(place.id).toBe(id)
      expect(place.name).toBe(name)
    })
  })

  describe('update()', () => {
    test('Should returns place on update success', async () => {
      const sut = makeSut()
      const { id } = await Helper.makePlace()
      const updatedPlace = await sut.update({
        id: id,
        name: 'new_name'
      })
      expect(updatedPlace.name).toBe('new_name')
    })
  })

  describe('delete()', () => {
    test('Should return place deleted on success', async () => {
      const sut = makeSut()
      const { id, name } = await Helper.makePlace()
      const place = await sut.delete({ id })
      const searchPlaceDeleted = await Helper.findPlaceById(id)
      expect(place.id).toBe(id)
      expect(place.name).toBe(name)
      expect(searchPlaceDeleted).toBeFalsy()
    })
  })

  describe('loadNameById()', () => {
    test('Should return name place on success', async () => {
      const sut = makeSut()
      const { id, name } = await Helper.makePlace()
      const placeName = await sut.loadNameById(id)
      expect(placeName).toEqual({ name })
    })

    test('Should return null on fails', async () => {
      const sut = makeSut()
      const placeName = await sut.loadNameById(faker.datatype.number())
      expect(placeName).toBe(null)
    })
  })

  describe('loadAll()', () => {
    test('Should return all places if take and skip is NaN', async () => {
      const sut = makeSut()
      const places = await Helper.makeManyPlaces()
      const dataResponse = await sut.loadAll({ skip: Number('adfavzv'), take: Number('adfasdf') })
      expect(dataResponse).toEqual(places)
      expect(dataResponse.length).toBe(3)
    })

    test('Should return the correctly number of places if take and skip not undefined', async () => {
      const sut = makeSut()
      const places = await Helper.makeManyPlaces()
      const dataResponse = await sut.loadAll({ skip: 0, take: 3 })
      expect(dataResponse[0]).toEqual(places[0])
      expect(dataResponse[1]).toEqual(places[1])
      expect(dataResponse[2]).toEqual(places[2])
      expect(dataResponse[3]).toBe(undefined)
      expect(dataResponse.length).toBe(3)
    })

    test('Should return empty array if load places is empty', async () => {
      const sut = makeSut()
      const dataResponse = await sut.loadAll({ skip: NaN, take: NaN })
      expect(dataResponse).toEqual([])
    })
  })

  describe('checkByName', () => {
    test('Should return true if name exists', async () => {
      const sut = makeSut()
      const { name } = await Helper.makePlace()
      const result = await sut.checkByName(name)
      expect(result).toBe(true)
    })

    test('Should return false if name not exists', async () => {
      const sut = makeSut()
      const result = await sut.checkByName(faker.name.findName())
      expect(result).toBe(false)
    })
  })

  describe('checkById', () => {
    test('Should return true if id exists', async () => {
      const sut = makeSut()
      const { id } = await Helper.makePlace()
      const result = await sut.checkById({ id })
      expect(result).toBe(true)
    })

    test('Should return false if id not exists', async () => {
      const sut = makeSut()
      const result = await sut.checkById({ id: faker.datatype.number() })
      expect(result).toBe(false)
    })
  })
})
