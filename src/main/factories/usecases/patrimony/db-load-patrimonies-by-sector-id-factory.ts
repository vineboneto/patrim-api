import { DbLoadPatrimoniesBySectorId } from '@/data/usecases'
import { LoadPatrimoniesBySectorId } from '@/domain/usecases'
import { LoadPatrimoniesBySectorIdPostgres } from '@/infra/db/postgres-prisma'

export const makeDbLoadPatrimoniesBySectorId = (): LoadPatrimoniesBySectorId => {
  return new DbLoadPatrimoniesBySectorId(new LoadPatrimoniesBySectorIdPostgres())
}
