import { DbUpdatePatrimony } from '@/data/usecases'
import { UpdatePatrimony } from '@/domain/usecases'
import { PatrimonyPostgresRepository } from '@/infra/db/postgres-prisma'

export const makeDbUpdatePatrimony = (): UpdatePatrimony => {
  const patrimonyPostgresRepository = new PatrimonyPostgresRepository()
  return new DbUpdatePatrimony(
    patrimonyPostgresRepository,
    patrimonyPostgresRepository,
    patrimonyPostgresRepository
  )
}
