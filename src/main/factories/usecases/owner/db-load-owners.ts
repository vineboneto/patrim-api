import { DbLoadOwners } from '@/data/usecases'
import { LoadOwners } from '@/domain/usecases'
import { OwnerPostgresRepository } from '@/infra/db/postgres-prisma'

export const makeDbLoadOwners = (): LoadOwners => {
  return new DbLoadOwners(new OwnerPostgresRepository())
}
