import { PrismaHelper } from '@/infra/db/postgres-prisma'
import { LoadDataFieldByIdRepository } from '@/data/protocols'

export class LoadDataFieldByIdPostgres implements LoadDataFieldByIdRepository {
  constructor (
    private readonly fieldName: string,
    private readonly databaseName: string
  ) {}

  async loadFieldById (id: number): Promise<any> {
    const prismaClient = PrismaHelper.getConnection()
    const patrimony = await prismaClient[this.databaseName].findFirst({
      select: {
        [this.fieldName]: true
      },
      where: {
        id: Number(id)
      }
    })
    return patrimony?.[this.fieldName] ?? null
  }
}
