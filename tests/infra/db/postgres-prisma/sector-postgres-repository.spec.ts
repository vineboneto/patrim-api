import { SectorPostgresRepository, PrismaHelper } from '@/infra/db/postgres-prisma'
import { mockAddSectorParams } from '@/tests/domain/mocks/mock-sector'

import { PrismaClient } from '@prisma/client'

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
      const sut = new SectorPostgresRepository()
      const isValid = await sut.addSector(mockAddSectorParams())
      expect(isValid).toBeTruthy()
    })

    test('Should return false if addSector returns false', async () => {
      const sut = new SectorPostgresRepository()
      jest.spyOn(prismaClient.sector, 'create').mockResolvedValueOnce(null)
      const isValid = await sut.addSector(mockAddSectorParams())
      expect(isValid).toBe(false)
    })
  })

  describe('checkByName()', () => {
    test('Should return true if sector name exists', async () => {
      const sut = new SectorPostgresRepository()
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
      const sut = new SectorPostgresRepository()
      const { name } = mockAddSectorParams()
      const isValid = await sut.checkByName(name)
      expect(isValid).toBe(false)
    })
  })
})
