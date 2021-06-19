import { DbUpdateSector } from '@/data/usecases'
import { UpdateSector } from '@/domain/usecases'
import {
  SectorPostgresRepository,
  CheckDataByFieldPostgres,
  LoadDataFieldByIdPostgres
} from '@/infra/db/postgres-prisma'

export const makeDbUpdateSector = (): UpdateSector => {
  const updateSectorPostgres = new SectorPostgresRepository()
  const loadSectorNameByIdPostgres = new LoadDataFieldByIdPostgres('name', 'sector')
  const checkExistsSectorByNamePostgres = new CheckDataByFieldPostgres('name', 'sector')
  return new DbUpdateSector(updateSectorPostgres, loadSectorNameByIdPostgres, checkExistsSectorByNamePostgres)
}
