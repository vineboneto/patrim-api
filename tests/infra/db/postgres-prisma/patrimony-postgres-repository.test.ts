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

  describe('loadByOwnerId()', () => {
    test('Should return all patrimonies on success', async () => {
      const sut = makeSut()
      const patrimonies: any = await Helper.makeManyPatrimonies()
      const dataResponse = await sut.loadByOwnerId({
        ownerId: patrimonies[0].Owner.id,
        accountId: patrimonies[0].userId
      })
      const patrimonies_ = patrimonies.map(patrimony => PrismaHelper.adaptPatrimony(patrimony))
      expect(dataResponse.model).toEqual(patrimonies_)
      expect(dataResponse.count).toBe(3)
    })

    test('Should return the correctly number of patrimonies if take and skip not undefined', async () => {
      const sut = makeSut()
      const patrimonies: any = await Helper.makeManyPatrimonies()
      const dataResponse = await sut.loadByOwnerId({
        ownerId: patrimonies[0].Owner.id,
        skip: 0,
        take: 2,
        accountId: patrimonies[0].userId
      })
      const patrimonies_ = patrimonies.map(patrimony => PrismaHelper.adaptPatrimony(patrimony))
      expect(dataResponse.model[0]).toEqual(patrimonies_[0])
      expect(dataResponse.model[1]).toEqual(patrimonies_[1])
      expect(dataResponse.model[2]).toBe(undefined)
      expect(dataResponse.model.length).toBe(2)
      expect(dataResponse.count).toBe(3)
    })

    test('Should return empty array if load patrimonies is empty', async () => {
      const sut = makeSut()
      const dataResponse = await sut.loadByOwnerId({
        ownerId: faker.datatype.number(),
        accountId: faker.datatype.number()
      })
      expect(dataResponse.model).toEqual([])
    })
  })

  describe('loadBySectorId()', () => {
    test('Should return all patrimonies on success', async () => {
      const sut = makeSut()
      const patrimonies: any = await Helper.makeManyPatrimonies()
      await Helper.makeManyPatrimonies()
      const dataResponse = await sut.loadBySectorId({
        sectorId: patrimonies[0].Owner.sectorId,
        accountId: patrimonies[0].userId
      })
      const patrimonies_ = patrimonies.map(patrimony => PrismaHelper.adaptPatrimony(patrimony))
      expect(dataResponse.model).toEqual(patrimonies_)
      expect(dataResponse.count).toBe(3)
    })

    test('Should return the correctly number of patrimonies if take and skip not undefined', async () => {
      const sut = makeSut()
      const patrimonies: any = await Helper.makeManyPatrimonies()
      const dataResponse = await sut.loadBySectorId({
        sectorId: patrimonies[0].Owner.sectorId,
        skip: 0,
        take: 2,
        accountId: patrimonies[0].userId
      })
      const patrimonies_ = patrimonies.map(patrimony => PrismaHelper.adaptPatrimony(patrimony))
      expect(dataResponse.model[0]).toEqual(patrimonies_[0])
      expect(dataResponse.model[1]).toEqual(patrimonies_[1])
      expect(dataResponse.model[2]).toBe(undefined)
      expect(dataResponse.model.length).toBe(2)
      expect(dataResponse.count).toBe(3)
    })

    test('Should return empty array if load patrimonies is empty', async () => {
      const sut = makeSut()
      const dataResponse = await sut.loadBySectorId({
        sectorId: faker.datatype.number(),
        accountId: faker.datatype.number()
      })
      expect(dataResponse.model).toEqual([])
    })
  })

  describe('loadByCategoryId()', () => {
    test('Should return all patrimonies on success', async () => {
      const sut = makeSut()
      const patrimonies: any = await Helper.makeManyPatrimonies()
      const dataResponse = await sut.loadByCategoryId({
        categoryId: patrimonies[0].Category.id,
        accountId: patrimonies[0].userId
      })
      const patrimonies_ = patrimonies.map(patrimony => PrismaHelper.adaptPatrimony(patrimony))
      expect(dataResponse.model).toEqual(patrimonies_)
      expect(dataResponse.count).toBe(3)
    })

    test('Should return the correctly number of patrimonies if take and skip not undefined', async () => {
      const sut = makeSut()
      const patrimonies: any = await Helper.makeManyPatrimonies()
      const dataResponse = await sut.loadByCategoryId({
        categoryId: patrimonies[0].Category.id,
        skip: 0,
        take: 2,
        accountId: patrimonies[0].userId
      })
      const patrimonies_ = patrimonies.map(patrimony => PrismaHelper.adaptPatrimony(patrimony))
      expect(dataResponse.model[0]).toEqual(patrimonies_[0])
      expect(dataResponse.model[1]).toEqual(patrimonies_[1])
      expect(dataResponse.model[2]).toBe(undefined)
      expect(dataResponse.model.length).toBe(2)
      expect(dataResponse.count).toBe(3)
    })

    test('Should return empty array if load patrimonies is empty', async () => {
      const sut = makeSut()
      const dataResponse = await sut.loadByCategoryId({
        categoryId: faker.datatype.number(),
        accountId: faker.datatype.number()
      })
      expect(dataResponse.model).toEqual([])
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
