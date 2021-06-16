import { DbCheckAccessData } from '@/data/usecases'
import { CheckAccessData } from '@/domain/usecases'
import { CheckAccessDataPostgres } from '@/infra/db/postgres-prisma'

export const makeDbCheckAccessData = (): CheckAccessData => {
  return new DbCheckAccessData(new CheckAccessDataPostgres())
}
