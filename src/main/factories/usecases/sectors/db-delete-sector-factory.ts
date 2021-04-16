import { DbDeleteSector } from '@/data/usecases'
import { DeleteSector } from '@/domain/usecases'
import { OwnerPostgresRepository, SectorPostgresRepository } from '@/infra/db/postgres-prisma'

export const makeDbDeleteSector = (): DeleteSector => {
  const sectorPostgresRepository = new SectorPostgresRepository()
  const ownerPostgresRepository = new OwnerPostgresRepository()
  return new DbDeleteSector(sectorPostgresRepository, ownerPostgresRepository)
}
