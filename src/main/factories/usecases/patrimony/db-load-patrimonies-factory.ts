import { DbLoadPatrimonies } from '@/data/usecases'
import { LoadPatrimonies } from '@/domain/usecases'
import { LoadPatrimoniesPostgres } from '@/infra/db/postgres-prisma'

export const makeDbLoadPatrimonies = (): LoadPatrimonies => {
  return new DbLoadPatrimonies(new LoadPatrimoniesPostgres())
}
