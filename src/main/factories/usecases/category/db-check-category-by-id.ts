import { DbCheckCategoryById } from '@/data/usecases'
import { CheckCategoryById } from '@/domain/usecases'
import { CategoryPostgresRepository } from '@/infra/db/postgres-prisma'

export const makeDbCheckCategoryById = (): CheckCategoryById => {
  const categoryPostgresRepository = new CategoryPostgresRepository()
  return new DbCheckCategoryById(categoryPostgresRepository)
}
