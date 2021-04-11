import { DbCheckAccountById } from '@/data/usecases'
import { CheckAccountById } from '@/domain/usecases'
import { AccountPostgresRepository } from '@/infra/db/postgres-prisma'

export const makeDbCheckAccountById = (): CheckAccountById => {
  return new DbCheckAccountById(new AccountPostgresRepository())
}
