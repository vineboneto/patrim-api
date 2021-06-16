import { PrismaHelper } from '@/infra/db/postgres-prisma'
import { LoadPatrimonyFieldByIdRepository } from '@/data/protocols'

export class LoadPatrimonyFieldByIdPostgres implements LoadPatrimonyFieldByIdRepository {
  constructor (private readonly field: string) {}

  async loadFieldById (id: number): Promise<any> {
    const prismaClient = PrismaHelper.getConnection()
    const patrimony = await prismaClient.patrimony.findFirst({
      select: {
        [this.field]: true
      },
      where: {
        id: Number(id)
      }
    })
    return patrimony?.[this.field] ?? null
  }
}
