import { PrismaHelper } from '@/infra/db/postgres-prisma'
import { CheckDataByFieldRepository } from '@/data/protocols'

export class CheckDataByFieldPostgres implements CheckDataByFieldRepository {
  constructor (
    private readonly fieldName: string,
    private readonly databaseName: string
  ) {}

  async checkByField (params: CheckDataByFieldRepository.Params): Promise<boolean> {
    const prismaClient = PrismaHelper.getConnection()
    const patrimony = await prismaClient[this.databaseName].findFirst({
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
