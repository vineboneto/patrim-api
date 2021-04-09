import { DbAddSector } from '@/data/usecases/sector/db-add-sector'
import { AddSector } from '@/domain/usecases'
import { SectorPostgresRepository } from '@/infra/db/postgres-prisma'

export const makeDbAddSector = (): AddSector => {
  const sectorPostgresRepository = new SectorPostgresRepository()
  return new DbAddSector(sectorPostgresRepository, sectorPostgresRepository)
}
