import { DbAddPlace } from '@/data/usecases'
import { AddPlace } from '@/domain/usecases'
import { PlacePostgresRepository } from '@/infra/db/postgres-prisma'

export const makeDbAddPlace = (): AddPlace => {
  const placePostgresRepository = new PlacePostgresRepository()
  return new DbAddPlace(placePostgresRepository, placePostgresRepository)
}
