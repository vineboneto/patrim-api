import { SectorPostgresRepository, PrismaHelper } from '@/infra/db/postgres-prisma'
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
      const { id: userId } = await Helper.makeUser()
      const sector = await sut.add({
        accountId: userId,
        name: faker.name.findName()
      })
      expect(sector).toBeTruthy()
    })
  })

  describe('update()', () => {
    test('Should return sector on update success', async () => {
      const sut = makeSut()
      const { id, userId } = await Helper.makeSector()
      const result = await sut.update({
        id: id,
        name: 'new_name',
        accountId: userId
      })
      const { name } = await Helper.findSectorById(id)
      expect(result).toBeTruthy()
      expect(name).toBe('new_name')
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

  describe('loadNameById()', () => {
    test('Should return name sector on success', async () => {
      const sut = makeSut()
      const { id, name } = await Helper.makeSector()
      const sectorName = await sut.loadNameById(id)
      expect(sectorName).toEqual({ name })
    })

    test('Should return null on fails', async () => {
      const sut = makeSut()
      const sectorName = await sut.loadNameById(faker.datatype.number())
      expect(sectorName).toBe(null)
    })
  })

  describe('loadAll()', () => {
    test('Should return all sectors if take and skip is NaN', async () => {
      const sut = makeSut()
      const sectors = await Helper.makeManySectors()
      const dataResponse = await sut.loadAll({ skip: NaN, take: NaN, accountId: sectors[0].userId })
      const sectorWithoutUserId = sectors.map((sector) => ({ id: sector.id, name: sector.name }))
      expect(dataResponse.model).toEqual(sectorWithoutUserId)
      expect(dataResponse.count).toBe(3)
    })

    test('Should return the correctly number of sectors if take and skip not undefined', async () => {
      const sut = makeSut()
      const sectors = await Helper.makeManySectors()
      const dataResponse = await sut.loadAll({ skip: 0, take: 2, accountId: sectors[0].userId })
      const sectorWithoutUserId = await sectors.map((sector) => ({ id: sector.id, name: sector.name }))
      expect(dataResponse.model[0]).toEqual(sectorWithoutUserId[0])
      expect(dataResponse.model[1]).toEqual(sectorWithoutUserId[1])
      expect(dataResponse.model[2]).toBe(undefined)
      expect(dataResponse.count).toBe(2)
    })

    test('Should return empty array if load sectors is empty', async () => {
      const sut = makeSut()
      const dataResponse = await sut.loadAll({
        skip: NaN,
        take: faker.datatype.number(),
        accountId: faker.datatype.number()
      })
      expect(dataResponse.model).toEqual([])
    })
  })

  describe('checkByName()', () => {
    test('Should return true if sector name exists', async () => {
      const sut = makeSut()
      const { userId, name } = await Helper.makeSector()
      const isValid = await sut.checkByName({ name, accountId: userId })
      expect(isValid).toBe(true)
    })

    test('Should return false if sector name does not exists', async () => {
      const sut = makeSut()
      const isValid = await sut.checkByName({
        accountId: faker.datatype.number(),
        name: faker.name.findName()
      })
      expect(isValid).toBe(false)
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
      const result = await sut.checkById({ id: faker.datatype.number() })
      expect(result).toBe(false)
    })
  })
})
