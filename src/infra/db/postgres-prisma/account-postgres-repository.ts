import {
  AddAccountRepository,
  CheckAccountByEmailRepository,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository
} from '@/data/protocols'
import { PrismaHelper } from '@/infra/db/postgres-prisma'

export class AccountPostgresRepository implements
  AddAccountRepository,
  CheckAccountByEmailRepository,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository {
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
    const account = await prismaClient.user.findFirst({
      where: {
        email
      }
    })
    return account !== null
  }

  async loadByEmail (email: string): Promise<LoadAccountByEmailRepository.Result> {
    const prismaClient = await PrismaHelper.getConnection()
    const account = await prismaClient.user.findFirst({
      where: {
        email
      },
      select: {
        id: true,
        name: true,
        password: true
      }
    })
    return account
  }

  async updateAccessToken (id: number, token: string): Promise<void> {
    const prismaClient = await PrismaHelper.getConnection()
    await prismaClient.user.update({
      where: {
        id: id
      },
      data: {
        accessToken: token
      }
    })
  }
}
