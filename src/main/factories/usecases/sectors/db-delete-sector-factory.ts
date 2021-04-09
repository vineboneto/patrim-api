import { DbDeleteSector } from '@/data/usecases'
import { DeleteSector } from '@/domain/usecases'
import { SectorPostgresRepository } from '@/infra/db/postgres-prisma'

export const makeDbDeleteSector = (): DeleteSector => {
  const sectorPostgresRepository = new SectorPostgresRepository()
  return new DbDeleteSector(sectorPostgresRepository, sectorPostgresRepository)
}
