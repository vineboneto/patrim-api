import { SectorPostgresRepository, PrismaHelper } from '@/infra/db/postgres-prisma'
import { mockAddSectorParams } from '@/tests/domain/mocks/mock-add-sector'

describe('SectorPostgresRepository', () => {
  beforeAll(() => {
    PrismaHelper.connect()
  })

  afterAll(async () => {
    PrismaHelper.disconnect()
  })

  beforeEach(async () => {
    const prismaClient = await PrismaHelper.getConnection()
    await prismaClient.$executeRaw('ALTER SEQUENCE "Sector_id_seq" RESTART WITH 1;')
    await prismaClient.$executeRaw('DELETE FROM "Sector";')
  })

  test('Should return true on add succeeds', async () => {
    const sut = new SectorPostgresRepository()
    const isValid = await sut.addSector(mockAddSectorParams())
    expect(isValid).toBeTruthy()
  })
})
