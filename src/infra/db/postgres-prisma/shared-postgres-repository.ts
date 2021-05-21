import { CheckExistsUserIdRepository } from '@/data/protocols'
import { PrismaHelper } from '@/infra/db/postgres-prisma'

export class SharedPostgresRepository implements CheckExistsUserIdRepository {
  async checkUserId (params: CheckExistsUserIdRepository.Params): Promise<CheckExistsUserIdRepository.Model> {
    const prismaClient = PrismaHelper.getConnection()
    const { id } = params
    const exists = await prismaClient[params.database].findFirst({
      where: {
        userId: Number(id)
      },
      select: {
        id: true
      }
    })
    return exists !== null
  }
}
