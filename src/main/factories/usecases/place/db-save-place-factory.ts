import { PlacePostgresRepository } from '@/infra/db/postgres-prisma'
import { SavePlace } from '@/domain/usecases'
import { DbSavePlace } from '@/data/usecases'

export const makeDbSavePlace = (): SavePlace => {
  const placePostgresRepository = new PlacePostgresRepository()
  return new DbSavePlace(placePostgresRepository, placePostgresRepository, placePostgresRepository)
}
