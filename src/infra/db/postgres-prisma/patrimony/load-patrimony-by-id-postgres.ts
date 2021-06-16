import { PrismaHelper, PatrimonyHelper } from '@/infra/db/postgres-prisma'
import { LoadPatrimonyByIdRepository } from '@/data/protocols'

export class LoadPatrimonyByIdPostgres implements LoadPatrimonyByIdRepository {
  async loadById (params: LoadPatrimonyByIdRepository.Params): Promise<LoadPatrimonyByIdRepository.Model> {
    const prismaClient = PrismaHelper.getConnection()
    const patrimony = await prismaClient.patrimony.findFirst({
      where: {
        id: Number(params.id),
        userId: Number(params.accountId)
      },
      include: PatrimonyHelper.includesDataPatrimony()
    })
    return patrimony ? PatrimonyHelper.adaptPatrimony(patrimony) : null
  }
}
