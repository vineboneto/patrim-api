import { LogErrorRepository, LogSwapPatrimonyRepository } from '@/data/protocols'
import { PrismaHelper } from '@/infra/db/postgres-prisma'

export class LogPostgresRepository implements LogErrorRepository, LogSwapPatrimonyRepository {
  async logError (stack: string): Promise<void> {
    const prismaClient = PrismaHelper.getConnection()
    await prismaClient.logError.create({
      data: {
        date: new Date(),
        stack
      }
    })
  }

  async logSwap (params: LogSwapPatrimonyRepository.Params): Promise<void> {
    const prismaClient = PrismaHelper.getConnection()
    await prismaClient.swapPatrimony.create({
      data: {
        date: new Date(),
        newOwnerId: Number(params.newOwnerId),
        oldOwnerId: Number(params.oldOwnerId),
        patrimonyId: Number(params.patrimonyId)
      }
    })
  }
}
