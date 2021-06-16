import { PrismaHelper, adaptArrayPatrimony, loadPatrimoniesWhere } from '@/infra/db/postgres-prisma'
import { LoadPatrimoniesByCategoryIdRepository } from '@/data/protocols'

export class LoadPatrimoniesByCategoryIdPostgres implements LoadPatrimoniesByCategoryIdRepository {
  async loadByCategoryId (params: LoadPatrimoniesByCategoryIdRepository.Params):
  Promise<LoadPatrimoniesByCategoryIdRepository.Model> {
    const prismaClient = PrismaHelper.getConnection()
    const where = {
      ownerId: Number(params.categoryId),
      userId: Number(params.accountId)
    }
    const patrimonies: any = await loadPatrimoniesWhere(where, params.skip, params.take)
    const total = await prismaClient.patrimony.count({ where })
    return adaptArrayPatrimony(patrimonies, total)
  }
}
