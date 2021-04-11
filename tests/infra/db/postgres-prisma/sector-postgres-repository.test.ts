import { SectorPostgresRepository, PrismaHelper } from '@/infra/db/postgres-prisma'
import { mockAddSectorParams, mockAddSectorsParams } from '@/tests/data/mocks'
import { mockSectorModel } from '@/tests/domain/mocks'

import { PrismaClient } from '@prisma/client'

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
    prismaClient = await PrismaHelper.getConnection()
    await prismaClient.$executeRaw('DELETE FROM "Sector";')
  })

  describe('add()', () => {
    test('Should return true on add succeeds', async () => {
      const sut = makeSut()
      const isValid = await sut.add(mockAddSectorParams())
      expect(isValid).toBeTruthy()
    })

    test('Should return false if addSector returns false', async () => {
      const sut = makeSut()
      jest.spyOn(prismaClient.sector, 'create').mockResolvedValueOnce(null)
      const isValid = await sut.add(mockAddSectorParams())
      expect(isValid).toBe(false)
    })
  })

  describe('update()', () => {
    test('Should return true on update success', async () => {
      const sut = makeSut()
      const { id } = await prismaClient.sector.create({
        data: mockAddSectorParams()
      })
      const result = await sut.update({
        id,
        name: 'new_name'
      })
      expect(result).toBeTruthy()
    })

    test('Should update data on success', async () => {
      const sut = makeSut()
      const { id } = await prismaClient.sector.create({
        data: mockAddSectorParams()
      })
      await sut.update({
        id,
        name: 'new_name'
      })
      const { name } = await prismaClient.sector.findFirst({
        where: {
          id
        }
      })
      expect(name).toBe('new_name')
    })
  })

  describe('checkByName()', () => {
    test('Should return true if sector name exists', async () => {
      const sut = makeSut()
      const { name } = mockAddSectorParams()
      await prismaClient.sector.create({
        data: {
          name
        }
      })
      const isValid = await sut.checkByName(name)
      expect(isValid).toBe(true)
    })

    test('Should return false if sector name does not exists', async () => {
      const sut = makeSut()
      const { name } = mockAddSectorParams()
      const isValid = await sut.checkByName(name)
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
      const { name } = mockAddSectorParams()
      const sectorModel = await prismaClient.sector.create({
        data: {
          name
        }
      })
      const result = await sut.checkById(sectorModel.id)
      expect(result).toBe(true)
    })

    test('Should return false if sector not exists', async () => {
      const sut = makeSut()
      const { id } = mockSectorModel()
      const result = await sut.checkById(id)
      expect(result).toBe(false)
    })
  })

  describe('delete()', () => {
    test('Should return sector on delete success', async () => {
      const sut = makeSut()
      const { name } = mockAddSectorParams()
      const sectorModel = await prismaClient.sector.create({
        data: {
          name
        }
      })
      const sectorDeleted = await sut.delete(sectorModel.id)
      const searchSectorDeleted = await prismaClient.sector.findFirst({
        where: {
          id: sectorDeleted.id
        }
      })
      expect(sectorDeleted).toEqual(sectorModel)
      expect(searchSectorDeleted).toBeFalsy()
    })
  })
})
