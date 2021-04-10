import { DbSaveSector } from '@/data/usecases'
import { SaveSector } from '@/domain/usecases'
import { SectorPostgresRepository } from '@/infra/db/postgres-prisma'

export const makeDbSaveSector = (): SaveSector => {
  const sectorPostgresRepository = new SectorPostgresRepository()
  return new DbSaveSector(sectorPostgresRepository, sectorPostgresRepository)
}
