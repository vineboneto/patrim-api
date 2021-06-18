import { PrismaHelper } from '@/infra/db/postgres-prisma'
import {
  CheckPatrimonyByNumberRepository
} from '@/data/protocols'

export class PatrimonyPostgresRepository implements
  CheckPatrimonyByNumberRepository {
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
}
