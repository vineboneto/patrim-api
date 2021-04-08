import { DbLoadCategories } from '@/data/usecases'
import { LoadCategories } from '@/domain/usecases'
import { CategoryPostgresRepository } from '@/infra/db/postgres-prisma'

export const makeDbLoadCategories = (): LoadCategories => {
  return new DbLoadCategories(new CategoryPostgresRepository())
}
