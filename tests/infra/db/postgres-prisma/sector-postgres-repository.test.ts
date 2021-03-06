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
      const { id, name, userId } = await Helper.makeSector()
      const sectorDeleted = await sut.delete({ id, accountId: userId })
      const searchSectorDeleted = await Helper.findSectorById(id)
      expect(sectorDeleted).toEqual({ id: id, name })
      expect(searchSectorDeleted).toBeFalsy()
    })
  })

  describe('loadById()', () => {
    test('Should return sector on success', async () => {
      const sut = makeSut()
      const data: any = await Helper.makeSector()
      const sector = await sut.loadById({ id: data.id, accountId: data.userId })
      expect(sector).toEqual({
        id: data.id,
        name: data.name
      })
    })

    test('Should return null if sector not exist', async () => {
      const sut = makeSut()
      const sector = await sut.loadById({
        id: faker.datatype.number(),
        accountId: faker.datatype.number()
      })
      expect(sector).toBe(null)
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
      expect(dataResponse.count).toBe(3)
      expect(dataResponse.model.length).toBe(2)
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
})
