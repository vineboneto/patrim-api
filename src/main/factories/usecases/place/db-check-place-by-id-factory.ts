import { DbCheckPlaceById } from '@/data/usecases'
import { CheckPlaceById } from '@/domain/usecases'
import { PlacePostgresRepository } from '@/infra/db/postgres-prisma'

export const makeDbCheckPlaceById = (): CheckPlaceById => {
  return new DbCheckPlaceById(new PlacePostgresRepository())
}
