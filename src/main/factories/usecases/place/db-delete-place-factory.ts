import { DbDeletePlace } from '@/data/usecases'
import { DeletePlace } from '@/domain/usecases'
import { PatrimonyPostgresRepository, PlacePostgresRepository } from '@/infra/db/postgres-prisma'

export const makeDbDeletePlace = (): DeletePlace => {
  return new DbDeletePlace(new PlacePostgresRepository(), new PatrimonyPostgresRepository())
}
