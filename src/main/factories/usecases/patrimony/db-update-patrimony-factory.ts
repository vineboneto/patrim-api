import { makeUpdatePatrimonyDecorator } from '@/main/factories/decorators'
import { DbUpdatePatrimony } from '@/data/usecases'
import { UpdatePatrimony } from '@/domain/usecases'
import { PatrimonyPostgresRepository } from '@/infra/db/postgres-prisma'

export const makeDbUpdatePatrimony = (): UpdatePatrimony => {
  const patrimonyPostgresRepository = new PatrimonyPostgresRepository()
  const dbUpdatePatrimony = new DbUpdatePatrimony(
    patrimonyPostgresRepository,
    patrimonyPostgresRepository,
    patrimonyPostgresRepository
  )
  return makeUpdatePatrimonyDecorator(dbUpdatePatrimony)
}
