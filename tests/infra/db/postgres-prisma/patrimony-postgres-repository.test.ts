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

  describe('checkByOwnerId()', () => {
    test('Should return true if exists patrimony', async () => {
      const sut = makeSut()
      const { Owner } = await Helper.makePatrimony()
      const exists = await sut.checkByOwnerId({ ownerId: Owner.id })
      expect(exists).toBe(true)
    })

    test('Should return false if not exists patrimony', async () => {
      const sut = makeSut()
      const exists = await sut.checkByOwnerId({
        ownerId: faker.datatype.number()
      })
      expect(exists).toBe(false)
    })
  })

  describe('checkByNumber()', () => {
    test('Should return true if exists number patrimony', async () => {
      const sut = makeSut()
      const { number, userId } = await Helper.makePatrimony()
      const exists = await sut.checkByNumber({
        number,
        accountId: userId
      })
      expect(exists).toBe(true)
    })

    test('Should return false if not exists number patrimony', async () => {
      const sut = makeSut()
      const exists = await sut.checkByNumber({
        number: faker.datatype.number().toString(),
        accountId: faker.datatype.number()
      })
      expect(exists).toBe(false)
    })
  })

  describe('checkByCategoryId()', () => {
    test('Should return true if exists patrimony', async () => {
      const sut = makeSut()
      const { Category } = await Helper.makePatrimony()
      const exists = await sut.checkByCategoryId({
        categoryId: Category.id
      })
      expect(exists).toBe(true)
    })

    test('Should return false if not exists patrimony', async () => {
      const sut = makeSut()
      const exists = await sut.checkByCategoryId({
        categoryId: faker.datatype.number()
      })
      expect(exists).toBe(false)
    })
  })
})
