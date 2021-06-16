import { PrismaHelper, PatrimonyHelper } from '@/infra/db/postgres-prisma'
import { LoadPatrimonyByNumberRepository } from '@/data/protocols'

export class LoadPatrimonyByNumberPostgres implements LoadPatrimonyByNumberRepository {
  async loadByNumber (params: LoadPatrimonyByNumberRepository.Params): Promise<LoadPatrimonyByNumberRepository.Model> {
    const prismaClient = PrismaHelper.getConnection()
    const patrimony = await prismaClient.patrimony.findFirst({
      where: {
        number: params.number,
        userId: Number(params.accountId)
      },
      include: PatrimonyHelper.includesDataPatrimony()
    })
    return patrimony ? PatrimonyHelper.adaptPatrimony(patrimony) : null
  }
}
