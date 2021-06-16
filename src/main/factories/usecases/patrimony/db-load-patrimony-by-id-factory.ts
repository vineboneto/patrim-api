import { DbLoadPatrimonyById } from '@/data/usecases'
import { LoadPatrimonyById } from '@/domain/usecases'
import { LoadPatrimonyByIdPostgres } from '@/infra/db/postgres-prisma'

export const makeDbLoadPatrimonyById = (): LoadPatrimonyById => {
  return new DbLoadPatrimonyById(new LoadPatrimonyByIdPostgres())
}
