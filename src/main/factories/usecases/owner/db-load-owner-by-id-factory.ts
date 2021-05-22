import { DbLoadOwnerById } from '@/data/usecases'
import { LoadOwnerById } from '@/domain/usecases'
import { OwnerPostgresRepository } from '@/infra/db/postgres-prisma'

export const makeDbLoadOwnerById = (): LoadOwnerById => {
  return new DbLoadOwnerById(new OwnerPostgresRepository())
}
