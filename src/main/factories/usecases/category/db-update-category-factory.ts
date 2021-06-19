import { DbUpdateCategory } from '@/data/usecases'
import { UpdateCategory } from '@/domain/usecases'
import { CategoryPostgresRepository, CheckDataByFieldPostgres, LoadDataFieldByIdPostgres } from '@/infra/db/postgres-prisma'

export const makeDbUpdateCategory = (): UpdateCategory => {
  const addCategoryPostgres = new CategoryPostgresRepository()
  const loadCategoryNameByIdPostgres = new LoadDataFieldByIdPostgres('name', 'category')
  const checkExistsCategoryByNamePostgres = new CheckDataByFieldPostgres('name', 'category')
  return new DbUpdateCategory(
    addCategoryPostgres,
    loadCategoryNameByIdPostgres,
    checkExistsCategoryByNamePostgres
  )
}
