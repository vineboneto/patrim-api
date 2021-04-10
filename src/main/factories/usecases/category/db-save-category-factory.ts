import { DbSaveCategory } from '@/data/usecases'
import { SaveCategory } from '@/domain/usecases'
import { CategoryPostgresRepository } from '@/infra/db/postgres-prisma'

export const makeDbSaveCategory = (): SaveCategory => {
  const categoryPostgresRepository = new CategoryPostgresRepository()
  return new DbSaveCategory(categoryPostgresRepository, categoryPostgresRepository)
}
