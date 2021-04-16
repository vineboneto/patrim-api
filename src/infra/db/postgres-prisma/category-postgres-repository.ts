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
  async add (category: AddCategoryRepository.Params): Promise<AddCategoryRepository.Model> {
    const { name } = category
    const prismaClient = PrismaHelper.getConnection()
    const categoryResult = await prismaClient.category.create({
      data: {
        name
      }
    })
    return categoryResult
  }

  async update (category: UpdateCategoryRepository.Params): Promise<UpdateCategoryRepository.Model> {
    const { id, name } = category
    const prismaClient = PrismaHelper.getConnection()
    const categoryResult = await prismaClient.category.update({
      where: {
        id: Number(id)
      },
      data: {
        name
      }
    })
    return categoryResult
  }

  async delete (params: DeleteCategoryRepository.Params): Promise<DeleteCategoryRepository.Model> {
    const prismaClient = PrismaHelper.getConnection()
    const categoryDeleted = await prismaClient.category.delete({
      where: {
        id: Number(params.id)
      }
    })
    return categoryDeleted
  }

  async checkByName (name: string): Promise<boolean> {
    const prismaClient = PrismaHelper.getConnection()
    const category = await prismaClient.category.findFirst({
      where: {
        name
      }
    })
    return category !== null
  }

  async loadAll (params: LoadCategoriesRepository.Params): Promise<LoadCategoriesRepository.Model> {
    const prismaClient = PrismaHelper.getConnection()
    const { skip, take } = params
    if (isNaN(skip) || isNaN(take)) {
      return await prismaClient.category.findMany()
    }
    return await prismaClient.category.findMany({
      skip: Number(skip),
      take: Number(take)
    })
  }

  async checkById (params: CheckCategoryByIdRepository.Params): Promise<CheckCategoryByIdRepository.Result> {
    const prismaClient = PrismaHelper.getConnection()
    const { id } = params
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
