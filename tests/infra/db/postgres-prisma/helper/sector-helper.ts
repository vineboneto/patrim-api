import { PrismaHelper } from '@/infra/db/postgres-prisma'
import { makeUser } from '@/tests/infra/db/postgres-prisma/helper'

import { Sector } from '@prisma/client'
import faker from 'faker'

export const makeSector = async (name?: string): Promise<Sector> => {
  const prismaClient = PrismaHelper.getConnection()
  return Promise.resolve(prismaClient.sector.create({
    data: await dataSector(name)
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

const dataSector = async (name?: string): Promise<any> => {
  const { id: userId } = await makeUser()
  return {
    userId,
    name: name || faker.name.findName()
  }
}
