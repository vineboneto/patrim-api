import { DbDeleteOwner } from '@/data/usecases'
import { DeleteOwner } from '@/domain/usecases'
import { OwnerPostgresRepository, CheckDataByFieldPostgres } from '@/infra/db/postgres-prisma'

export const makeDbDeleteOwner = (): DeleteOwner => {
  const ownerPostgresRepository = new OwnerPostgresRepository()
  const patrimonyPostgresRepository = new CheckDataByFieldPostgres('ownerId', 'patrimony')
  return new DbDeleteOwner(ownerPostgresRepository, patrimonyPostgresRepository)
}
