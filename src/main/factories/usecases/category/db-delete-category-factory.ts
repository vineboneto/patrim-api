import { DbDeleteCategory } from '@/data/usecases'
import { DeleteSector } from '@/domain/usecases'
import { CategoryPostgresRepository } from '@/infra/db/postgres-prisma'

export const makeDbDeleteCategory = (): DeleteSector => {
  const categoryPostgresRepository = new CategoryPostgresRepository()
  return new DbDeleteCategory(categoryPostgresRepository, categoryPostgresRepository)
}
