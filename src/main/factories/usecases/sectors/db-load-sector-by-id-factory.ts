import { DbLoadSectorById } from '@/data/usecases'
import { LoadSectorById } from '@/domain/usecases'
import { SectorPostgresRepository } from '@/infra/db/postgres-prisma'

export const makeDbLoadSectorById = (): LoadSectorById => {
  return new DbLoadSectorById(new SectorPostgresRepository())
}
