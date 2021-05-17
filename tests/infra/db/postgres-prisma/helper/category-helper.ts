import { PrismaHelper } from '@/infra/db/postgres-prisma'
import { makeUser } from '@/tests/infra/db/postgres-prisma/helper'

import { Category } from '@prisma/client'
import faker from 'faker'

export const makeCategory = async (name?: string): Promise<Category> => {
  const prismaClient = PrismaHelper.getConnection()
  return Promise.resolve(prismaClient.category.create({
    data: await dataCategory(name)
  }))
}

export const findCategoryById = async (id: number): Promise<Category> => {
  const prismaClient = PrismaHelper.getConnection()
  return await prismaClient.category.findFirst({
    where: {
      id
    }
  })
}

export const makeManyCategories = async (accountId?: number): Promise<Category[]> => {
  const prismaClient = PrismaHelper.getConnection()
  const params = await dataCategory()
  await prismaClient.category.createMany({
    data: [
      params,
      params,
      params
    ]
  })
  return prismaClient.category.findMany()
}

const dataCategory = async (name?: string): Promise<any> => {
  const { id: userId } = await makeUser()
  return {
    userId,
    name: name || faker.name.findName()
  }
}
