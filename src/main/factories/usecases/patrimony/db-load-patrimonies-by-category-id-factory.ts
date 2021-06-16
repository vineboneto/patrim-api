import { DbLoadPatrimoniesByCategoryId } from '@/data/usecases'
import { LoadPatrimoniesByCategoryId } from '@/domain/usecases'
import { LoadPatrimoniesByCategoryIdPostgres } from '@/infra/db/postgres-prisma'

export const makeDbLoadPatrimoniesByCategoryId = (): LoadPatrimoniesByCategoryId => {
  return new DbLoadPatrimoniesByCategoryId(new LoadPatrimoniesByCategoryIdPostgres())
}
