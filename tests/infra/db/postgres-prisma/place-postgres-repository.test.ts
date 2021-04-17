import { PlacePostgresRepository, PrismaHelper } from '@/infra/db/postgres-prisma'
import * as Helper from '@/tests/infra/db/postgres-prisma/helper'
import { mockAddPlaceRepositoryParams } from '@/tests/data/mocks'

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

  describe('checkByName', () => {
    test('Should return true if name exists', async () => {
      const sut = makeSut()
      const { name } = await Helper.makePlace()
      const result = await sut.checkByName(name)
      expect(result).toBe(true)
    })
  })
})
