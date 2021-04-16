import { PrismaHelper } from '@/infra/db/postgres-prisma'
import { CheckPatrimonyByOwnerIdRepository, LoadPatrimonyByOwnerIdRepository } from '@/data/protocols'

export class PatrimonyPostgresRepository implements
  LoadPatrimonyByOwnerIdRepository,
  CheckPatrimonyByOwnerIdRepository {
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

  async checkByOwnerId (params: CheckPatrimonyByOwnerIdRepository.Params):
  Promise<CheckPatrimonyByOwnerIdRepository.Result> {
    const prismaClient = PrismaHelper.getConnection()
    const patrimony = await prismaClient.patrimony.findFirst({
      select: {
        id: true
      },
      where: {
        ownerId: Number(params.ownerId)
      }
    })
    return patrimony !== null
  }
}
