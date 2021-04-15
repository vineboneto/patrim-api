import { PrismaHelper } from '@/infra/db/postgres-prisma'
import { LoadPatrimonyByOwnerIdRepository } from '@/data/protocols'

export class PatrimonyPostgresRepository implements
  LoadPatrimonyByOwnerIdRepository {
  async loadByOwnerId (params: LoadPatrimonyByOwnerIdRepository.Params):
  Promise<LoadPatrimonyByOwnerIdRepository.Model> {
    const prismaClient = PrismaHelper.getConnection()
    const patrimony = await prismaClient.patrimony.findFirst({
      select: {
        id: true,
        number: true
      },
      where: {
        ownerId: Number(params.ownerId)
      }
    })
    return patrimony
  }
}
