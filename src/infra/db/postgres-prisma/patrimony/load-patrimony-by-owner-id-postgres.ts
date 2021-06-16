import { PrismaHelper, adaptArrayPatrimony, loadPatrimoniesByWhere } from '@/infra/db/postgres-prisma'
import { LoadPatrimoniesByOwnerIdRepository } from '@/data/protocols'

export class LoadPatrimoniesByOwnerIdPostgres implements LoadPatrimoniesByOwnerIdRepository {
  async loadByOwnerId (params: LoadPatrimoniesByOwnerIdRepository.Params):
  Promise<LoadPatrimoniesByOwnerIdRepository.Model> {
    const prismaClient = PrismaHelper.getConnection()
    const whereData = {
      ownerId: Number(params.ownerId),
      userId: Number(params.accountId)
    }
    const patrimonies: any = await loadPatrimoniesByWhere(whereData, params.skip, params.take)
    const total = await prismaClient.patrimony.count({ where: whereData })
    return adaptArrayPatrimony(patrimonies, total)
  }
}
