import { DbAddSector } from '@/data/usecases'
import { AddSector } from '@/domain/usecases'
import { CheckDataByFieldPostgres, SectorPostgresRepository } from '@/infra/db/postgres-prisma'

export const makeDbAddSector = (): AddSector => {
  const sectorPostgresRepository = new SectorPostgresRepository()
  const checkDataByFieldPostgres = new CheckDataByFieldPostgres('name', 'sector')
  return new DbAddSector(sectorPostgresRepository, checkDataByFieldPostgres)
}
