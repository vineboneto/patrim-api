import { PrismaHelper } from '@/infra/db/postgres-prisma'
import { AddCategoryRepository } from '@/data/protocols'
import { mockAddCategoryRepositoryParams } from '@/tests/data/mocks'

import { Category } from '@prisma/client'

export const makeCategory = async (category?: AddCategoryRepository.Params): Promise<Category> => {
  const prismaClient = PrismaHelper.getConnection()
  if (category) {
    return await prismaClient.category.create({
      data: category
    })
  }
  return await prismaClient.category.create({
    data: mockAddCategoryRepositoryParams()
  })
}

export const findCategoryById = async (id: number): Promise<Category> => {
  const prismaClient = PrismaHelper.getConnection()
  return await prismaClient.category.findFirst({
    where: {
      id
    }
  })
}

export const makeManyCategories = async (): Promise<Category[]> => {
  const prismaClient = PrismaHelper.getConnection()
  await prismaClient.category.createMany({
    data: [
      mockAddCategoryRepositoryParams(),
      mockAddCategoryRepositoryParams(),
      mockAddCategoryRepositoryParams()
    ]
  })
  return prismaClient.owner.findMany()
}
