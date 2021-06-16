import { PrismaHelper, PatrimonyHelper } from '@/infra/db/postgres-prisma'
import { UpdatePatrimonyRepository } from '@/data/protocols'

export class UpdatePatrimonyPostgres implements UpdatePatrimonyRepository {
  async update (params: UpdatePatrimonyRepository.Params): Promise<UpdatePatrimonyRepository.Model> {
    const prismaClient = PrismaHelper.getConnection()
    const patrimony = await prismaClient.patrimony.update({
      where: {
        id: Number(params.id)
      },
      data: PatrimonyHelper.dataToInsertOrUpdate(params),
      include: PatrimonyHelper.includesDataPatrimony()
    })
    return PatrimonyHelper.adaptPatrimony(patrimony)
  }
}
