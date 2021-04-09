import {
  AddCategoryRepository,
  CheckCategoryByNameRepository,
  LoadCategoriesRepository,
  CheckCategoryByIdRepository
} from '@/data/protocols'
import { PrismaHelper } from '@/infra/db/postgres-prisma'

export class CategoryPostgresRepository implements
  AddCategoryRepository,
  CheckCategoryByNameRepository,
  LoadCategoriesRepository,
  CheckCategoryByIdRepository {
  async addCategory (category: AddCategoryRepository.Params): Promise<boolean> {
    const { name } = category
    const prismaClient = await PrismaHelper.getConnection()
    const categoryResult = await prismaClient.category.create({
      data: {
        name
      }
    })
    return categoryResult !== null
  }

  async checkByName (name: string): Promise<boolean> {
    const prismaClient = await PrismaHelper.getConnection()
    const category = await prismaClient.category.findFirst({
      where: {
        name: name
      }
    })
    return category !== null
  }

  async loadAll (): Promise<LoadCategoriesRepository.Model> {
    const prismaClient = await PrismaHelper.getConnection()
    const categories = await prismaClient.category.findMany()
    return categories
  }

  async checkById (id: number): Promise<CheckCategoryByIdRepository.Result> {
    const prismaClient = await PrismaHelper.getConnection()
    const categoryWithOnlyId = await prismaClient.category.findFirst({
      where: {
        id
      },
      select: {
        id: true
      }
    })
    return categoryWithOnlyId !== null
  }
}
