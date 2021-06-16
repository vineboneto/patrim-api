import { PatrimonyHelper } from '@/infra/db/postgres-prisma'
import { LoadPatrimoniesByCategoryIdRepository } from '@/data/protocols'

export class LoadPatrimoniesByCategoryIdPostgres implements LoadPatrimoniesByCategoryIdRepository {
  async loadByCategoryId (params: LoadPatrimoniesByCategoryIdRepository.Params):
  Promise<LoadPatrimoniesByCategoryIdRepository.Model> {
    const where = {
      categoryId: Number(params.categoryId),
      userId: Number(params.accountId)
    }
    return Promise.resolve(PatrimonyHelper.loadPatrimoniesWhere(where, params.skip, params.take))
  }
}
