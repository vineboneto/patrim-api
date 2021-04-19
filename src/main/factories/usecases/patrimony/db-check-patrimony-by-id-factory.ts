import { DbCheckPatrimonyById } from '@/data/usecases'
import { CheckPatrimonyById } from '@/domain/usecases'
import { PatrimonyPostgresRepository } from '@/infra/db/postgres-prisma'

export const makeDbCheckPatrimonyById = (): CheckPatrimonyById => {
  return new DbCheckPatrimonyById(new PatrimonyPostgresRepository())
}
