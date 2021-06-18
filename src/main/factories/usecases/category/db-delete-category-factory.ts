import { DbDeleteCategory } from '@/data/usecases'
import { DeleteSector } from '@/domain/usecases'
import { CategoryPostgresRepository, CheckDataByFieldPostgres } from '@/infra/db/postgres-prisma'

export const makeDbDeleteCategory = (): DeleteSector => {
  const categoryPostgresRepository = new CategoryPostgresRepository()
  const checkPatrimonyByFieldPostgres = new CheckDataByFieldPostgres('categoryId', 'patrimony')
  return new DbDeleteCategory(categoryPostgresRepository, checkPatrimonyByFieldPostgres)
}
