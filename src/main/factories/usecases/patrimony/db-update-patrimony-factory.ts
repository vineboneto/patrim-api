import { makeUpdatePatrimonyDecorator } from '@/main/factories/decorators'
import { DbUpdatePatrimony } from '@/data/usecases'
import { UpdatePatrimony } from '@/domain/usecases'
import { PatrimonyPostgresRepository, UpdatePatrimonyPostgres } from '@/infra/db/postgres-prisma'

export const makeDbUpdatePatrimony = (): UpdatePatrimony => {
  const patrimonyPostgresRepository = new PatrimonyPostgresRepository()
  const updatePatrimonyPostgres = new UpdatePatrimonyPostgres()
  const dbUpdatePatrimony = new DbUpdatePatrimony(
    updatePatrimonyPostgres,
    patrimonyPostgresRepository,
    patrimonyPostgresRepository
  )
  return makeUpdatePatrimonyDecorator(dbUpdatePatrimony)
}
