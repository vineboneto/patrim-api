import { DbAddOwner } from '@/data/usecases'
import { AddOwner } from '@/domain/usecases'
import { OwnerPostgresRepository } from '@/infra/db/postgres-prisma'

export const makeDbAddOwner = (): AddOwner => {
  return new DbAddOwner(new OwnerPostgresRepository())
}
