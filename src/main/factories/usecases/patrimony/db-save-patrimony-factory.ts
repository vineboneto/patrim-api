import { DbSavePatrimony } from '@/data/usecases'
import { SavePatrimony } from '@/domain/usecases'
import { PatrimonyPostgresRepository } from '@/infra/db/postgres-prisma'

export const makeDbSavePatrimony = (): SavePatrimony => {
  const patrimonyPostgreRepository = new PatrimonyPostgresRepository()
  return new DbSavePatrimony(patrimonyPostgreRepository, patrimonyPostgreRepository, patrimonyPostgreRepository)
}
