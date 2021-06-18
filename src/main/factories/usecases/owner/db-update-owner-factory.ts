import { DbUpdateOwner } from '@/data/usecases'
import { UpdateOwner } from '@/domain/usecases'
import { OwnerPostgresRepository } from '@/infra/db/postgres-prisma'

export const makeDbUpdateOwner = (): UpdateOwner => {
  return new DbUpdateOwner(new OwnerPostgresRepository())
}
