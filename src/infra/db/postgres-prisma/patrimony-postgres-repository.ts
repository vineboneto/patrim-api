import { PrismaHelper } from '@/infra/db/postgres-prisma'
import {
  CheckPatrimonyByOwnerIdRepository,
  CheckPatrimonyByNumberRepository
} from '@/data/protocols'

export class PatrimonyPostgresRepository implements
  CheckPatrimonyByNumberRepository,
  CheckPatrimonyByOwnerIdRepository {
  async checkByNumber (params: CheckPatrimonyByNumberRepository.Params): Promise<boolean> {
    const prismaClient = PrismaHelper.getConnection()
    const patrimony = await prismaClient.patrimony.findFirst({
      select: {
        id: true
      },
      where: {
        number: params.number,
        userId: params.accountId
      }
    })
    return patrimony !== null
  }

  async checkByOwnerId (params: CheckPatrimonyByOwnerIdRepository.Params):
  Promise<CheckPatrimonyByOwnerIdRepository.Result> {
    const { ownerId } = params
    const prismaClient = PrismaHelper.getConnection()
    const patrimony = await prismaClient.patrimony.findFirst({
      select: {
        id: true
      },
      where: {
        ownerId: Number(ownerId)
      }
    })
    return patrimony !== null
  }
}
