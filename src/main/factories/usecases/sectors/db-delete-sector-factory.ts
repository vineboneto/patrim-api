import { DbDeleteSector } from '@/data/usecases'
import { DeleteSector } from '@/domain/usecases'
import { CheckDataByFieldPostgres, SectorPostgresRepository } from '@/infra/db/postgres-prisma'

export const makeDbDeleteSector = (): DeleteSector => {
  const sectorPostgresRepository = new SectorPostgresRepository()
  const ownerPostgresRepository = new CheckDataByFieldPostgres('sectorId', 'owner')
  return new DbDeleteSector(sectorPostgresRepository, ownerPostgresRepository)
}
