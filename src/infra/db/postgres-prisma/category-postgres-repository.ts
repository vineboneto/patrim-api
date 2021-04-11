import {
  AddCategoryRepository,
  UpdateCategoryRepository,
  DeleteCategoryRepository,
  CheckCategoryByNameRepository,
  LoadCategoriesRepository,
  CheckCategoryByIdRepository
} from '@/data/protocols'
import { PrismaHelper } from '@/infra/db/postgres-prisma'

export class CategoryPostgresRepository implements
  AddCategoryRepository,
  UpdateCategoryRepository,
  CheckCategoryByNameRepository,
  LoadCategoriesRepository,
  CheckCategoryByIdRepository,
  DeleteCategoryRepository {
  async add (category: AddCategoryRepository.Params): Promise<AddCategoryRepository.Result> {
    const { name } = category
    const prismaClient = await PrismaHelper.getConnection()
    const categoryResult = await prismaClient.category.create({
      data: {
        name
      }
    })
    return categoryResult !== null
  }

  async update (category: UpdateCategoryRepository.Params): Promise<UpdateCategoryRepository.Result> {
    const { id, name } = category
    const prismaClient = await PrismaHelper.getConnection()
    const categoryResult = await prismaClient.category.update({
      where: {
        id: Number(id)
      },
      data: {
        name
      }
    })
    return categoryResult !== null
  }

  async delete (id: number): Promise<DeleteCategoryRepository.Model> {
    const prismaClient = await PrismaHelper.getConnection()
    const categoryDeleted = await prismaClient.category.delete({
      where: {
        id: Number(id)
      }
    })
    return categoryDeleted
  }

  async checkByName (name: string): Promise<boolean> {
    const prismaClient = await PrismaHelper.getConnection()
    const category = await prismaClient.category.findFirst({
      where: {
        name
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
        id: Number(id)
      },
      select: {
        id: true
      }
    })
    return categoryWithOnlyId !== null
  }
}
