import { makeUpdatePatrimonyDecorator } from '@/main/factories/decorators'
import { DbUpdatePatrimony } from '@/data/usecases'
import { UpdatePatrimony } from '@/domain/usecases'
import { PatrimonyPostgresRepository, UpdatePatrimonyPostgres, LoadPatrimonyFieldByIdPostgres } from '@/infra/db/postgres-prisma'

export const makeDbUpdatePatrimony = (): UpdatePatrimony => {
  const patrimonyPostgresRepository = new PatrimonyPostgresRepository()
  const updatePatrimonyPostgres = new UpdatePatrimonyPostgres()
  const loadPatrimonyFieldByIdPostgres = new LoadPatrimonyFieldByIdPostgres('number')
  const dbUpdatePatrimony = new DbUpdatePatrimony(
    updatePatrimonyPostgres,
    loadPatrimonyFieldByIdPostgres,
    patrimonyPostgresRepository
  )
  return makeUpdatePatrimonyDecorator(dbUpdatePatrimony)
}
