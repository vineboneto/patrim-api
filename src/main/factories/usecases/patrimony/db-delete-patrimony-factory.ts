import { DbDeletePatrimony } from '@/data/usecases'
import { DeletePatrimony } from '@/domain/usecases'
import { DeletePatrimonyPostgres } from '@/infra/db/postgres-prisma'

export const makeDbDeletePatrimony = (): DeletePatrimony => {
  return new DbDeletePatrimony(new DeletePatrimonyPostgres())
}
