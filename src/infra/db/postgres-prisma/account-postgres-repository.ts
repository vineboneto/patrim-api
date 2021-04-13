import {
  AddAccountRepository,
  CheckAccountByEmailRepository,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository,
  LoadAccountByTokenRepository,
  CheckAccountByIdRepository
} from '@/data/protocols'
import { PrismaHelper } from '@/infra/db/postgres-prisma'

export class AccountPostgresRepository implements
  AddAccountRepository,
  CheckAccountByEmailRepository,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository,
  LoadAccountByTokenRepository,
  CheckAccountByIdRepository {
  async add (account: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    const prismaClient = PrismaHelper.getConnection()
    const { name, email, password } = account
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
    const prismaClient = PrismaHelper.getConnection()
    const account = await prismaClient.user.findFirst({
      where: {
        email
      }
    })
    return account !== null
  }

  async checkById (id: string): Promise<CheckAccountByIdRepository.Result> {
    const prismaClient = PrismaHelper.getConnection()
    const accountWithOnlyId = await prismaClient.user.findFirst({
      where: {
        id: id ? Number(id) : undefined
      },
      select: {
        id: true
      }
    })
    return accountWithOnlyId !== null
  }

  async loadByEmail (email: string): Promise<LoadAccountByEmailRepository.Model> {
    const prismaClient = PrismaHelper.getConnection()
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
    return account ? this.convertIdToString(account) : null
  }

  async loadByToken (accessToken: string, role?: string): Promise<LoadAccountByTokenRepository.Model> {
    const prismaClient = PrismaHelper.getConnection()
    const account = await prismaClient.user.findFirst({
      where: {
        accessToken: accessToken,
        role: role
      },
      select: {
        id: true
      }
    })
    return account ? this.convertIdToString(account) : null
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const prismaClient = PrismaHelper.getConnection()
    await prismaClient.user.update({
      where: {
        id: Number(id)
      },
      data: {
        accessToken: token
      }
    })
  }

  private convertIdToString (entity: any): any {
    return {
      ...entity,
      id: entity.id.toString()
    }
  }
}
