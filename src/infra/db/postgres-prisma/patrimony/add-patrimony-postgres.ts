import { PrismaHelper, includesDataPatrimony } from '@/infra/db/postgres-prisma'
import { AddPatrimonyRepository } from '@/data/protocols'

export class AddPatrimonyPostgres implements AddPatrimonyRepository {
  async add (params: AddPatrimonyRepository.Params): Promise<AddPatrimonyRepository.Model> {
    const prismaClient = PrismaHelper.getConnection()
    const patrimony: any = await prismaClient.patrimony.create({
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
