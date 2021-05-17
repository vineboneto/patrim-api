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

  describe('add()', () => {
    test('Should return patrimony on add success', async () => {
      const sut = makeSut()
      const { id: accountId } = await Helper.makeUser()
      const { id: ownerId } = await Helper.makeOwner()
      const { id: categoryId } = await Helper.makeCategory()
      const data = await sut.add({
        number: faker.datatype.number().toString(),
        brand: faker.random.word(),
        description: faker.random.words(),
        categoryId,
        ownerId,
        accountId
      })
      expect(data).toBeTruthy()
      expect(data.category.id).toBe(categoryId)
      expect(data.owner.id).toBe(ownerId)
    })
  })

  describe('update()', () => {
    test('Should return patrimony on update success', async () => {
      const sut = makeSut()
      const { id: accountId } = await Helper.makeUser()
      const { id, description, Owner, Category } = await Helper.makePatrimony()
      const data = await sut.update({
        id,
        brand: 'new_brand',
        number: 'new_number',
        ownerId: Owner.id,
        categoryId: Category.id,
        accountId
      })
      expect(data.brand).toBe('new_brand')
      expect(data.number).toBe('new_number')
      expect(data.description).toBe(description)
      expect(data.owner.id).toBe(Owner.id)
      expect(data.category.id).toBe(Category.id)
    })
  })

  describe('delete()', () => {
    test('Should return patrimony deleted on success', async () => {
      const sut = makeSut()
      const { id, number } = await Helper.makePatrimony()
      const patrimony = await sut.delete({ id })
      const searchPatrimonyDeleted = await Helper.findPatrimonyById(id)
      expect(patrimony.id).toBe(id)
      expect(patrimony.number).toBe(number)
      expect(searchPatrimonyDeleted).toBeFalsy()
    })
  })

  describe('loadById()', () => {
    test('Should return patrimony on success', async () => {
      const sut = makeSut()
      const patrimonyModel: any = await Helper.makePatrimony()
      const patrimony = await sut.loadById({ id: patrimonyModel.id, accountId: patrimonyModel.userId })
      const patrimony_ = PrismaHelper.adaptPatrimony(patrimonyModel)
      expect(patrimony).toEqual(patrimony_)
    })

    test('Should return null on patrimony not exist', async () => {
      const sut = makeSut()
      const patrimony = await sut.loadById({
        id: faker.datatype.number(),
        accountId: faker.datatype.number()
      })
      expect(patrimony).toBe(null)
    })
  })

  describe('loadByNumber()', () => {
    test('Should return patrimony on success', async () => {
      const sut = makeSut()
      const patrimonyModel: any = await Helper.makePatrimony()
      const patrimony = await sut.loadByNumber({
        number: patrimonyModel.number,
        accountId: patrimonyModel.userId
      })
      const patrimony_ = PrismaHelper.adaptPatrimony(patrimonyModel)
      expect(patrimony).toEqual(patrimony_)
    })

    test('Should return null on patrimony not exist', async () => {
      const sut = makeSut()
      const patrimony = await sut.loadByNumber({
        number: faker.datatype.number().toString(),
        accountId: faker.datatype.number()
      })
      expect(patrimony).toBe(null)
    })
  })

  describe('loadAll()', () => {
    test('Should return all patrimonies if take and skip is NaN', async () => {
      const sut = makeSut()
      const patrimonies: any = await Helper.makeManyPatrimonies()
      const dataResponse = await sut.loadAll({
        skip: Number('adfavzv'),
        take: Number('adfasdf'),
        accountId: patrimonies[0].userId
      })
      const patrimonies_ = patrimonies.map(patrimony => PrismaHelper.adaptPatrimony(patrimony))
      expect(dataResponse.model).toEqual(patrimonies_)
      expect(dataResponse.count).toBe(3)
    })

    test('Should return the correctly number of patrimonies if take and skip not undefined', async () => {
      const sut = makeSut()
      const patrimonies: any = await Helper.makeManyPatrimonies()
      const dataResponse = await sut.loadAll({
        skip: 0,
        take: 3,
        accountId: patrimonies[0].userId
      })
      const patrimonies_ = patrimonies.map(patrimony => PrismaHelper.adaptPatrimony(patrimony))
      expect(dataResponse.model[0]).toEqual(patrimonies_[0])
      expect(dataResponse.model[1]).toEqual(patrimonies_[1])
      expect(dataResponse.model[2]).toEqual(patrimonies_[2])
      expect(dataResponse.model[3]).toBe(undefined)
      expect(dataResponse.count).toBe(3)
    })

    test('Should return empty array if load patrimonies is empty', async () => {
      const sut = makeSut()
      const dataResponse = await sut.loadAll({
        skip: NaN,
        take: NaN,
        accountId: faker.datatype.number()
      })
      expect(dataResponse.model).toEqual([])
    })
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
      const { Owner, userId } = await Helper.makePatrimony()
      const exists = await sut.checkByOwnerId({ ownerId: Owner.id, accountId: userId })
      expect(exists).toBe(true)
    })

    test('Should return false if not exists patrimony', async () => {
      const sut = makeSut()
      const exists = await sut.checkByOwnerId({
        ownerId: faker.datatype.number(),
        accountId: faker.datatype.number()
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
      const { Category, userId } = await Helper.makePatrimony()
      const exists = await sut.checkByCategoryId({
        categoryId: Category.id,
        accountId: userId
      })
      expect(exists).toBe(true)
    })

    test('Should return false if not exists patrimony', async () => {
      const sut = makeSut()
      const exists = await sut.checkByCategoryId({
        categoryId: faker.datatype.number(),
        accountId: faker.datatype.number()
      })
      expect(exists).toBe(false)
    })
  })
})
