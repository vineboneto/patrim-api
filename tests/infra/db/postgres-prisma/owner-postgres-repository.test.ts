import { OwnerPostgresRepository, PrismaHelper } from '@/infra/db/postgres-prisma'
import * as Helper from '@/tests/infra/db/postgres-prisma/helper'

import faker from 'faker'

const makeSut = (): OwnerPostgresRepository => new OwnerPostgresRepository()

describe('OwnerPostgresRepository', () => {
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
    test('Should return owner on add success', async () => {
      const sut = makeSut()
      const { id: sectorId, name: sectorName } = await Helper.makeSector()
      const { id: accountId } = await Helper.makeUser()
      const name = faker.name.findName()
      const owner = await sut.add({ name, sectorId, accountId })
      expect(owner).toBeTruthy()
      expect(owner.id).toBeTruthy()
      expect(owner.name).toBe(name)
      expect(owner.sector.id).toBe(sectorId)
      expect(owner.sector.name).toBe(sectorName)
    })
  })

  describe('update()', () => {
    test('Should return owner on update success', async () => {
      const sut = makeSut()
      const owner = await Helper.makeOwner()
      const ownerUpdated = await sut.update({
        id: owner.id,
        name: 'new_name',
        sectorId: owner.Sector.id,
        accountId: owner.userId
      })
      expect(ownerUpdated).toBeTruthy()
      expect(ownerUpdated.name).toBe('new_name')
    })
  })

  describe('checkById()', () => {
    test('Should return owner on success', async () => {
      const sut = makeSut()
      const { id } = await Helper.makeOwner()
      const result = await sut.checkById({ id })
      expect(result).toBe(true)
    })

    test('Should return false if owner not exists', async () => {
      const sut = makeSut()
      const result = await sut.checkById({ id: faker.datatype.number() })
      expect(result).toBe(false)
    })
  })

  describe('loadById()', () => {
    test('Should return owner on success', async () => {
      const sut = makeSut()
      const ownerModel: any = await Helper.makeOwner()
      const owner = await sut.loadById({ id: ownerModel.id, accountId: ownerModel.userId })
      const owner_ = PrismaHelper.adaptOwner(ownerModel)
      expect(owner).toEqual(owner_)
    })

    test('Should return null on owner not exist', async () => {
      const sut = makeSut()
      const owner = await sut.loadById({
        id: faker.datatype.number(),
        accountId: faker.datatype.number()
      })
      expect(owner).toBe(null)
    })
  })

  describe('loadAll()', () => {
    test('Should return all owners if take and skip is NaN', async () => {
      const sut = makeSut()
      const owners = await Helper.makeManyOwners()
      const dataResponse = await sut.loadAll({
        skip: Number('adfavzv'),
        take: Number('adfasdf'),
        accountId: owners[0].userId
      })
      const ownersWithoutUserId = owners.map((owner) => ({
        id: owner.id,
        name: owner.name,
        sector: {
          id: owner.Sector.id,
          name: owner.Sector.name
        }
      }))
      expect(dataResponse.model).toEqual(ownersWithoutUserId)
      expect(dataResponse.count).toBe(6)
    })

    test('Should return the correctly number of owners if take and skip not undefined', async () => {
      const sut = makeSut()
      const owners = await Helper.makeManyOwners()
      const dataResponse = await sut.loadAll({ skip: 0, take: 3, accountId: owners[0].userId })
      const ownersWithoutUserId = owners.map((owner) => ({
        id: owner.id,
        name: owner.name,
        sector: {
          id: owner.Sector.id,
          name: owner.Sector.name
        }
      }))
      expect(dataResponse.model[0]).toEqual(ownersWithoutUserId[0])
      expect(dataResponse.model[1]).toEqual(ownersWithoutUserId[1])
      expect(dataResponse.model[2]).toEqual(ownersWithoutUserId[2])
      expect(dataResponse.model[3]).toBe(undefined)
      expect(dataResponse.count).toBe(6)
      expect(dataResponse.model.length).toBe(3)
      const dataResponse2 = await sut.loadAll({ skip: 3, take: 3, accountId: owners[0].userId })
      expect(dataResponse2.model[0]).toEqual(ownersWithoutUserId[3])
      expect(dataResponse2.model[1]).toEqual(ownersWithoutUserId[4])
      expect(dataResponse2.model[2]).toEqual(ownersWithoutUserId[5])
      expect(dataResponse2.model[3]).toEqual(undefined)
      expect(dataResponse2.count).toBe(6)
      expect(dataResponse2.model.length).toBe(3)
    })

    test('Should return empty array if loadOwner is empty', async () => {
      const sut = makeSut()
      const dataResponse = await sut.loadAll({
        skip: NaN,
        take: NaN,
        accountId: faker.datatype.number()
      })
      expect(dataResponse.model).toEqual([])
    })
  })

  describe('delete()', () => {
    test('Should return owner on delete success', async () => {
      const sut = makeSut()
      const { id, name, Sector } = await Helper.makeOwner()
      const sectorDeleted = await sut.delete({ id })
      const searchOwnerDeleted = await Helper.findOwnerById(id)
      expect(sectorDeleted.id).toBe(id)
      expect(sectorDeleted.name).toBe(name)
      expect(sectorDeleted.sector.id).toBe(Sector.id)
      expect(sectorDeleted.sector.name).toBe(Sector.name)
      expect(searchOwnerDeleted).toBeFalsy()
    })
  })

  describe('checkBySectorId()', () => {
    test('Should return true if exists patrimony', async () => {
      const sut = makeSut()
      const { Sector } = await Helper.makeOwner()
      const exists = await sut.checkBySectorId({ sectorId: Sector.id })
      expect(exists).toBe(true)
    })

    test('Should return false if not exists patrimony', async () => {
      const sut = makeSut()
      const exists = await sut.checkBySectorId({
        sectorId: faker.datatype.number()
      })
      expect(exists).toBe(false)
    })
  })
})
