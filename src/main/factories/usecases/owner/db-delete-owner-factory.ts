import { DbDeleteOwner } from '@/data/usecases'
import { DeleteOwner } from '@/domain/usecases'
import { OwnerPostgresRepository, PatrimonyPostgresRepository } from '@/infra/db/postgres-prisma'

export const makeDbDeleteOwner = (): DeleteOwner => {
  const ownerPostgresRepository = new OwnerPostgresRepository()
  const patrimonyPostgresRepository = new PatrimonyPostgresRepository()
  return new DbDeleteOwner(ownerPostgresRepository, patrimonyPostgresRepository)
}
