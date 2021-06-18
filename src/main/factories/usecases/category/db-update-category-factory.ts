import { DbUpdateCategory } from '@/data/usecases'
import { UpdateCategory } from '@/domain/usecases'
import { CategoryPostgresRepository, CheckDataByFieldPostgres } from '@/infra/db/postgres-prisma'

export const makeDbUpdateCategory = (): UpdateCategory => {
  const categoryPostgresRepository = new CategoryPostgresRepository()
  const checkDataByFieldPostgres = new CheckDataByFieldPostgres('name', 'category')
  return new DbUpdateCategory(categoryPostgresRepository, categoryPostgresRepository, checkDataByFieldPostgres)
}
