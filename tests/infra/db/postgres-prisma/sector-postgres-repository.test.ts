import { SectorPostgresRepository, PrismaHelper } from '@/infra/db/postgres-prisma'
import { mockAddSectorParams, mockAddSectorsParams } from '@/tests/domain/mocks/mock-sector'

import { PrismaClient } from '@prisma/client'

const makeSut = (): SectorPostgresRepository => new SectorPostgresRepository()

let prismaClient: PrismaClient

describe('SectorPostgresRepository', () => {
  beforeAll(() => {
    PrismaHelper.connect()
  })

  afterAll(async () => {
    await prismaClient.$executeRaw('DELETE FROM "Sector";')
    PrismaHelper.disconnect()
  })

  beforeEach(async () => {
    prismaClient = await PrismaHelper.getConnection()
    await prismaClient.$executeRaw('ALTER SEQUENCE "Sector_id_seq" RESTART WITH 1;')
    await prismaClient.$executeRaw('DELETE FROM "Sector";')
  })

  describe('addSector()', () => {
    test('Should return true on add succeeds', async () => {
      const sut = makeSut()
      const isValid = await sut.addSector(mockAddSectorParams())
      expect(isValid).toBeTruthy()
    })

    test('Should return false if addSector returns false', async () => {
      const sut = makeSut()
      jest.spyOn(prismaClient.sector, 'create').mockResolvedValueOnce(null)
      const isValid = await sut.addSector(mockAddSectorParams())
      expect(isValid).toBe(false)
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

  describe('loadById', () => {
    test('Should return sector on success', async () => {
      const sut = makeSut()
      const data = mockAddSectorParams()
      const sectorModel = await prismaClient.sector.create({
        data: data
      })
      const result = await sut.loadById(sectorModel.id)
      expect(result).toEqual({
        id: sectorModel.id
      })
    })
  })
})
