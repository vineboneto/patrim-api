import { CheckPatrimonyByFieldPostgres, PrismaHelper } from '@/infra/db/postgres-prisma'
import * as Helper from '@/tests/infra/db/postgres-prisma/helper'

import faker from 'faker'

const makeSut = (fieldName: string): CheckPatrimonyByFieldPostgres => new CheckPatrimonyByFieldPostgres(fieldName)

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
      const sut = makeSut('ownerId')
      const { Owner, userId } = await Helper.makePatrimony()
      const exists = await sut.checkByField({ accountId: userId, value: Owner.id })
      expect(exists).toBe(true)
    })

    test('Should return false if not exists patrimony', async () => {
      const sut = makeSut('ownerId')
      const exists = await sut.checkByField({
        accountId: faker.datatype.number(),
        value: faker.datatype.number()
      })
      expect(exists).toBe(false)
    })
  })

  describe('checkByNumber()', () => {
    test('Should return true if exists number patrimony', async () => {
      const sut = makeSut('number')
      const { number, userId } = await Helper.makePatrimony()
      const exists = await sut.checkByField({
        value: number,
        accountId: userId
      })
      expect(exists).toBe(true)
    })

    test('Should return false if not exists number patrimony', async () => {
      const sut = makeSut('number')
      const exists = await sut.checkByField({
        value: faker.datatype.number().toString(),
        accountId: faker.datatype.number()
      })
      expect(exists).toBe(false)
    })
  })

  describe('checkByCategoryId()', () => {
    test('Should return true if exists patrimony', async () => {
      const sut = makeSut('categoryId')
      const { Category, userId } = await Helper.makePatrimony()
      const exists = await sut.checkByField({
        value: Category.id,
        accountId: userId
      })
      expect(exists).toBe(true)
    })

    test('Should return false if not exists patrimony', async () => {
      const sut = makeSut('categoryId')
      const exists = await sut.checkByField({
        value: faker.datatype.number(),
        accountId: faker.datatype.number()
      })
      expect(exists).toBe(false)
    })
  })
})
