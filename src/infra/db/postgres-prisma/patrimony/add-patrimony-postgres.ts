import { PrismaHelper, PatrimonyHelper } from '@/infra/db/postgres-prisma'
import { AddPatrimonyRepository } from '@/data/protocols'

export class AddPatrimonyPostgres implements AddPatrimonyRepository {
  async add (params: AddPatrimonyRepository.Params): Promise<AddPatrimonyRepository.Model> {
    const prismaClient = PrismaHelper.getConnection()
    const patrimony: any = await prismaClient.patrimony.create({
      data: PatrimonyHelper.dataToInsertOrUpdate(params),
      include: PatrimonyHelper.includesDataPatrimony()
    })
    return PatrimonyHelper.adaptPatrimony(patrimony)
  }
}
