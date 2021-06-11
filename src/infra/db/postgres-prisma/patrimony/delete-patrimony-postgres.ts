import { PrismaHelper, includesDataPatrimony } from '@/infra/db/postgres-prisma'
import { DeletePatrimonyRepository } from '@/data/protocols'

export class DeletePatrimonyPostgres implements DeletePatrimonyRepository {
  async delete (params: DeletePatrimonyRepository.Params): Promise<DeletePatrimonyRepository.Model> {
    const prismaClient = PrismaHelper.getConnection()
    const patrimony: any = await prismaClient.patrimony.delete({
      where: {
        id: Number(params.id)
      },
      include: includesDataPatrimony()
    })
    return PrismaHelper.adaptPatrimony(patrimony)
  }
}
