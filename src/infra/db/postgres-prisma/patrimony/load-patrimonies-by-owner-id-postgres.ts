import { PrismaHelper, adaptArrayPatrimony, loadPatrimoniesWhere } from '@/infra/db/postgres-prisma'
import { LoadPatrimoniesByOwnerIdRepository } from '@/data/protocols'

export class LoadPatrimoniesByOwnerIdPostgres implements LoadPatrimoniesByOwnerIdRepository {
  async loadByOwnerId (params: LoadPatrimoniesByOwnerIdRepository.Params):
  Promise<LoadPatrimoniesByOwnerIdRepository.Model> {
    const prismaClient = PrismaHelper.getConnection()
    const where = {
      ownerId: Number(params.ownerId),
      userId: Number(params.accountId)
    }
    const patrimonies: any = await loadPatrimoniesWhere(where, params.skip, params.take)
    const total = await prismaClient.patrimony.count({ where })
    return adaptArrayPatrimony(patrimonies, total)
  }
}
