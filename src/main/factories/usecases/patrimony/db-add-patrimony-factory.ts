import { DbAddPatrimony } from '@/data/usecases'
import { AddPatrimony } from '@/domain/usecases'
import { PatrimonyPostgresRepository } from '@/infra/db/postgres-prisma'

export const makeDbAddPatrimony = (): AddPatrimony => {
  const patrimonyPostgreRepository = new PatrimonyPostgresRepository()
  return new DbAddPatrimony(patrimonyPostgreRepository, patrimonyPostgreRepository)
}
