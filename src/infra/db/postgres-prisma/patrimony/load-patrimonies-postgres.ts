import { PrismaHelper, includesDataPatrimony, adaptArrayPatrimony } from '@/infra/db/postgres-prisma'
import { LoadPatrimoniesRepository } from '@/data/protocols'

export class LoadPatrimoniesPostgres implements LoadPatrimoniesRepository {
  async loadAll (params: LoadPatrimoniesRepository.Params): Promise<LoadPatrimoniesRepository.Model> {
    const prismaClient = PrismaHelper.getConnection()
    const { skip, take, accountId } = params
    let patrimonies: any
    const whereData = {
      userId: Number(accountId)
    }
    if (isNaN(skip) || isNaN(take)) {
      patrimonies = await prismaClient.patrimony.findMany({
        include: includesDataPatrimony(),
        where: whereData
      })
    } else {
      patrimonies = await prismaClient.patrimony.findMany({
        include: includesDataPatrimony(),
        skip: Number(skip),
        take: Number(take),
        where: whereData
      })
    }
    const total = await prismaClient.patrimony.count({ where: whereData })
    return adaptArrayPatrimony(patrimonies, total)
  }
}
