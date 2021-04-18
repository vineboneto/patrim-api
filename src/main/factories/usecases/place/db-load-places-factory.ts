import { LoadPlaces } from '@/domain/usecases'
import { DbLoadPlaces } from '@/data/usecases'
import { PlacePostgresRepository } from '@/infra/db/postgres-prisma'

export const makeDbLoadPlaces = (): LoadPlaces => {
  return new DbLoadPlaces(new PlacePostgresRepository())
}
