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

  async checkById (id: number): Promise<CheckAccountByIdRepository.Result> {
    const prismaClient = await PrismaHelper.getConnection()
    const accountWithOnlyId = await prismaClient.user.findFirst({
      where: {
        id: Number(id)
      },
      select: {
        id: true
      }
    })
    return accountWithOnlyId !== null
  }

  async loadByEmail (email: string): Promise<LoadAccountByEmailRepository.Model> {
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

  async loadByToken (accessToken: string, role?: string): Promise<LoadAccountByTokenRepository.Model> {
    const prismaClient = await PrismaHelper.getConnection()
    const account = await prismaClient.user.findFirst({
      where: {
        accessToken: accessToken,
        role: role
      },
      select: {
        id: true
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
