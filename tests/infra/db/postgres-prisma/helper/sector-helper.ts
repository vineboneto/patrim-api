import { PrismaHelper } from '@/infra/db/postgres-prisma'
import { makeUser } from '@/tests/infra/db/postgres-prisma/helper'

import { Sector } from '@prisma/client'
import faker from 'faker'

export const makeSector = async (name?: string, userId?: number): Promise<Sector> => {
  const prismaClient = PrismaHelper.getConnection()
  return Promise.resolve(prismaClient.sector.create({
    data: await dataSector(name, userId)
  }))
}

export const findSectorById = async (id: number): Promise<Sector> => {
  const prismaClient = PrismaHelper.getConnection()
  return await prismaClient.sector.findFirst({
    where: {
      id
    }
  })
}

export const makeManySectors = async (): Promise<Sector[]> => {
  const prismaClient = PrismaHelper.getConnection()
  const params = await dataSector()
  await prismaClient.sector.createMany({
    data: [
      params,
      params,
      params
    ]
  })
  return prismaClient.sector.findMany()
}

const dataSector = async (name?: string, userId?: number): Promise<any> => {
  const { id: accountId } = await makeUser()
  return {
    userId: userId || accountId,
    name: name || faker.name.findName()
  }
}
