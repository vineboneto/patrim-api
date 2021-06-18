import { CheckDataByFieldPostgres, PrismaHelper } from '@/infra/db/postgres-prisma'
import * as Helper from '@/tests/infra/db/postgres-prisma/helper'

import faker from 'faker'

const makeSut = (fieldName: string, dataBaseName: string): CheckDataByFieldPostgres =>
  new CheckDataByFieldPostgres(fieldName, dataBaseName)

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

  describe('checkByOwnerId()', () => {
    test('Should return true if exists patrimony', async () => {
      const sut = makeSut('ownerId', 'patrimony')
      const { Owner, userId } = await Helper.makePatrimony()
      const exists = await sut.checkByField({ accountId: userId, value: Owner.id })
      expect(exists).toBe(true)
    })

    test('Should return false if not exists patrimony', async () => {
      const sut = makeSut('ownerId', 'patrimony')
      const exists = await sut.checkByField({
        accountId: faker.datatype.number(),
        value: faker.datatype.number()
      })
      expect(exists).toBe(false)
    })
  })

  describe('checkByNumber()', () => {
    test('Should return true if exists number patrimony', async () => {
      const sut = makeSut('number', 'patrimony')
      const { number, userId } = await Helper.makePatrimony()
      const exists = await sut.checkByField({
        value: number,
        accountId: userId
      })
      expect(exists).toBe(true)
    })

    test('Should return false if not exists number patrimony', async () => {
      const sut = makeSut('number', 'patrimony')
      const exists = await sut.checkByField({
        value: faker.datatype.number().toString(),
        accountId: faker.datatype.number()
      })
      expect(exists).toBe(false)
    })
  })

  describe('checkByCategoryId()', () => {
    test('Should return true if exists patrimony', async () => {
      const sut = makeSut('categoryId', 'patrimony')
      const { Category, userId } = await Helper.makePatrimony()
      const exists = await sut.checkByField({
        value: Category.id,
        accountId: userId
      })
      expect(exists).toBe(true)
    })

    test('Should return false if not exists patrimony', async () => {
      const sut = makeSut('categoryId', 'patrimony')
      const exists = await sut.checkByField({
        value: faker.datatype.number(),
        accountId: faker.datatype.number()
      })
      expect(exists).toBe(false)
    })
  })

  describe('checkBySectorId()', () => {
    test('Should return true if exists patrimony', async () => {
      const sut = makeSut('sectorId', 'owner')
      const { Sector, userId } = await Helper.makeOwner()
      const exists = await sut.checkByField({ accountId: userId, value: Sector.id })
      expect(exists).toBe(true)
    })

    test('Should return false if not exists patrimony', async () => {
      const sut = makeSut('sectorId', 'owner')
      const exists = await sut.checkByField({
        value: faker.datatype.number(),
        accountId: faker.datatype.number()
      })
      expect(exists).toBe(false)
    })
  })

  describe('checkByName()', () => {
    test('Should return true if sector name exists', async () => {
      const sut = makeSut('name', 'sector')
      const { userId, name } = await Helper.makeSector()
      const isValid = await sut.checkByField({ value: name, accountId: userId })
      expect(isValid).toBe(true)
    })

    test('Should return false if sector name does not exists', async () => {
      const sut = makeSut('name', 'sector')
      const isValid = await sut.checkByField({
        accountId: faker.datatype.number(),
        value: faker.name.findName()
      })
      expect(isValid).toBe(false)
    })
  })
})
