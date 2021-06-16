import { DbLoadPatrimoniesByOwnerId } from '@/data/usecases'
import { LoadPatrimoniesByOwnerId } from '@/domain/usecases'
import { LoadPatrimoniesByOwnerIdPostgres } from '@/infra/db/postgres-prisma'

export const makeDbLoadPatrimoniesByOwnerId = (): LoadPatrimoniesByOwnerId => {
  return new DbLoadPatrimoniesByOwnerId(new LoadPatrimoniesByOwnerIdPostgres())
}
