import { SectorPostgresRepository } from '@/infra/db/postgres-prisma/sector-postgres-repository'
import { mockAddSectorParams } from '@/tests/domain/mocks/mock-add-sector'

import { PrismaClient } from '@prisma/client'

const prismaClient = new PrismaClient()

describe('SectorPostgresRepository', () => {
  afterAll(async () => {
    await prismaClient.$disconnect()
  })

  beforeEach(async () => {
    await prismaClient.$executeRaw('DELETE FROM "Sector";')
  })

  test('Should return true on add succeeds', async () => {
    const sut = new SectorPostgresRepository(prismaClient)
    const isValid = await sut.addSector(mockAddSectorParams())
    expect(isValid).toBeTruthy()
  })
})
