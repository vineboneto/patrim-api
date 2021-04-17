import { SectorPostgresRepository, PrismaHelper } from '@/infra/db/postgres-prisma'
import { mockAddSectorRepositoryParams, mockCheckSectorByIdRepositoryParams } from '@/tests/data/mocks'
import * as Helper from '@/tests/infra/db/postgres-prisma/helper'

import faker from 'faker'

const makeSut = (): SectorPostgresRepository => new SectorPostgresRepository()

describe('SectorPostgresRepository', () => {
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
    test('Should return sector on add succeeds', async () => {
      const sut = makeSut()
      const sector = await sut.add(mockAddSectorRepositoryParams())
      expect(sector).toBeTruthy()
    })
  })

  describe('update()', () => {
    test('Should return sector on update success', async () => {
      const sut = makeSut()
      const { id } = await Helper.makeSector()
      const result = await sut.update({
        id: id,
        name: 'new_name'
      })
      const { name } = await Helper.findSectorById(id)
      expect(result).toBeTruthy()
      expect(name).toBe('new_name')
    })
  })

  describe('checkByName()', () => {
    test('Should return true if sector name exists', async () => {
      const sut = makeSut()
      const { name } = await Helper.makeSector()
      const isValid = await sut.checkByName(name)
      expect(isValid).toBe(true)
    })

    test('Should return false if sector name does not exists', async () => {
      const sut = makeSut()
      const isValid = await sut.checkByName(faker.name.findName())
      expect(isValid).toBe(false)
    })
  })

  describe('loadAll()', () => {
    test('Should return all sectors if take and skip is NaN', async () => {
      const sut = makeSut()
      const sectors = await Helper.makeManySectors()
      const dataResponse = await sut.loadAll({ skip: NaN, take: NaN })
      expect(dataResponse).toEqual(sectors)
      expect(dataResponse.length).toBe(3)
    })

    test('Should return the correctly number of sectors if take and skip not undefined', async () => {
      const sut = makeSut()
      const sectors = await Helper.makeManySectors()
      const dataResponse = await sut.loadAll({ skip: 0, take: 2 })
      expect(dataResponse[0]).toEqual(sectors[0])
      expect(dataResponse[1]).toEqual(sectors[1])
      expect(dataResponse[2]).toBe(undefined)
      expect(dataResponse.length).toBe(2)
    })

    test('Should return empty array if load sectors is empty', async () => {
      const sut = makeSut()
      const dataResponse = await sut.loadAll({ skip: NaN, take: faker.datatype.number() })
      expect(dataResponse).toEqual([])
    })
  })

  describe('checkById()', () => {
    test('Should return true on success', async () => {
      const sut = makeSut()
      const { id } = await Helper.makeSector()
      const result = await sut.checkById({ id })
      expect(result).toBe(true)
    })

    test('Should return false if sector not exists', async () => {
      const sut = makeSut()
      const result = await sut.checkById(mockCheckSectorByIdRepositoryParams())
      expect(result).toBe(false)
    })
  })

  describe('delete()', () => {
    test('Should return sector on delete success', async () => {
      const sut = makeSut()
      const { id, name } = await Helper.makeSector()
      const sectorDeleted = await sut.delete({ id })
      const searchSectorDeleted = await Helper.findSectorById(id)
      expect(sectorDeleted).toEqual({ id: id, name })
      expect(searchSectorDeleted).toBeFalsy()
    })
  })
})
