import { AddAccountRepository, CheckAccountByEmailRepository } from '@/data/protocols'
import { PrismaHelper } from '@/infra/db/postgres-prisma'

export class AccountPostgresRepository implements AddAccountRepository, CheckAccountByEmailRepository {
  async add (account: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    const { name, email, password } = account
    const prismaClient = await PrismaHelper.getConnection()
    const accountModel = await prismaClient.user.create({
      data: {
        name,
        email,
        password
      }
    })
    return accountModel !== null
  }

  async checkByEmail (email: string): Promise<boolean> {
    const prismaClient = await PrismaHelper.getConnection()
    const account = prismaClient.user.findFirst({
      where: {
        email
      }
    })
    return account !== null
  }
}
