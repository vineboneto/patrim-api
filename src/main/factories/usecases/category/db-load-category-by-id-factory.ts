import { DbLoadCategoryById } from '@/data/usecases'
import { LoadCategoryById } from '@/domain/usecases'
import { CategoryPostgresRepository } from '@/infra/db/postgres-prisma'

export const makeDbLoadCategoryById = (): LoadCategoryById => {
  return new DbLoadCategoryById(new CategoryPostgresRepository())
}
