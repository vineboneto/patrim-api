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
      const { id: sectorId } = await Helper.makeSector()
      const name = faker.name.findName()
      const owner = await sut.add({ name, sectorId: sectorId })
      expect(owner).toBeTruthy()
      expect(owner.id).toBeTruthy()
      expect(owner.name).toBe(name)
      expect(owner.sectorId).toBe(sectorId)
    })
  })

  describe('update()', () => {
    test('Should return owner on update success', async () => {
      const sut = makeSut()
      const { id, sectorId } = await Helper.makeOwner()
      const ownerUpdated = await sut.update({
        id: id,
        name: 'new_name',
        sectorId
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

  describe('loadAll()', () => {
    test('Should return all owners if take and skip is NaN', async () => {
      const sut = makeSut()
      const owners = await Helper.makeManyOwners()
      const dataResponse = await sut.loadAll({ skip: Number('adfavzv'), take: Number('adfasdf') })
      expect(dataResponse).toEqual(owners)
      expect(dataResponse.length).toBe(6)
    })

    test('Should return the correctly number of owners if take and skip not undefined', async () => {
      const sut = makeSut()
      const owners = await Helper.makeManyOwners()
      const dataResponse = await sut.loadAll({ skip: 0, take: 3 })
      expect(dataResponse[0]).toEqual(owners[0])
      expect(dataResponse[1]).toEqual(owners[1])
      expect(dataResponse[2]).toEqual(owners[2])
      expect(dataResponse[3]).toBe(undefined)
      expect(dataResponse.length).toBe(3)
      const dataResponse2 = await sut.loadAll({ skip: 3, take: 3 })
      expect(dataResponse2[0]).toEqual(owners[3])
      expect(dataResponse2[1]).toEqual(owners[4])
      expect(dataResponse2[2]).toEqual(owners[5])
      expect(dataResponse2[3]).toEqual(undefined)
      expect(dataResponse2.length).toBe(3)
    })

    test('Should return empty array if loadOwner is empty', async () => {
      const sut = makeSut()
      const dataResponse = await sut.loadAll({ skip: NaN, take: NaN })
      expect(dataResponse).toEqual([])
    })
  })

  describe('delete()', () => {
    test('Should return owner on delete success', async () => {
      const sut = makeSut()
      const { id, name, sectorId } = await Helper.makeOwner()
      const sectorDeleted = await sut.delete({ id })
      const searchOwnerDeleted = await Helper.findOwnerById(id)
      expect(sectorDeleted).toEqual({ id, name, sectorId })
      expect(searchOwnerDeleted).toBeFalsy()
    })
  })

  describe('checkBySectorId()', () => {
    test('Should return true if exists patrimony', async () => {
      const sut = makeSut()
      const { sectorId } = await Helper.makeOwner()
      const exists = await sut.checkBySectorId({ sectorId })
      expect(exists).toBe(true)
    })

    test('Should return false if not exists patrimony', async () => {
      const sut = makeSut()
      const exists = await sut.checkBySectorId({ sectorId: faker.datatype.number() })
      expect(exists).toBe(false)
    })
  })
})
