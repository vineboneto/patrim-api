import { DbDeleteOwner } from '@/data/usecases'
import { DeleteOwner } from '@/domain/usecases'
import { OwnerPostgresRepository, CheckPatrimonyByFieldPostgres } from '@/infra/db/postgres-prisma'

export const makeDbDeleteOwner = (): DeleteOwner => {
  const ownerPostgresRepository = new OwnerPostgresRepository()
  const patrimonyPostgresRepository = new CheckPatrimonyByFieldPostgres('ownerId')
  return new DbDeleteOwner(ownerPostgresRepository, patrimonyPostgresRepository)
}
