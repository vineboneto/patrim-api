import { DbAddCategory } from '@/data/usecases'
import { AddCategory } from '@/domain/usecases'
import { CategoryPostgresRepository } from '@/infra/db/postgres-prisma'

export const makeDbAddCategory = (): AddCategory => {
  const categoryPostgresRepository = new CategoryPostgresRepository()
  return new DbAddCategory(categoryPostgresRepository, categoryPostgresRepository)
}
