import { DbAddAccountPlace } from '@/data/usecases'
import { AddAccountPlace } from '@/domain/usecases'
import { AccountPlacePostgresRepository } from '@/infra/db/postgres-prisma'

export const makeDbAddAccountPlace = (): AddAccountPlace => {
  return new DbAddAccountPlace(new AccountPlacePostgresRepository())
}
