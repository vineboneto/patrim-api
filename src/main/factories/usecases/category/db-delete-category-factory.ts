import { DbDeleteCategory } from '@/data/usecases'
import { DeleteSector } from '@/domain/usecases'
import { CategoryPostgresRepository, CheckPatrimonyByFieldPostgres } from '@/infra/db/postgres-prisma'

export const makeDbDeleteCategory = (): DeleteSector => {
  const categoryPostgresRepository = new CategoryPostgresRepository()
  const checkPatrimonyByFieldPostgres = new CheckPatrimonyByFieldPostgres('categoryId')
  return new DbDeleteCategory(categoryPostgresRepository, checkPatrimonyByFieldPostgres)
}
