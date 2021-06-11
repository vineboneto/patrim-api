import { PrismaHelper, includesDataPatrimony } from '@/infra/db/postgres-prisma'
import { UpdatePatrimonyRepository } from '@/data/protocols'

export class UpdatePatrimonyPostgres implements UpdatePatrimonyRepository {
  async update (params: UpdatePatrimonyRepository.Params): Promise<UpdatePatrimonyRepository.Model> {
    const prismaClient = PrismaHelper.getConnection()
    const patrimony: any = await prismaClient.patrimony.update({
      where: {
        id: Number(params.id)
      },
      data: {
        number: params?.number,
        brand: params.brand,
        description: params.description,
        ownerId: Number(params.ownerId),
        userId: Number(params.accountId),
        categoryId: Number(params.categoryId)
      },
      include: includesDataPatrimony()
    })
    return PrismaHelper.adaptPatrimony(patrimony)
  }
}
