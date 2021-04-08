import { LogErrorRepository } from '@/data/protocols'
import { PrismaHelper } from '@/infra/db/postgres-prisma'

export class LogPostgresRepository implements LogErrorRepository {
  async logError (stack: string): Promise<void> {
    const prismaClient = await PrismaHelper.getConnection()
    await prismaClient.logError.create({
      data: {
        date: new Date(),
        stack
      }
    })
  }
}
