import { DbSaveOwner } from '@/data/usecases'
import { SaveOwner } from '@/domain/usecases'
import { OwnerPostgresRepository, SectorPostgresRepository } from '@/infra/db/postgres-prisma'

export const makeDbSaveOwner = (): SaveOwner => {
  const ownerPostgresRepository = new OwnerPostgresRepository()
  const sectorPostgreRepository = new SectorPostgresRepository()
  return new DbSaveOwner(ownerPostgresRepository, ownerPostgresRepository, sectorPostgreRepository)
}
