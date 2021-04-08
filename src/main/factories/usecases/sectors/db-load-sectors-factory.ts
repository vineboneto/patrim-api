import { DbLoadSectors } from '@/data/usecases'
import { LoadSectors } from '@/domain/usecases'
import { SectorPostgresRepository } from '@/infra/db/postgres-prisma'

export const makeDbLoadSectors = (): LoadSectors => {
  return new DbLoadSectors(new SectorPostgresRepository())
}
