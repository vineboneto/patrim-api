import { DbAddOwner } from '@/data/usecases'
import { AddOwner } from '@/domain/usecases'
import { OwnerPostgresRepository, SectorPostgresRepository } from '@/infra/db/postgres-prisma'

export const makeDbAddOwner = (): AddOwner => {
  const ownerPostgresRepository = new OwnerPostgresRepository()
  const sectorPostgreRepository = new SectorPostgresRepository()
  return new DbAddOwner(ownerPostgresRepository, sectorPostgreRepository)
}
