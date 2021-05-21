import { CheckExistsIdRepository } from '@/data/protocols'
import { PrismaHelper } from '@/infra/db/postgres-prisma'

export class SharedPostgresRepository implements CheckExistsIdRepository {
  async checkId (params: CheckExistsIdRepository.Params): Promise<CheckExistsIdRepository.Model> {
    const prismaClient = PrismaHelper.getConnection()
    const exists = await prismaClient[params.fieldDatabase].findFirst({
      where: {
        id: Number(params.id)
      },
      select: {
        id: true
      }
    })
    return exists !== null
  }
}
