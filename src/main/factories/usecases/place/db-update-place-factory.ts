import { DbUpdatePlace } from '@/data/usecases'
import { UpdatePlace } from '@/domain/usecases'
import { PlacePostgresRepository } from '@/infra/db/postgres-prisma'

export const makeDbUpdatePlace = (): UpdatePlace => {
  const placePostgresRepository = new PlacePostgresRepository()
  return new DbUpdatePlace(placePostgresRepository, placePostgresRepository, placePostgresRepository)
}
