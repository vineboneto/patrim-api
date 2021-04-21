import { DbUpdateOwner } from '@/data/usecases'
import { UpdateOwner } from '@/domain/usecases'
import { OwnerPostgresRepository, SectorPostgresRepository } from '@/infra/db/postgres-prisma'

export const makeDbUpdateOwner = (): UpdateOwner => {
  const ownerPostgresRepository = new OwnerPostgresRepository()
  const sectorPostgreRepository = new SectorPostgresRepository()
  return new DbUpdateOwner(ownerPostgresRepository, sectorPostgreRepository)
}
