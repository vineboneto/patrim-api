import { DbUpdateSector } from '@/data/usecases'
import { UpdateSector } from '@/domain/usecases'
import { SectorPostgresRepository } from '@/infra/db/postgres-prisma'

export const makeDbUpdateSector = (): UpdateSector => {
  const sectorPostgresRepository = new SectorPostgresRepository()
  return new DbUpdateSector(sectorPostgresRepository, sectorPostgresRepository, sectorPostgresRepository)
}
