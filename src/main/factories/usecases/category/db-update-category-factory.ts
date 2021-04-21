import { DbUpdateCategory } from '@/data/usecases'
import { UpdateCategory } from '@/domain/usecases'
import { CategoryPostgresRepository } from '@/infra/db/postgres-prisma'

export const makeDbUpdateCategory = (): UpdateCategory => {
  const categoryPostgresRepository = new CategoryPostgresRepository()
  return new DbUpdateCategory(categoryPostgresRepository, categoryPostgresRepository, categoryPostgresRepository)
}
