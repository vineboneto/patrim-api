import { DbAddPatrimony } from '@/data/usecases'
import { AddPatrimony } from '@/domain/usecases'
import { PatrimonyPostgresRepository, AddPatrimonyPostgres } from '@/infra/db/postgres-prisma'

export const makeDbAddPatrimony = (): AddPatrimony => {
  const patrimonyPostgreRepository = new PatrimonyPostgresRepository()
  const addPatrimonyPostgres = new AddPatrimonyPostgres()
  return new DbAddPatrimony(addPatrimonyPostgres, patrimonyPostgreRepository)
}
