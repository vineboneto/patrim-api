import { OwnerPostgresRepository, PrismaHelper } from '@/infra/db/postgres-prisma'
import * as Helper from '@/tests/infra/db/postgres-prisma/helper'

import { PrismaClient } from '@prisma/client'
import faker from 'faker'

const makeSut = (): OwnerPostgresRepository => new OwnerPostgresRepository()

let prismaClient: PrismaClient

describe('OwnerPostgresRepository', () => {
  beforeAll(() => {
    PrismaHelper.connect()
  })

  afterAll(async () => {
    await prismaClient.$executeRaw('DELETE FROM "Owner";')
    await prismaClient.$executeRaw('ALTER SEQUENCE "Owner_id_seq" RESTART WITH 1;')
    await prismaClient.$executeRaw('DELETE FROM "Sector";')
    await prismaClient.$executeRaw('ALTER SEQUENCE "Sector_id_seq" RESTART WITH 1;')
    PrismaHelper.disconnect()
  })

  beforeEach(async () => {
    prismaClient = PrismaHelper.getConnection()
    await prismaClient.$executeRaw('DELETE FROM "Owner";')
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
      const { id: sectorId } = await Helper.makeSector()
      const name = faker.name.findName()
      const { id } = await Helper.makeOwner({ name, sectorId: sectorId })
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
      const name = faker.name.findName()
      const { id: sectorId } = await Helper.makeSector()
      const { id } = await Helper.makeOwner({ name, sectorId })
      const result = await sut.checkById(id)
      expect(result).toBe(true)
    })

    test('Should return false if owner not exists', async () => {
      const sut = makeSut()
      const result = await sut.checkById(faker.datatype.number())
      expect(result).toBe(false)
    })

    test('Should return false if owner id is not number', async () => {
      const sut = makeSut()
      const result = await sut.checkById(faker.random.word())
      expect(result).toBe(false)
    })
  })

  describe('loadAll()', () => {
    test('Should return owners all owner if take and skip is undefined', async () => {
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
})
