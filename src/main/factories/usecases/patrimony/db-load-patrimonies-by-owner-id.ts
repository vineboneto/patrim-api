import { DbLoadPatrimoniesByOwnerId } from '@/data/usecases'
import { LoadPatrimoniesByOwnerId } from '@/domain/usecases'
import { PatrimonyPostgresRepository } from '@/infra/db/postgres-prisma'

export const makeDbLoadPatrimoniesByOwnerId = (): LoadPatrimoniesByOwnerId => {
  return new DbLoadPatrimoniesByOwnerId(new PatrimonyPostgresRepository())
}
