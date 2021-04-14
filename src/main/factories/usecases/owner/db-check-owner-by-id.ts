import { DbCheckOwnerById } from '@/data/usecases'
import { CheckOwnerById } from '@/domain/usecases'
import { OwnerPostgresRepository } from '@/infra/db/postgres-prisma'

export const makeDbCheckOwnerById = (): CheckOwnerById => {
  const ownerPostgresRepository = new OwnerPostgresRepository()
  return new DbCheckOwnerById(ownerPostgresRepository)
}
