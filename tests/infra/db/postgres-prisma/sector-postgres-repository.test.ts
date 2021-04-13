import { SectorPostgresRepository, PrismaHelper } from '@/infra/db/postgres-prisma'
import { mockAddSectorParams, mockAddSectorsParams } from '@/tests/data/mocks'
import * as Helper from '@/tests/infra/db/postgres-prisma/helper'

import { PrismaClient } from '@prisma/client'
import faker from 'faker'

const makeSut = (): SectorPostgresRepository => new SectorPostgresRepository()

let prismaClient: PrismaClient

describe('SectorPostgresRepository', () => {
  beforeAll(() => {
    PrismaHelper.connect()
  })

  afterAll(async () => {
    await prismaClient.$executeRaw('DELETE FROM "Sector";')
    await prismaClient.$executeRaw('ALTER SEQUENCE "Sector_id_seq" RESTART WITH 1;')
    PrismaHelper.disconnect()
  })

  beforeEach(async () => {
    prismaClient = PrismaHelper.getConnection()
    await prismaClient.$executeRaw('DELETE FROM "Sector";')
  })

  describe('add()', () => {
    test('Should return true on add succeeds', async () => {
      const sut = makeSut()
      const isValid = await sut.add(mockAddSectorParams())
      expect(isValid).toBeTruthy()
    })
  })

  describe('update()', () => {
    test('Should return true on update success', async () => {
      const sut = makeSut()
      const { id } = await Helper.makeSector()
      const result = await sut.update({
        id: id.toString(),
        name: 'new_name'
      })
      const { name } = await Helper.findSectorById(id)
      expect(result).toBeTruthy()
      expect(name).toBe('new_name')
    })
  })

  describe('checkByName()', () => {
    test('Should return true if sector name exists', async () => {
      const sut = makeSut()
      const { name } = await Helper.makeSector()
      const isValid = await sut.checkByName(name)
      expect(isValid).toBe(true)
    })

    test('Should return false if sector name does not exists', async () => {
      const sut = makeSut()
      const isValid = await sut.checkByName(faker.name.findName())
      expect(isValid).toBe(false)
    })
  })

  describe('loadAll()', () => {
    test('Should returns all sectors on success', async () => {
      const sut = makeSut()
      await prismaClient.sector.createMany({
        data: mockAddSectorsParams()
      })
      const sectors = await sut.loadAll()
      expect(sectors).toBeTruthy()
      expect(sectors.length).toBe(3)
    })

    test('Should returns empty array if sectors not exists', async () => {
      const sut = makeSut()
      const sectors = await sut.loadAll()
      expect(sectors).toEqual([])
    })
  })

  describe('checkById()', () => {
    test('Should return sector on success', async () => {
      const sut = makeSut()
      const { id } = await Helper.makeSector()
      const result = await sut.checkById(id.toString())
      expect(result).toBe(true)
    })

    test('Should return false if sector not exists', async () => {
      const sut = makeSut()
      const result = await sut.checkById(faker.datatype.number().toString())
      expect(result).toBe(false)
    })

    test('Should return false if category id is not number', async () => {
      const sut = makeSut()
      const result = await sut.checkById(faker.random.word())
      expect(result).toBe(false)
    })
  })

  describe('delete()', () => {
    test('Should return sector on delete success', async () => {
      const sut = makeSut()
      const { id, name } = await Helper.makeSector()
      const sectorDeleted = await sut.delete(id.toString())
      const searchSectorDeleted = await Helper.findSectorById(id)
      expect(sectorDeleted).toEqual({ id: id.toString(), name })
      expect(searchSectorDeleted).toBeFalsy()
    })
  })
})
