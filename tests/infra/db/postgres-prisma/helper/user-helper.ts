import { PrismaHelper } from '@/infra/db/postgres-prisma'
import { AddAccountRepository } from '@/data/protocols'
import { mockAddAccountRepositoryParams } from '@/tests/data/mocks'

import { User } from '@prisma/client'

export const makeUser = async (user?: AddAccountRepository.Params): Promise<User> => {
  const prismaClient = PrismaHelper.getConnection()
  if (user) {
    return await prismaClient.user.create({
      data: user
    })
  }
  return await prismaClient.user.create({
    data: mockAddAccountRepositoryParams()
  })
}

export const findUserById = async (id: number): Promise<User> => {
  const prismaClient = PrismaHelper.getConnection()
  return await prismaClient.user.findFirst({
    where: {
      id
    }
  })
}
