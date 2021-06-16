import { PrismaHelper, adaptArrayPatrimony, loadPatrimoniesWhere } from '@/infra/db/postgres-prisma'
import { LoadPatrimoniesBySectorIdRepository } from '@/data/protocols'

export class LoadPatrimoniesBySectorIdPostgres implements LoadPatrimoniesBySectorIdRepository {
  async loadBySectorId (params: LoadPatrimoniesBySectorIdRepository.Params):
  Promise<LoadPatrimoniesBySectorIdRepository.Model> {
    const prismaClient = PrismaHelper.getConnection()
    const where = {
      Owner: {
        sectorId: Number(params.sectorId)
      },
      userId: Number(params.accountId)
    }
    const patrimonies: any = await loadPatrimoniesWhere(where, params.skip, params.take)
    const total = await prismaClient.patrimony.count({ where })
    return adaptArrayPatrimony(patrimonies, total)
  }
}
