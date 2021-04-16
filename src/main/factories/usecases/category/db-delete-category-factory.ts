import { DbDeleteCategory } from '@/data/usecases'
import { DeleteSector } from '@/domain/usecases'
import { CategoryPostgresRepository, PatrimonyPostgresRepository } from '@/infra/db/postgres-prisma'

export const makeDbDeleteCategory = (): DeleteSector => {
  const categoryPostgresRepository = new CategoryPostgresRepository()
  const patrimonyPostgresRepository = new PatrimonyPostgresRepository()
  return new DbDeleteCategory(categoryPostgresRepository, patrimonyPostgresRepository)
}
