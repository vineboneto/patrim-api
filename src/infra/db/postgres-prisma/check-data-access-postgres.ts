import { CheckAccessDataRepository } from '@/data/protocols'
import { PrismaHelper } from '@/infra/db/postgres-prisma'

export class CheckAccessDataPostgres implements CheckAccessDataRepository {
  async checkAccess (params: CheckAccessDataRepository.Params): Promise<boolean> {
    const prismaClient = PrismaHelper.getConnection()
    const access = await prismaClient[params.templateAccess.databaseName].findFirst({
      where: {
        id: Number(params.templateAccess.id),
        userId: Number(params.accountId)
      },
      select: {
        id: true
      }
    })
    return access !== null
  }
}
