import { DbDeletePatrimony } from '@/data/usecases'
import { DeletePatrimony } from '@/domain/usecases'
import { PatrimonyPostgresRepository } from '@/infra/db/postgres-prisma'

export const makeDbDeletePatrimony = (): DeletePatrimony => {
  return new DbDeletePatrimony(new PatrimonyPostgresRepository())
}
