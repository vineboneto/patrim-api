import { CheckAccessDataRepository } from '@/data/protocols'
import { PrismaHelper } from '@/infra/db/postgres-prisma'

export class CheckAccessDataPostgres implements CheckAccessDataRepository {
  constructor (
    private readonly databaseAccess: string,
    private readonly field: string
  ) {}

  async checkAccess (params: CheckAccessDataRepository.Params): Promise<boolean> {
    const prismaClient = PrismaHelper.getConnection()
    const access = await prismaClient[this.databaseAccess].findFirst({
      where: {
        [this.field]: params.id,
        userId: Number(params.accountId)
      },
      select: {
        id: true
      }
    })
    return access !== null
  }
}
