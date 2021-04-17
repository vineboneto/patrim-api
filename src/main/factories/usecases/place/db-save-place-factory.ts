import { DbSavePlace } from '@/data/usecases'
import { SavePlace } from '@/domain/usecases'
import { PlacePostgresRepository } from '@/infra/db/postgres-prisma'

export const makeDbSavePlace = (): SavePlace => {
  const placePostgresRepository = new PlacePostgresRepository()
  return new DbSavePlace(placePostgresRepository, placePostgresRepository, placePostgresRepository)
}
