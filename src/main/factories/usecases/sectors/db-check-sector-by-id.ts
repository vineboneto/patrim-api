import { DbCheckSectorById } from '@/data/usecases'
import { CheckSectorById } from '@/domain/usecases'
import { SectorPostgresRepository } from '@/infra/db/postgres-prisma'

export const makeDbCheckSectorById = (): CheckSectorById => {
  const sectorPostgresRepository = new SectorPostgresRepository()
  return new DbCheckSectorById(sectorPostgresRepository)
}
