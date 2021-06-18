import { DbUpdateSector } from '@/data/usecases'
import { UpdateSector } from '@/domain/usecases'
import { SectorPostgresRepository, CheckDataByFieldPostgres } from '@/infra/db/postgres-prisma'

export const makeDbUpdateSector = (): UpdateSector => {
  const sectorPostgresRepository = new SectorPostgresRepository()
  const checkDataByFieldPostgres = new CheckDataByFieldPostgres('name', 'sector')
  return new DbUpdateSector(sectorPostgresRepository, sectorPostgresRepository, checkDataByFieldPostgres)
}
