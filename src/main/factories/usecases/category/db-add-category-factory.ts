import { DbAddCategory } from '@/data/usecases'
import { AddCategory } from '@/domain/usecases'
import { CategoryPostgresRepository, CheckDataByFieldPostgres } from '@/infra/db/postgres-prisma'

export const makeDbAddCategory = (): AddCategory => {
  const categoryPostgresRepository = new CategoryPostgresRepository()
  const checkDataByFieldPostgres = new CheckDataByFieldPostgres('name', 'category')
  return new DbAddCategory(categoryPostgresRepository, checkDataByFieldPostgres)
}
