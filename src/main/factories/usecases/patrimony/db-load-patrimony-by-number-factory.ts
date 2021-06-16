import { DbLoadPatrimonyByNumber } from '@/data/usecases'
import { LoadPatrimonyByNumber } from '@/domain/usecases'
import { LoadPatrimonyByNumberPostgres } from '@/infra/db/postgres-prisma'

export const makeDbLoadPatrimonyByNumber = (): LoadPatrimonyByNumber => {
  return new DbLoadPatrimonyByNumber(new LoadPatrimonyByNumberPostgres())
}
