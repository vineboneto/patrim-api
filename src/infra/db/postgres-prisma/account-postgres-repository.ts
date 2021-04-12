import {
  AddAccountRepository,
  CheckAccountByEmailRepository,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository,
  LoadAccountByTokenRepository,
  CheckAccountByIdRepository
} from '@/data/protocols'
import { PrismaHelper } from '@/infra/db/postgres-prisma'

import { PrismaClient } from '@prisma/client'

export class AccountPostgresRepository implements
  AddAccountRepository,
  CheckAccountByEmailRepository,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository,
  LoadAccountByTokenRepository,
  CheckAccountByIdRepository {
  private readonly prismaClient: PrismaClient

  constructor () {
    this.prismaClient = PrismaHelper.getConnection()
  }

  async add (account: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    const { name, email, password } = account
    const accountModel = await this.prismaClient.user.create({
      data: {
        name,
        email,
        password
      }
    })
    return accountModel !== null
  }

  async checkByEmail (email: string): Promise<boolean> {
    const account = await this.prismaClient.user.findFirst({
      where: {
        email
      }
    })
    return account !== null
  }

  async checkById (id: string): Promise<CheckAccountByIdRepository.Result> {
    const accountWithOnlyId = await this.prismaClient.user.findFirst({
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
    const account = await this.prismaClient.user.findFirst({
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
    await this.prismaClient.user.update({
      where: {
        id: id
      },
      data: {
        accessToken: token
      }
    })
  }
}
