import { PrismaHelper, includesDataPatrimony } from '@/infra/db/postgres-prisma'
import { LoadPatrimonyByIdRepository } from '@/data/protocols'

export class LoadPatrimonyByIdPostgres implements LoadPatrimonyByIdRepository {
  async loadById (params: LoadPatrimonyByIdRepository.Params): Promise<LoadPatrimonyByIdRepository.Model> {
    const prismaClient = PrismaHelper.getConnection()
    const patrimony: any = await prismaClient.patrimony.findFirst({
      where: {
        id: Number(params.id),
        userId: Number(params.accountId)
      },
      include: includesDataPatrimony()
    })
    return patrimony ? PrismaHelper.adaptPatrimony(patrimony) : null
  }
}
