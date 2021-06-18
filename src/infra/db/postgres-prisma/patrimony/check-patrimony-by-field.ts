import { PrismaHelper } from '@/infra/db/postgres-prisma'
import { CheckPatrimonyByFieldRepository } from '@/data/protocols'

export class CheckPatrimonyByFieldPostgres implements CheckPatrimonyByFieldRepository {
  constructor (private readonly fieldName: string) {}

  async checkByField (params: CheckPatrimonyByFieldRepository.Params): Promise<boolean> {
    const prismaClient = PrismaHelper.getConnection()
    const patrimony = await prismaClient.patrimony.findFirst({
      select: {
        id: true
      },
      where: {
        [this.fieldName]: params.value,
        userId: params.accountId
      }
    })
    return patrimony !== null
  }
}
