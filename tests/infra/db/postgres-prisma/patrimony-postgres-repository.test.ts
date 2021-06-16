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

  describe('loadOwnerIdById()', () => {
    test('Should return ownerId on success', async () => {
      const sut = makeSut()
      const { id, Owner } = await Helper.makePatrimony()
      const ownerId = await sut.loadOwnerIdById(id)
      expect(ownerId).toBe(Owner.id)
    })

    test('Should return null on fails', async () => {
      const sut = makeSut()
      const ownerId = await sut.loadOwnerIdById(faker.datatype.number())
      expect(ownerId).toBe(null)
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

  describe('checkByOwnerId()', () => {
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
